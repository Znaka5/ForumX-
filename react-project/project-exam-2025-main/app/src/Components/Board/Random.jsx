import { useState, useEffect } from "react";
import Comments from "./Comments";
import { Link, useParams } from "react-router";

export default function Random({
    user,
}) {
    const { id } = useParams()
    const [board, setBoard] = useState({ comments: [], upvoted: [] })
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/boards/${id}/details`)
            .then(response => response.json())
            .then(data => setBoard(data.message))
            .catch(error => console.log(error.message))
    }, [])

    useEffect(() => {
        if (!board || !board.owner_id) return

        fetch(`http://localhost:5000/boards/${board._id}/comments`)
            .then(response => response.json())
            .then(data => setComments(data.message))
            .catch(error => console.log(error.message))
    }, [board])

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

    const upvote = async (ev) => {
        ev.preventDefault()

        const data = await fetch(`http://localhost:5000/boards/${board._id}/${user._id}/upvoted`)

        const Boards = (await data.json()).recievedData

        if (Boards === "error") {
            console.log(Boards)
            return;
        }

        setBoard(Boards)
    }

    return (<>
        <div className="random-box">
            <section>
                <h2>Board</h2>
                <div>
                    <div className="board">
                        <h2>{board.title}</h2>
                        <p>{board.owner}</p>
                        <p>upvotes: {board.upvotes}</p>
                    </div>
                </div>
                {user && !board.upvoted.includes(user._id) && <button className="home-link" onClick={upvote}>upvote</button>}
            </section>

            <section>
                <h3>Comments:</h3>
                {comments.map(comment =>
                    <div className="board" key={comment._id}>
                        <div className="user-pfp-random">
                            <img src={comment.imgUrl} alt={comment.owner}></img>
                        </div>
                        <h2>{comment.owner}</h2>
                        <p>{comment.message}</p>
                    </div>)}
            </section>

            {user && <Comments comment={comment} />}

            <p>tired of this board try some other <Link to="/boards" className="home-link">boards</Link></p>
        </div>
    </>)
}