export default function Search({
    search
}) {
    return (<>
        <form className="search-form" onSubmit={search}>
            <input type="text" name="name" placeholder="Search posts..." className="search-input" />
            <select name="filter" className="search-select">
                <option value="top">Top Voted</option>
                <option value="name">Least Voted</option>
            </select>
            <button type="submit" className="search-button">Search</button>
        </form>
    </>)
}