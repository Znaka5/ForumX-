import { useState, useEffect } from "react";
import Search from "../Board/Search";
import { Link } from "react-router";

export default function Popular_Comments() {
    const [comment, setComment] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/boards/comments")
            .then(response => response.json())
            .then(data => setComment(data.message))
            .catch(error => console.log(error.message))
    }, [])

    const sortedComments = [...comment].sort((a, b) => Number(b.likes) - Number(a.likes))
    const mostPopularComments = sortedComments.slice(0, 3) //the top 3

    return (<>
        <div className="post-box">
            <Search />

            <section>
                <h2>Comments</h2>
                {mostPopularComments.length === 0 && <h2>There are no comments yet.</h2>}
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