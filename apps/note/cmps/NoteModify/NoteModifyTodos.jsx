import { utilService } from "../../../../services/util.service.js"

export function NoteModifyTodos({ info, setInfo }) {
    function handleChange({ target }) {
        const { value, name, type, checked } = target
        const changedType = type === 'text' ? 'txt' : 'isMarked'
        const changedValue = changedType === 'txt' ? value : checked
        const todoNum = Number(name)
        const newTodos = [...info.todos]
        newTodos[todoNum] = { ...newTodos[todoNum], [changedType]: changedValue }
        if (todoNum === newTodos.length - 1) {
            newTodos.push({ txt: '', isMarked: false, id: utilService.makeId(3) })
        }
        setInfo({ ...info, todos: newTodos })
    }

    let todosInputs = []
    if (!info.todos) setInfo({ ...info, todos: [{ txt: '', isMarked: false, id: '' }] })
    for (var i = 0; i < info.todos.length; i++) {
        const todoInput = <div key={i}>
            <input
                type="text"
                placeholder='Enter Item'
                name={i.toString()}
                onChange={handleChange}
                value={info.todos[i] && info.todos[i].txt ? info.todos[i].txt : ''}
                className={info.todos[i] && info.todos[i].isMarked ? 'marked' : ''} />
            <input type="checkbox"
                checked={info.todos[i].isMarked}
                onChange={handleChange}
                name={i.toString()} />
        </div>
        todosInputs.push(todoInput)
    }

    return <div className="todos-inputs">{todosInputs}</div>
}