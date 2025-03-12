export default function Profile() {
    return (<>
        <div className="profile-container">
            <section>
                <div className="profile-board">
                    <h2>Username</h2>
                    <div className="user-pfp">
                        <img src="/public/logo.png" alt="ForumX Logo"></img>
                    </div>
                    <h2>user@example.com</h2>

                    <p>Go back to home? <a href="/" className="home-button"> home page</a></p>
                </div>
            </section>
            <a href="/user/:id/edit-username" className="profile-button">Edit username</a>
            <a href="/user/:id/edit-email" className="profile-button">Edit email</a>
            <a href="/user/:id/edit-pfp" className="profile-button">Edit profile picture</a>
        </div>
    </>)
}