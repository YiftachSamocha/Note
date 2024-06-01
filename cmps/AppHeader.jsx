const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <section>
            <Link to="/">
                <h3 className="logo">Appsus</h3>
            </Link>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </section>

        <nav>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/book" >Book</NavLink>
        </nav>
    </header>
}
