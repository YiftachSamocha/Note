const { useState, useEffect } = React
export function NoteFilterType({ filterBy, onFilter }) {
    const [currType, setCurrType] = useState('')
    const [isScreenSmall, setIsScreenSmall] = useState(false)
    const currTypeClass = 'current'
    useEffect(() => {
        function handleResize() {
            if (window.matchMedia('(max-width: 450px)').matches) {
                setIsScreenSmall(true)
            }
            else setIsScreenSmall(false)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    function onSetFilter(type) {
        setCurrType(type)
        onFilter({ ...filterBy, type: type })
    }

    return <section className="filter-type">
        <section>
            <div onClick={() => onSetFilter('')}
                className={currType === '' ? currTypeClass : ''}>
                <i className="fa-regular fa-note-sticky"></i>
                {!isScreenSmall && <p>All</p>}
            </div>
            <div onClick={() => onSetFilter('txt')}
                className={currType === 'txt' ? currTypeClass : ''}>
                <i className="fa-solid fa-font"></i>
                {!isScreenSmall && <p>Text</p>}
            </div>
            <div onClick={() => onSetFilter('todos')}
                className={currType === 'todos' ? currTypeClass : ''}>
                <i className="fa-solid fa-list"></i>
                {!isScreenSmall && <p>List</p>}
            </div>
            <div onClick={() => onSetFilter('video')}
                className={currType === 'video' ? currTypeClass : ''}>
                <i className="fa-brands fa-youtube"></i>
                {!isScreenSmall && <p>YouTube</p>}
            </div>
            <div onClick={() => onSetFilter('img')}
                className={currType === 'img' ? currTypeClass : ''}>
                <i className="fa-regular fa-image"></i>
                {!isScreenSmall && <p>Image</p>}
            </div>
            <div onClick={() => onSetFilter('audio')}
                className={currType === 'audio' ? currTypeClass : ''}>
                <i className="fa-solid fa-volume-high"></i>
                {!isScreenSmall && <p>Audio</p>}
            </div>
            <div onClick={() => onSetFilter('canvas')}
                className={currType === 'canvas' ? currTypeClass : ''}>
                <i className="fa-solid fa-paintbrush"></i>
                {!isScreenSmall && <p>Draw</p>}
            </div>
            <div onClick={() => onSetFilter('map')}
                className={currType === 'map' ? currTypeClass : ''}>
                <i className="fa-regular fa-map"></i>
                {!isScreenSmall && <p>Map</p>}
            </div>

        </section>
    </section>



}