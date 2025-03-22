import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

import Error from "../Error/Error";

export default function Edit_Board({
    user,
}) {
    const { id } = useParams()
    const [board, setBoard] = useState({})
    const [error, setError] = useState(null)
    const [type, setType] = useState("")
    const navigator = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/boards/${id}/details`)
            .then(response => response.json())
            .then(data => setBoard(data.message))
            .catch(error => console.log(error.message))
    }, [])

    if (user === null) {
        navigator("/404")
    }

    const editBoard = async (ev) => {
        ev.preventDefault();

        let userData = Object.fromEntries(new FormData(ev.currentTarget))
        userData._owner = user.username

        try {
            const request = await fetch(`http://localhost:5000/boards/${id}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })

            const data = await request.json()

            if (data.recievedData !== "error") {

                navigator(`/boards/${id}/details`)
            } else {
                const message = data.message

                if (type === "fade") {
                    setType("")
                }

                setError(message)
            }
        } catch (err) {

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
        {error && <Error error={error} show={errorClose} type={type} />}

        <section>
            <div className="register-board">
                <form onSubmit={editBoard} className="register-form" >
                    <h2>Edit Board</h2>
                    <input type="text" name="title" placeholder="Title" defaultValue={board.title} />
                    <button type="submit">Edit</button>
                </form>
                <h3>Or if you dont want to edit your board <Link to="/" className="home-link">home</Link></h3>
            </div>
        </section>
    </>)
}
