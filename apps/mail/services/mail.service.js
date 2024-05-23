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
    remove,
    save,
    getDefaultFilter, 
    getEmptyMail, 
    getFilterFromSearchParams,
}
// For Debug (easy access from console):
window.ms = mailService

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     mails = mails.filter(book => regExp.test(book.title))
            // }

            // if (filterBy.maxPrice) {
            //     mails = mails.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            // }

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

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const mail = {
        id: utilService.makeId(), 
        subject: '', 
        body: '', 
        isRead: false, 
        sentAt: null,
        removedAt: null,
        from: null,
        to: null
    }
    return mail
}

function getDefaultFilter(filterBy = { status: 'inbox', txt: '', labels: [] }) {
    return filterBy
}

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || '',
        txt: searchParams.get('txt') || '',
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