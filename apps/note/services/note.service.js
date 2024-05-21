import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
const LS_NAME = 'NOTES'

export const noteService = { query, remove, add }

function query() {
    return storageService.query(LS_NAME)
        .then(notes => {
            if (notes.length === 0) return _createData()
            return notes
        })
}

function remove(noteId) {
    return storageService.remove(LS_NAME, noteId)
}

function add(txt) {
    const note= {
        txt: txt,
        id: utilService.makeId()
    }
    
    return storageService.post(LS_NAME, note)
}
function _createData() {
    const notes = [{ id: utilService.makeId(), txt: 'oooo' }, { id: utilService.makeId(), txt: 'water' }, { id: utilService.makeId(), txt: 'fire' }, { id: utilService.makeId(), txt: 'hey' }, { id: utilService.makeId(), txt: 'hey' }]
    localStorage.setItem(LS_NAME, JSON.stringify(notes))
    return new Promise(resolve => resolve(notes))
}