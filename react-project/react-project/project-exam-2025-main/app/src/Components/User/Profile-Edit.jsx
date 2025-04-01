import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";

import Error from "../Error/Error";
import MyContext from "../Context/Context";

export default function Profile_Edit({
    onEdit,
    show,
}) {
    const { id } = useParams()
    const [user, setUser] = useState([])
    const { err, type, navigator } = useContext(MyContext)

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}/profile`)
            .then(response => response.json())
            .then(data => setUser(data.message))
            .catch(error => navigator("/"))
    }, [])

    return (<>
    
      {err && <Error error={err} show={show} type={type} />}

        <section>
            <div className="register-board">
                <form onSubmit={onEdit} className="register-form" >
                    <h2>Edit Profile</h2>
                    <input type="text" name="username" placeholder="Username" defaultValue={user.username}/>
                    <input type="email" name="email" placeholder="Email" defaultValue={user.email}/>
                    <input type="text" name="imgUrl" placeholder="profile picture" defaultValue={user.imgUrl}/>
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Edit</button>
                </form>
                <h3>Or if you dont want to edit your profile <Link to="/" className="home-link">home</Link></h3>
            </div>
        </section>
    </>)
}
