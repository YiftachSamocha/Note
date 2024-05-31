const { useState } = React
export function RateByStars({ onChange }) {
    const yellowColor = { color: 'yellow' }
    const blackColor = { color: 'black' }
    const [starsAmount, setStarsAmount] = useState(1)
    function handleChange(ev) {
        ev.preventDefault()
        setStarsAmount(ev.target.value)
        onChange(ev)
    }

    return <div>
        <div >
            <button onClick={handleChange} name="rating" value="1" style={yellowColor}>★</button>
            <button onClick={handleChange} name="rating" value="2" style={starsAmount > 1 ? yellowColor : blackColor}>★</button>
            <button onClick={handleChange} name="rating" value="3" style={starsAmount > 2 ? yellowColor : blackColor}>★</button>
            <button onClick={handleChange} name="rating" value="4" style={starsAmount > 3 ? yellowColor : blackColor}>★</button>
            <button onClick={handleChange} name="rating" value="5" style={starsAmount > 4 ? yellowColor : blackColor}>★</button>
        </div>
    </div>

} 