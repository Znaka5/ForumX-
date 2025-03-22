export default function Search() {
    return (<>
        <form method="get" className="search-form">
            <input type="text" name="query" placeholder="Search posts..." className="search-input" />
            <select name="filter" className="search-select">
                <option value="top">Top Voted</option>
                <option value="name">Name</option>
            </select>
            <button type="submit" className="search-button">Search</button>
        </form>
    </>)
}