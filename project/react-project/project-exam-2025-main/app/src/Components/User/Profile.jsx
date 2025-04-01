import { Link } from "react-router";

export default function Profile({
    user
}) {
    return (<>
        <div className="profile-container">
            <section>
                <div className="profile-board">
                    <h2>{user.username}</h2>
                    <div className="user-pfp">
                        <img src={user.imgUrl} alt="no pfp maybe add one?"></img>
                    </div>
                    <h2>{user.email}</h2>

                    <p>Go back to home? <Link to="/" className="home-button"> home page</Link></p>
                </div>
            </section>
            <Link to={`/user/${user._id}/edit-profile`} className="profile-button">Edit profile</Link>
        </div>
    </>)
}