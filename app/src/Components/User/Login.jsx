export default function Login() {
    return (<>
        <section>
            <div className="register-board">
                <form method="post" className="register-form">
                    <h2>Login</h2>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                <h3>Or login if you don't have an account: <a href="/users/register">Register</a> </h3>
            </div>
        </section>
    </>)
}