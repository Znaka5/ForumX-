import { useContext, useEffect, useState } from "react";
import { Link } from "react-router"
import Search from "./Search";
import MyContext from "../Context/Context";

export default function Boards() {
    const { boards, setBoards } = useContext(MyContext)
    const [fautly, setFaulty] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoards(data.message))
            .catch(error => console.log(error.message))
    }, [])

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

        setBoards(data.recievedData)
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
                <div>
                    {boards.length === 0 && !fautly && <h2>There are no boards yet.</h2>}
                    {fautly && <h2>There are no boards named like this.</h2>}
                    {boards.map(board =>
                        <div className="board" key={board._id}>
                            <h2>{board.title}</h2>
                            <p>{board.owner}...</p>
                            <p>upvotes: {board.upvotes}</p>
                            <Link className="details-button" to={`/boards/${board._id}/details`}>Details</Link>
                        </div>)}
                </div>
            </section>

            <p>tired of "boarding" go back to home page <Link to="/" className="home-link">Home</Link></p>
        </div>
    </>)
}