import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const email = { 
    id: 'e101', 
    subject: 'Miss you!', 
    body: 'Would love to catch up sometimes', 
    isRead: false, 
    sentAt: 1551133930594,
    removedAt: null,
    from: 'momo@momo.com', 
    to: 'user@appsus.com' 
}

const loggedInUser = { 
    email: 'user@appsus.com', 
    fullname: 'Mahatma Appsus' 
}

const MAIL_KEY = 'mailsDB'
_createMails()

export const mailService = {
    query,
    get,
    // moveMailToTrash,
    remove,
    send,
    save,
    // getDefaultFilter, 
    changeStarMail,
    changeMailRead,
    getEmptyMail, 
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.ms = mailService

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.readStatus) {
                if (filterBy.readStatus === 'read') {
                    mails = mails.filter(mail => mail.isRead === true)
                } else {
                    mails = mails.filter(mail => mail.isRead === false)
                }
            }
            if (filterBy.status) {
                switch (filterBy.status) {
                    case 'inbox':
                        mails = mails.filter(mail => mail.to === 'user@appsus.com')
                        break;
                    case 'starred':
                        mails = mails.filter(mail => mail.isStared === true)
                        break;
                    case 'sent':
                        mails = mails.filter(mail => mail.from === 'user@appsus.com')
                        break;
                    case 'drafts':
                        mails = []
                        break;
                    case 'trash':
                        mails = mails.filter(mail => mail.removedAt !== null)
                        break;
                    default:
                        break;
                }
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            mail = _setNextPrevMailId(mail)
            return mail
        })
}

// function moveMailToTrash(mailId) {
//     return get(mailId)
//         .then(mail => {
//             mail.removedAt = Date.now()
//             return storageService.put(MAIL_KEY, mail)
//         })
// }

function remove(mailId) {
    return get(mailId)
        .then(mail => {
            if (mail.removedAt) {
                return storageService.remove(MAIL_KEY, mail.id)
            } else {
                mail.removedAt = Date.now()
                return storageService.put(MAIL_KEY, mail)
            }
        })
}

function send(mail) {
    mail.sentAt = Date.now()
    return storageService.post(MAIL_KEY, mail)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function changeStarMail(mailId) {
    return get(mailId)
        .then(mail => {
            mail.isStared = !mail.isStared
            return storageService.put(MAIL_KEY, mail)
        })
}

function changeMailRead(mailId) {
    return get(mailId)
        .then(mail => {
            mail.isRead = !mail.isRead
            return storageService.put(MAIL_KEY, mail)
        })
}

function getEmptyMail() {
    const mail = {
        id: utilService.makeId(), 
        subject: '', 
        body: '', 
        isRead: true,
        isStared: false,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
    return mail
}

// function getDefaultFilter(filterBy = { status: 'inbox', txt: '', labels: [] }) {
//     return filterBy
// }

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || '',
        txt: searchParams.get('txt') || '',
        readStatus: searchParams.get('readStatus') || '',
        note: searchParams.get('note') || ''
    }
}

function _createMails() {
    const mails = []
    for (let i = 0; i < 20; i++) {
        const mail = {
            id: utilService.makeId(),
            subject: utilService.makeLorem(2),
            body: utilService.makeLorem(60),
            isRead: Math.random() > 0.5,
            isStared: Math.random() > 0.5,
            sentAt: utilService.getRandomIntInclusive(1551133130200, 1551133930700),
            removedAt: null,
            from: utilService.makeLorem(1).trim() + '@' + utilService.makeLorem(1).trim() + '.com',
            to: 'user@appsus.com'
        } 
        mails.push(mail)
    } 
    utilService.saveToStorage(MAIL_KEY, mails)
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}