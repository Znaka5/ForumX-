import { Link } from "react-router";

export default function Create({
    onCreate
}) {
    return (<>
        <section>
            <div className="register-board">
                <form onSubmit={onCreate} className="register-form">
                    <h2>Create a board</h2>
                    <input type="text" name="title" placeholder="board name" />
                    <button type="submit">Create</button>
                </form>
                <h3>Or if you don't want to make a question go check something else: <Link to="/boards" className="home-link">boards maybe?</Link> </h3>
            </div>
        </section>
    </>)
}