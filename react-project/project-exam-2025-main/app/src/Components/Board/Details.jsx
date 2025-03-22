
import Comments from "./Comments";

import { Link, useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

export default function Details({
    user,
    navigate
}) {
    const { id } = useParams()
    const [board, setBoard] = useState({ comments: [], upvoted: [] })
    const [creator, setCreator] = useState({ username: "" })
    const [comments, setComments] = useState([])
    const [User, setUser] = useState("")

    useEffect(() => {
        if (user !== null) {
            setUser(user)
        }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/boards/${id}/details`)
            .then(response => response.json())
            .then(data => setBoard(data.message))
            .catch(error => console.log(error.message))
    }, [])

    useEffect(() => {
        if (!board || !board.owner_id) return

        fetch(`http://localhost:5000/users/${board.owner_id}/profile`)
            .then(response => response.json())
            .then(data => setCreator(data.message))
            .catch(error => console.log(error.message))
    }, [board])

    useEffect(() => {
        if (!board || !board.owner_id) return

        fetch(`http://localhost:5000/boards/${id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data.message))
            .catch(error => console.log(error.message))
    }, [creator])

    const comment = async (ev) => {
        ev.preventDefault();

        let userData = Object.fromEntries(new FormData(ev.currentTarget))
        userData.imgUrl = user.imgUrl
        userData.owner = user.username
        userData.post_id = board._id


        try {
            await fetch(`http://localhost:5000/boards/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })

            userData.message = userData.message + " (pending upload)"

            setComments((comments) => [...comments, userData])

        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (!board || !board.owner_id) return

        fetch(`http://localhost:5000/boards/${id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data.message))
            .catch(error => console.log(error.message))
    }, [comments])

    const upvote = async (ev) => {
        ev.preventDefault()

        const data = await fetch(`http://localhost:5000/boards/${id}/${User._id}/upvoted`)

        const Boards = (await data.json()).recievedData

        if (Boards === "error") {
            console.log(Boards)
            return;
        }

        setBoard(Boards)
    }

    const Delete = async (ev) => {
        ev.preventDefault()

        const status = await fetch(`http://localhost:5000/boards/${id}/delete`)

        if (status.status === 200) {
            console.log(status.json())
            navigate("/boards")
        } else {
            navigate("/boards")
        }
    }

    const edit = (ev) => {
        ev.preventDefault()

        navigate(`/boards/${id}/edit`)
    }

    return (<>
        <div className="random-box">
            <section>
                <h2>Board</h2>
                <div>
                    <div className="board">
                        <h2>{board.title}</h2>
                        <p>{creator.username}</p>
                        <p>upvotes: {board.upvotes}</p>
                    </div>
                </div>
                {User && !board.upvoted.includes(User._id) && User._id !== creator._id && <button className="home-link" onClick={upvote}>upvote</button>}
                {User._id === creator._id && (
                    <div style={{ display: "inline-block", padding: "5px" }}>
                        <button className="home-link" onClick={edit}>Edit</button>
                    </div>
                )}
                {User._id === creator._id && (
                    <div style={{ display: "inline-block", padding: "5px" }}>
                        <button className="home-link" onClick={Delete} >Delete</button>
                    </div>
                )}
            </section>

            <section>
                <h3>Comments:</h3>
                {!comments.length && <h2>No comments here yet.</h2>}
                {comments.map((comment, index) =>
                    <div className="board" key={index}>
                        <div className="user-pfp-random">
                            <img src={comment.imgUrl} alt={comment.owner}></img>
                        </div>
                        <h2>{comment.owner}</h2>
                        {User && User._id !== comment.owner && <button className="home-link">like</button>}
                        <p>{comment.message}</p>
                    </div>)}
            </section>

            {!User && <h3>You have to have an account to comment.</h3>}
            {User && <Comments comment={comment} />}

            <p>tired of this board try some other <Link to="/boards" className="home-link">boards</Link></p>
        </div>
    </>)
}