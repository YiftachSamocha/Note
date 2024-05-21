import { storageService } from "../../../services/async-storage.service.js"
const LS_NAME = 'NOTES'

export const noteService = { query }

function query() {
    return storageService.query(LS_NAME)
        .then(notes => {
            if (notes.length === 0) return _createData()
                return notes
        })
}
function _createData() {
    const notes = [{ txt: 'oooo' }, { txt: 'water' }, { txt: 'fire' }, { txt: 'hey' }, { txt: 'hey' }]
    localStorage.setItem(LS_NAME, JSON.stringify(notes))
    return new Promise(resolve => resolve(notes))
}