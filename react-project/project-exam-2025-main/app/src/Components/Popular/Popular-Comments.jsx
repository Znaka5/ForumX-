import { useState, useEffect } from "react";
import Search from "../Board/Search";
import { Link } from "react-router";

export default function Popular_Comments() {
    const [comment, setComment] = useState([])
    const [fautly, setFaulty] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/boards/comment")
            .then(response => response.json())
            .then(data => setComment(data.message))
            .catch(error => console.log(error.message))
    }, [])

    const sortedComments = [...comment].sort((a, b) => Number(b.likes) - Number(a.likes))
    const mostPopularComments = sortedComments.slice(0, 3) //the top 3


    const search = async (ev) => {
        ev.preventDefault()

        const query = Object.fromEntries(new FormData(ev.currentTarget))

        const response = await fetch("http://localhost:5000/boards/search-comments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        })

        const data = await response.json()

        setComment(data.recievedData)
        if (data.recievedData.length < 1) {
            setFaulty(true)
        } else {
            setFaulty(false)
        }
    }

    return (<>
        <div className="post-box">
            <Search search={search} />

            <section>
                <h2>Comments</h2>
                {mostPopularComments.length === 0 && !fautly && <h2>There are no comments yet.</h2>}
                {fautly && <h2>There are no comments like this.</h2>}
                <div>
                    {mostPopularComments.map(comment =>
                        <div className="board" key={comment._id}>
                            <h2>{comment.message}</h2>
                            <p>{comment.owner}</p>
                            <p>likes: {comment.likes}</p>
                            <Link className="details-button" to={`/boards/${comment.post_id}/details`}>Details</Link>
                        </div>
                    )}

                </div>
            </section>

            <p>tired of popular comments try looking at popular <Link to="/boards/popular/boards" className="home-link">boards</Link></p>
        </div>
    </>)
}