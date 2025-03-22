import { useEffect, useState } from "react"
import { Link } from "react-router"
import Popular from "../Popular/Popular"

export default function Header({
    user,
    onLogout
}) {
    const [token, setToken] = useState(null)
    const [boards, setBoards] = useState([])
    const [randomlyChosen, setRandom] = useState("/404")

    useEffect(() => {
        setToken(user)
    }, [user])

    useEffect(() => {
        fetch("http://localhost:5000/boards/board")
            .then(response => response.json())
            .then(data => setBoards(data.message))
            .catch(error => console.log(error.message))
    }, [])

    useEffect(() => {
        if (boards.length > 0) {
            setRandom(boards[Math.floor(Math.random() * boards.length)]);
        }
    }, [boards])

    return (
        <>
            <header>
                <div className="logo">
                    <img src="/public/logo.png" alt="ForumX Logo"></img>
                </div>
                <h1>ForumX</h1>
                <nav>
                    {token && <Link to="/users/create">Create</Link>}
                    {token && <Link to="/users/profile">Profile</Link>}
                    {token && <Link to="/users/settings">Settings</Link>}
                    {token === null && <Link to="/users/register">Register</Link>}
                    {token === null && <Link to="/users/login">Login</Link>}
                    {token && <Link onClick={onLogout}>logout</Link>}
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