export default function Error({
    error,
    show,
    type
}) {
    return (<div className={`error-overlay ${type}`}>Error: {error} <button onClick={show}>ok.</button></div>)
}