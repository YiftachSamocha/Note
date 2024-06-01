const { useState } = React
export function BookCategory({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    return <section className="categories">
        <button onClick={() => setIsOpen(currIsOpen => !currIsOpen)} >{isOpen ? 'Close Categories' : 'Show Categories'}</button>
        <div className={isOpen ? 'categories-content' : 'hide'}>
            {children}
        </div>


    </section>

}