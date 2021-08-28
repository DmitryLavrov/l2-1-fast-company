import React from 'react'
import User from "./user"

const Users = ({users, ...rest}) => {
  return (
    <table className="table table-hover">
      <thead>
      <tr>
        {['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное', '']
          .map((title, key) => (
            <th scope="col" key={key}>{title}</th>
          ))}
      </tr>
      </thead>
      <tbody>
      {users.map(user => <User key={user._id} {...user} {...rest}/>)}
      </tbody>
    </table>
  )
}

export default Users
