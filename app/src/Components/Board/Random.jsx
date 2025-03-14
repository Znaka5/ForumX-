import Comments from "./Comments";

export default function Random() {
    return (<>
        <div className="random-box">
            <section>
                <h2>Board</h2>
                <div>
                    <div className="board">
                        <h2>is it that bad i like milfs?</h2>
                        <p>@bucket98</p>
                        <p>upvotes: 20</p>
                    </div>
                </div>
            </section>

            <section>
                <h3>Comments:</h3>
                <div className="board">
                    <div className="user-pfp-random">
                        <img src="/public/logo.png" alt="ForumX Logo"></img>
                    </div>
                    <h2>@Znaka5</h2>
                    <p>No it's not lol</p>
                </div>
            </section>

            <Comments />

            <p>tired of this board try some other <a href="/boards" className="home-link">boards</a></p>
        </div>
    </>)
}