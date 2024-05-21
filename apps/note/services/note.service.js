import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
const LS_NAME = 'NOTES'

export const noteService = { query, remove, add, get, update, getColors }

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

function add(note) {
    return storageService.post(LS_NAME, note)
}

function get(noteId) {
    return storageService.get(LS_NAME, noteId)
}

function update(note) {
    return storageService.put(LS_NAME, note)
}

function getColors() {
    return ['#FFFFFF',
        '#FAAFA8',
        '#F39F76',
        '#FFF8B8',
        '#E2F6D3',
        '#B4DDD3',
        '#D4E4ED',
        '#AECCDC',
        '#D3BFDB',
        '#F6E2DD',
        '#E9E3D4',
        '#EFEFF1',
    ]
}
function _createData() {
    const notes = [{ id: utilService.makeId(), txt: 'oooo' }, { id: utilService.makeId(), txt: 'water' }, { id: utilService.makeId(), txt: 'fire' }, { id: utilService.makeId(), txt: 'hey' }, { id: utilService.makeId(), txt: 'hey' }]
    localStorage.setItem(LS_NAME, JSON.stringify(notes))
    return new Promise(resolve => resolve(notes))
}

// [{ type: 'white', value: '#FFFFFF' },
// { type: 'coral', value: '#FAAFA8' },
// { type: 'peach', value: '#F39F76' },
// { type: 'sand', value: '#FFF8B8' },
// { type: 'mint', value: '#E2F6D3' },
// { type: 'greenish', value: '#B4DDD3' },
// { type: 'fog', value: '#D4E4ED' },
// { type: 'storm', value: '#AECCDC' },
// { type: 'sunset', value: '#D3BFDB' },
// { type: 'blooming', value: '#F6E2DD' },
// { type: 'clay', value: '#E9E3D4' },
// { type: 'greyish', value: '#EFEFF1' },
// ]
