export default function Comments({
    comment
}) {
    return (<>
        <form onSubmit={comment} className="search-form">
            <input type="text" name="message" placeholder="Add a comment" className="search-input" />
            <button type="submit" className="search-button">Submit</button>
        </form>
    </>)
}