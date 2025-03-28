
import { useState, useEffect } from "react";
import Search from "../Board/Search";
import { Link } from "react-router";

export default function Popular_Boards() {
    const [board, setBoard] = useState([])
    const [fautly, setFaulty] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoard(data.message))
            .catch(error => console.log(error.message))
    }, [])

    const sortedBoards = [...board].sort((a, b) => Number(b.upvotes) - Number(a.upvotes))
    const mostPopular = sortedBoards.slice(0, 3) //the top 3


    const search = async (ev) => {
        ev.preventDefault()

        const query = Object.fromEntries(new FormData(ev.currentTarget))

        const response = await fetch("http://localhost:5000/boards/search-boards", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        })

        const data = await response.json()

        setBoard(data.recievedData)
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
                <h2>Posts</h2>
                {mostPopular.length === 0 && !fautly && <h2>There are no boards yet.</h2>}
                {fautly && <h2>There are no boards named like this.</h2>}
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