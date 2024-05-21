export function NoteTodos({note}){
    return <div>
        <h2>{note.info.title}</h2>
        <ul>
            {note.info.todos.map(todo=>{
                return <li key={todo.txt}>{todo.txt}</li>
            })}
        </ul>
    </div>
}