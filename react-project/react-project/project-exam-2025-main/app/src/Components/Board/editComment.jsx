import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router";

import Error from "../Error/Error";
import MyContext from "../Context/Context";

export default function Comment_edit({
    user,
    navigate
}) {
    const { id } = useParams()
    const [comment, setComment] = useState({ message: "" })
    const { err, setError, type, setType, navigator } = useContext(MyContext)

    useEffect(() => {
        fetch(`http://localhost:5000/boards/${id}/comment`)
            .then(response => response.json())
            .then(data => setComment(data.message))
            .catch(error => navigator("/"))
    }, [])

    if (comment.owner !== undefined && comment.owner !== user.username) {
        navigator("/404")
    }

    const editComment = async (ev) => {
        ev.preventDefault();

        let userData = Object.fromEntries(new FormData(ev.currentTarget))

        try {
            const request = await fetch(`http://localhost:5000/boards/${id}/comment-edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            
            const data = await request.json()
            const tokenData = data.recievedData

            if (tokenData !== "error") {
                navigator(`/boards/${tokenData._id}/details`)
            } else {
                const message = data.message
                
                if (type === "fade") {
                    setType("")
                }

                setError(message)
            }
        } catch (error) {
            if (type === "fade") {
                setType("")
            }

            setError("Something went wrong :|")
        }
    }

    const errorClose = () => {
        setType("fade")
    }

    return (<>
        {err && <Error error={err} show={errorClose} type={type} />}

        <section>
            <div className="register-board">
                <form onSubmit={editComment} className="register-form" >
                    <h2>Edit Profile</h2>
                    <input type="text" name="message" placeholder="comment" defaultValue={comment.message} />
                    <button type="submit">Edit</button>
                </form>
                <h3>Or if you dont want to edit your briliant comments <Link to="/" className="home-link">home</Link></h3>
            </div>
        </section>
    </>)
}
