
import { useState, useEffect } from "react";
import Search from "../Board/Search";
import { Link } from "react-router";

export default function Popular_Boards() {
    const [board, setBoard] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoard(data.message))
            .catch(error => console.log(error.message))
    }, [])

    const sortedBoards = [...board].sort((a, b) => Number(b.upvotes) - Number(a.upvotes))
    const mostPopular = sortedBoards.slice(0, 3) //the top 3

    return (<>
        <div className="post-box">
            <Search />

            <section>
                <h2>Posts</h2>
                {mostPopular.length === 0 && <h2>There are no boards yet.</h2>}
                <div>
                    {mostPopular.map(board =>
                        <div className="board" key={board._id}>
                            <h2>{board.title}</h2>
                            <p>{board.owner}</p>
                            <p>upvotes: {board.upvotes}</p>
                            <Link className="details-button" to={`/boards/${board._id}/details`}>Details</Link>
                        </div>)}
                </div>
            </section>

            <p>tired of popular "boarding" try seeing other <Link to="/boards" className="home-link">boards</Link></p>
        </div>
    </>)
}