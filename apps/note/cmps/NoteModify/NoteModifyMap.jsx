const { useState, useEffect, useRef } = React

export function NoteModifyMap({ info, setInfo }) {
    const [location, setLocation] = useState(info.location || { lat: 32.0853, lng: 34.7818 })
    const mapRef = useRef(null)
    let marker

    useEffect(() => {
        if (!mapRef.current) return
        const map = new google.maps.Map(mapRef.current, {
            zoom: 10,
            center: location,
            mapId: "DEMO_MAP_ID",
        })

        marker = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: location,
        })
        const clickListener = map.addListener('click', handleChange)

        return () => {
            window.google.maps.event.removeListener(clickListener)
        }
    }, [info, location])

    function handleChange(event) {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        setLocation({ lat, lng, })
        setInfo({ ...info, location: { lat, lng, } })
    }
    if (!info.location) setInfo({ ...info, location: { lat: 32.0853, lng: 34.7818 } })


    return <div ref={mapRef} style={{ width: '25em', height: '25em' }} onClick={handleChange} className="map" />
}
