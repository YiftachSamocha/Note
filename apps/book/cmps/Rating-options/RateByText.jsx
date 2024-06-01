export function RateByText({ onChange }) {
    return <div>
        <input type="number" onChange={onChange} name="rating" max="5" min="1"/>
    </div>

}