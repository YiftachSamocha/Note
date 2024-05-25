const { useState } = React
export function NoteFilterType({ filterBy, onFilter }) {
    const [currType, setCurrType] = useState('')
    const currTypeClass = 'current'
    function onSetFilter(type) {
        setCurrType(type)
        onFilter({ ...filterBy, type: type })
    }
    return <section className="filter-type">
        <div onClick={() => onSetFilter('')}
            className={currType === '' ? currTypeClass : ''}>
            <i className="fa-regular fa-note-sticky"></i>
            <p>All</p>
        </div>
        <div onClick={() => onSetFilter('txt')}
            className={currType === 'txt' ? currTypeClass : ''}>
            <i className="fa-solid fa-font"></i>
            <p>Text</p>
        </div>
        <div onClick={() => onSetFilter('todos')}
            className={currType === 'todos' ? currTypeClass : ''}>
            <i className="fa-solid fa-list"></i>
            <p>List</p>
        </div>
        <div onClick={() => onSetFilter('video')}
            className={currType === 'video' ? currTypeClass : ''}>
            <i className="fa-brands fa-youtube"></i>
            <p>YouTube</p>
        </div>
        <div onClick={() => onSetFilter('img')}
            className={currType === 'img' ? currTypeClass : ''}>
            <i className="fa-regular fa-image"></i>
            <p>Image</p>
        </div>
        <div onClick={() => onSetFilter('audio')}
            className={currType === 'audio' ? currTypeClass : ''}>
            <i className="fa-solid fa-volume-high"></i>
            <p>Audio</p>
        </div>
        <div onClick={() => onSetFilter('canvas')}
            className={currType === 'canvas' ? currTypeClass : ''}>
           <i className="fa-solid fa-pencil"></i>
            <p>Draw</p>
        </div>
        <div onClick={() => onSetFilter('map')}
            className={currType === 'map' ? currTypeClass : ''}>
            <i className="fa-regular fa-map"></i>
            <p>Map</p>
        </div>

    </section>

}