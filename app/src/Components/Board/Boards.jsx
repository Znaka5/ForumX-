import { useEffect, useState } from "react";
import Search from "./Search";

export default function Boards() {
    const [boards, setBoards] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => console.log(response))
            .then(data => setBoards(data.message))
            .catch(error => console.log(error.message))
    }, [])

    console.log(boards)
    return (<>
        <div className="post-box">
            <Search />

            <section>
                <h2>Posts</h2>
                <div>
                    <div className="board">
                        <h2>is it that bad i like milfs?</h2>
                        <p>@bucket98</p>
                        <p>upvotes: 20</p>
                        <a className="details-button" href="/boards/:id/details">Details</a>
                    </div>
                </div>
            </section>

            <p>tired of "boarding" go back to home page <a href="/" className="home-link">Home</a></p>
        </div>
    </>)
}