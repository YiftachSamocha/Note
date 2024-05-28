const { Link} = ReactRouterDOM

export function Home() {
    return <section className="home">
        <h1>Appsus</h1>
        <section className="app-links">
                <Link to="/mail">
                    <i className="fa-regular fa-envelope"></i>
                    <p>Mail</p>
                </Link>
                <Link to="/note">
                    <i className="fa-regular fa-note-sticky"></i>
                    <p>Note</p>
                </Link>
            </section>
    </section>
}