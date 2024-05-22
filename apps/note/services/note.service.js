import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"
const LS_NAME = 'NOTES'

export const noteService = { query, remove, add, get, update,getEmptyNote, getColors }

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

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        createdAt: new Date(),
        type: '',
        isPinned: false,
        style: '',
        info: {},
    }
}


function _createData() {
    let notes = []
    for (var i = 0; i < 12; i++) {
        const note = {
            id: utilService.makeId(),
            createdAt: new Date(),
            type: _getRandom(['txt', 'img', 'video', 'todos']),
            isPinned: false,
            style: _getRandom(getColors()),
            info: {
                title: _getRandom(['Hello!', 'My New Note', 'How fun', 'I love notes!', 'Note Note Note',])
            }
        }
        if (note.type === 'txt') {
            note.info.txt = _getRandom(['Hello!', 'My New Note', 'How fun', 'I love notes!', 'Note Note Note',])
        }
        else if (note.type === 'img') {
            note.info.url = _getRandom(['https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_square.jpg',
                'https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg',
                'https://www.theinsuranceemporium.co.uk/blog/wp-content/uploads/2023/09/image-10.png'])
        }
        else if (note.type === 'video') {
            note.info.url = _getRandom(['https://www.youtube.com/embed/K60BWlEhtAA',
                'https://www.youtube.com/embed/us5eCfExZX8',
                'https://www.youtube.com/embed/x6SwqkJmWv4?si=-LizvFhocsA1wak0'
            ])
        } else if (note.type === 'todos') {
            const todos = [
                'Go to the gym', 'Buy groceries', 'Visit mom', 'Clean the house',
                'Write e-mail', 'Call David', 'Cook Pasta', 'Code a site'
            ]
            const selectedTodos = []
            const copyTodos = [...todos]

            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * copyTodos.length)
                selectedTodos.push({
                    txt: copyTodos[randomIndex],
                    createdAt: null
                });
                copyTodos.splice(randomIndex, 1)
            }
            note.info.todos = selectedTodos
        }
        notes.push(note)

    }
    localStorage.setItem(LS_NAME, JSON.stringify(notes))
    return new Promise(resolve => resolve(notes))
}

function _getRandom(types) {
    const randomIndex = Math.floor(Math.random() * types.length)
    return types[randomIndex]
}



//Data element example:
// const note = {
//     id: '',
//     createdAt: '',
//     type: '',
//     isPinned: true,
//     style: { backgroundColor: '#00d' },
//     info: { txt: 'Fullstack Me Baby!' }
// }




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
