const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose({ onSetIsMailCompose, sendMail }) {
    const [mailCompose, setMailCompose] = useState(mailService.getEmptyMail())

    function onSave(ev) {
        ev.preventDefault()
        onSetIsMailCompose()
        sendMail(mailCompose)
    }

    function handleChange({ target }) {
        const { name, value } = target

        setMailCompose(prevMail => ({ ...prevMail, [name]: value}))   
    }

    return (
        <section className="mail-compose">
            <div className="header-container">
                <h2>New Message</h2>
                <button onClick={() => onSetIsMailCompose()}><img src="./assets/img/close.png"/></button>
            </div>
            <div className="from-container">
                <h2>From <span>Your-Mail</span></h2>
            </div>

            <form onSubmit={onSave}>
                <div className="to-container">
                    <label htmlFor="to">To</label>
                    <input onChange={handleChange} value={mailCompose.to} type="email" id="to" name="to" required/>
                </div>

                <div className="subject-container">
                    <label htmlFor="subject">Subject</label>
                    <input onChange={handleChange} value={mailCompose.subject} type="text" id="subject" name="subject" required/>
                </div>

                <div className="body-container">
                    <label htmlFor="body"></label>
                    <textarea onChange={handleChange} value={mailCompose.body} type="textarea" maxLength="500" id="body" name="body"></textarea>
                </div>
                <button>Send</button>
            </form>
        </section>
    )
}