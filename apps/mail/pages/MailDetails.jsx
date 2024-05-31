const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function MailDetails({ onRemoveMail }) {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        mailService.get(params.mailId)
            .then(mail => {
                setMail(mail)
                mailService.changeMailRead(mail.id)
            })
            .catch(() => {
                alert('Something went wrong')
                navigate('/mail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.mailId])

    function onSetRemoveMail(mailId) {
        onRemoveMail(mailId)
        navigate('/mail')
    }

    if (isLoading) return <h3>Loading...</h3>

    return (
        <section className="mail-details">
            <span className="delete-mail" title="Delete Mail" onClick={() => onSetRemoveMail(mail.id)}><img src="./assets/img/delete.png"/></span>
            <h2>{mail.subject}</h2>
            <h3>from: {mail.from}</h3>
            {/* <p>{mail.body}</p> */}
            <textarea defaultValue={mail.body}></textarea>

            <nav className="actions">
                <Link replace to={`/mail/${mail.prevMailId}`}><button>Previous</button></Link>
                <Link replace to={`/mail/${mail.nextMailId}`}><button>Next</button></Link>
                <Link replace to="/mail"><button className="close-details-btn">Close</button></Link>
            </nav>
        </section>
    )
}