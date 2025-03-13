export default function Register() {
    return (<>
        <section>
            <div className="register-board">
                <form method="post" className="register-form">
                    <h2>Register</h2>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <h3>Or login if you have an account <a href="/users/login" className="home-link">login</a></h3>
            </div>
        </section>
    </>)
}
