export default function Search() {
    return (<>
        <form method="get" class="search-form">
            <input type="text" name="query" placeholder="Search posts..." class="search-input" />
            <select name="filter" class="search-select">
                <option value="top">Top Voted</option>
                <option value="name">Name</option>
            </select>
            <button type="submit" class="search-button">Search</button>
        </form>
    </>)
}