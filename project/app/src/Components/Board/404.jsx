import { Link } from "react-router";

export default function Not_Found() {
    return (<>
    <div className="not-found">
        <h1>404!</h1>
        <h2>Oh no!!! The page you're trying to access is either non existend or you don't have access to it</h2>
        <h3>Don't stay here come on go back to the <Link to="/" className="home-link">home page</Link> </h3>
    </div>
    </>)
}