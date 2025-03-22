import { Link } from "react-router";

import Error from "../Error/Error";
import { useContext } from "react";
import MyContext from "../Context/Context";

export default function Register({
    onRegister,
    show,
}) {
    const {err, type} = useContext(MyContext)
    
    return (<>
        {err && <Error error={err} show={show} type={type} />}

        <section>
            <div className="register-board">
                <form onSubmit={onRegister} className="register-form" >
                    <h2>Register</h2>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <h3>Or login if you have an account <Link to="/users/login" className="home-link">login</Link></h3>
                <h4>Or explore something other <Link to="/" className="home-link">maybe try me?</Link></h4>
            </div>
        </section>
    </>)
}