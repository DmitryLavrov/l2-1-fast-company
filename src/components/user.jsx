import React from 'react'
import Qualities from "./qualities"
import Bookmark from "./bookmark"

const User = ({_id, name, profession, qualities, completedMeetings, rate, bookmark, onDelete, onBookmark}) => {
  return (
    <tr>
      <th scope="row">{name}</th>
      <td>
        <Qualities qualities={qualities}/>
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{`${rate} /5`}</td>
      <td>
        <Bookmark status={bookmark} onBookmark={() => onBookmark(_id)}/>
      </td>
      <td>
        <button className="btn btn-outline-danger"
                type="button"
                onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default User
