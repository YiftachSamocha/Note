import { RateBySelect } from "./Rating-options/RateBySelect.jsx"
import { RateByStars } from "./Rating-options/RateByStars.jsx"
import { RateByText } from "./Rating-options/RateByText.jsx"

const { useState } = React
export function BookRating({ onChange }) {
    const [kind, setKind] = useState('stars')
    function handleChange({ target }) {
        setKind(target.name)
    }

    return <div className="rating-container">
        <div>
        <label htmlFor="rating-container">Rating:</label>
            <div id="rating-container" >
                <div>
                    <label htmlFor="text">Text</label>
                    <input type="radio" id="text" name="text" onChange={handleChange}
                        checked={kind === 'text'} />
                </div>
                <div>
                    <label htmlFor="stars">Stars</label>
                    <input type="radio" id="stars" name="stars" onChange={handleChange}
                        checked={kind === 'stars'} />
                </div>
                <div>
                    <label htmlFor="select">Select</label>
                    <input type="radio" id="select" name="select" onChange={handleChange}
                        checked={kind === 'select'} />
                </div>
            </div>
        </div>
        <DynamicSelect kind={kind} onChange={onChange} />
    </div>

}
function DynamicSelect({ kind, onChange }) {
    switch (kind) {
        case 'text':
            return <RateByText onChange={onChange} />
        case 'stars':
            return <RateByStars onChange={onChange} />
        case 'select':
            return <RateBySelect onChange={onChange} />
    }
}