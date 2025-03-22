import { useContext, useEffect } from "react";
import { Link } from "react-router"
import Search from "./Search";
import MyContext from "../Context/Context";

export default function Boards() {
    const { boards, setBoards } = useContext(MyContext)

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoards(data.message))
            .catch(error => console.log(error.message))
    }, [])

    return (<>
        <div className="post-box">
            <Search />

            <section>
                <h2>Posts</h2>
                <div>
                    {boards.length === 0 && <h2>There are no boards yet.</h2>}
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