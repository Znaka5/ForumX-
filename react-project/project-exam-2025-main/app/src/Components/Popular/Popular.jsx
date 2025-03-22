import { Link } from "react-router"
import { useEffect, useState } from "react"

export default function Popular({
  boards
}) {
  const [comment, setComment] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/boards/comments")
      .then(response => response.json())
      .then(data => setComment(data.message))
      .catch(error => console.log(error.message))
  }, [])

  let avrgLikes = (comment.reduce((sum, num) => Number(sum) + Number(num.likes), 0) / comment.length).toFixed(1)
  let avrgUpvotes = (boards.reduce((sum, num) => sum + Number(num.upvotes), 0) / boards.length).toFixed(1)

  if (isNaN(avrgLikes)) {
    avrgLikes = (0).toFixed(1)
  } 

  if (isNaN(avrgUpvotes)) {
    avrgUpvotes = (0).toFixed(1)
  } 

  return (<>
    <div className="popular-boards">
      <h3>Most Popular</h3>
      <div className="board">
        <p><strong>Boards</strong></p>
        <p>Average upvotes: <span className="upvotes">{avrgUpvotes}</span></p>
        <Link className="details-button" to="/boards/popular/boards">Details</Link>
      </div>
      <div className="board">
        <p><strong>Comments</strong></p>
        <p>Average likes: <span className="upvotes">{avrgLikes}</span></p>
        <Link className="details-button" to="/boards/popular/comments">Details</Link>
      </div>
    </div>
  </>)
}