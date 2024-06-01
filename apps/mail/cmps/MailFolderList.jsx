const { useState, useEffect } = React

export function MailFolderList({ folder, onSetFolder, unreadMailsCount }) {
    
    unreadMailsCount = unreadMailsCount ? unreadMailsCount : ''

    return (
        <section className="mail-folder">
            <p className={`${folder.status === 'inbox' ? 'active' : ''}`} onClick={() => onSetFolder('inbox')}><img src="./assets/img/inbox.png"/>Inbox<span>{unreadMailsCount}</span></p>
            <p className={`${folder.status === 'starred' ? 'active' : ''}`} onClick={() => onSetFolder('starred')}><img src="./assets/img/star.png"/>Starred</p>
            <p className={`${folder.status === 'sent' ? 'active' : ''}`} onClick={() => onSetFolder('sent')}><img src="./assets/img/send.png"/>Sent</p>
            <p className={`${folder.status === 'drafts' ? 'active' : ''}`} onClick={() => onSetFolder('drafts')}><img src="./assets/img/draft.png"/>Drafts</p>
            <p className={`${folder.status === 'trash' ? 'active' : ''}`} onClick={() => onSetFolder('trash')}><img src="./assets/img/delete.png"/>Trash</p>
        </section>
    )
}