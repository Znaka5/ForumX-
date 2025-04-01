import { useEffect, useState } from "react"
import { Link } from "react-router"
import Popular from "../Popular/Popular"

export default function Header({
    user,
    onLogout
}) {
    const [boards, setBoards] = useState([])
    const [randomlyChosen, setRandom] = useState("/404")

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoards(data.message))
            .catch(error => navigator("/404"))
    }, [])

    useEffect(() => {
        if (boards.length > 0) {
            setRandom(boards[Math.floor(Math.random() * boards.length)]);
        }
    }, [boards])

    return (
        <>
            <header>
                <link rel="icon" href="/public/logo.ico" type="image/x-icon" />
                <div className="logo">
                    <img src="/public/logo.png" alt="ForumX Logo"></img>
                </div>
                <h1>ForumX</h1>
                <nav>
                    {user && <Link to="/users/create">Create</Link>}
                    {user && <Link to="/users/profile">Profile</Link>}
                    {user === null && <Link to="/users/register">Register</Link>}
                    {user === null && <Link to="/users/login">Login</Link>}
                    {user && <Link onClick={onLogout}>logout</Link>}
                </nav>

                <section className="boards">
                    <h2>Explore Boards</h2>
                    <div className="board-list">
                        <Link to="/boards" className="board">All boards</Link>
                        {randomlyChosen !== "/404" && <Link to={`/boards/random/${randomlyChosen._id}`} className="board">Random</Link>}
                        {randomlyChosen === "/404" && <Link to={`/404`} className="board">Random</Link>}
                        <Link to="/boards/about" className="board">About us</Link>
                    </div>
                </section>
            </header>

            <Popular boards={boards} />
        </>
    )
}