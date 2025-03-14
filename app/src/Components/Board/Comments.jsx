export default function Comments() {
    return (<>
        <form method="get" className="search-form">
            <input type="text" name="comment" placeholder="Add a comment" className="search-input" />
            <button type="submit" className="search-button">Submit</button>
        </form>
    </>)
}