import Popular from "../Popular/Popular";

export default function Header() {
    return (
        <>
            <header>
                <div className="logo">
                    <img src="/public/logo.png" alt="ForumX Logo"></img>
                </div>
                <h1>ForumX</h1>
                <nav>
                    <a href="/users/profile">Profile</a>
                    <a href="/users/register">Register</a>
                    <a href="/users/login">Login</a>
                </nav>

                <section className="boards">
                    <h2>Explore Boards</h2>
                    <div className="board-list">
                        <a href="/boards" className="board">All boards</a>
                        <a href="/boards/random/:id" className="board">Random</a>
                        <a href="/boards/about" className="board">About us</a>
                    </div>
                </section>
            </header>

            <Popular />
        </>
    )
}