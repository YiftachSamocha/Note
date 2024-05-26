const { useRef, useEffect } = React
export function NotePreviewMap({ note }) {
    const mapRef = useRef(null)
    let marker
    useEffect(() => {
        if(!mapRef.current) return
        const map = new google.maps.Map(mapRef.current, {
            zoom: 10,
            center: note.info.location,
            mapId: "DEMO_MAP_ID",
        })

        marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: note.info.location,
        })
    }, [note])

    return <div>
        <h2>{note.info.title}</h2>
        <div ref={mapRef} style={{ width: '12em', height: '12em' }} className="map" />
    </div>
}