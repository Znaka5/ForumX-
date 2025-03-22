import { Link } from "react-router";

import Error from "../Error/Error";


export default function Login({
    onlogin,
    error,
    show,
    type
}) {
    
    return (<>
        { error && <Error error={error} show={show} type={type}/> }
        <section>
            <div className="register-board">
                <form onSubmit={onlogin} className="register-form">
                    <h2>Login</h2>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                <h3>Or login if you don't have an account: <Link to="/users/register" className="home-link">Register</Link> </h3>
                <h4>Or explore something other <Link to="/" className="home-link">maybe try me?</Link></h4>
            </div>
        </section>
    </>)
}