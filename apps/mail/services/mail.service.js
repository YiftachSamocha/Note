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