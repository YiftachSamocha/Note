const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose({ isMailCompose, onSetIsMailCompose, sendMail }) {
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
            <h2>New Message</h2>
            <button onClick={() => onSetIsMailCompose()}>X</button>
            <h2>From <span>Your-Mail</span></h2>

            <form onSubmit={onSave}>
                <label htmlFor="to">To</label>
                <input onChange={handleChange} value={mailCompose.to} type="email" placeholder="name@mail.com" id="to" name="to" required/>

                <label htmlFor="subject">Subject</label>
                <input onChange={handleChange} value={mailCompose.subject} type="text" id="subject" name="subject" required/>
                
                <label htmlFor="body"></label>
                <input onChange={handleChange} value={mailCompose.body} type="text" id="body" name="body"/>

                <button>Send</button>
            </form>
        </section>
    )
}