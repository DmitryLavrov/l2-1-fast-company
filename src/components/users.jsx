import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const renderPhrase = (number) => {
    if (number === 0) return 'Никто с тобой не тусанет'
    if (number === 1) return '1 человек тусанет с тобой сегодня'

    const [digit0, digit1] = number.toString().split('').reverse()[0]

    if (digit1 === '1') return `${number} человек тусанут с тобой сегодня`
    if (['2', '3', '4'].includes(digit0)) return `${number} человека тусанут с тобой сегодня`
    return `${number} человек тусанут с тобой сегодня`
  }

  return (
    <>
      <h1>
        <span className={`badge bg-${users.length ? 'primary' : 'danger'}`}>
          {renderPhrase(users.length)}
        </span>
      </h1>
      <table className="table table-hover">
        {tableHead()}

        {tableRows(users, handleDelete)}
      </table>
    </>
  )
}

export default Users

const tableHead = () => {
  return (
    <thead>
    <tr>
      {['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', '']
        .map((title, key) => (
          <th scope="col" key={key}>{title}</th>
        ))}
    </tr>
    </thead>
  )
}

const tableRows = (users, handleDelete) => {
  return (
    <tbody>
    {users.map(user => tableRow(user, handleDelete))}
    </tbody>
  )
}

const tableRow = (user, handleDelete) => {
  return (
    <tr key={user._id}>
      <th scope="row">{user.name}</th>
      <td>{qualityCell(user.qualities)}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{`${user.rate} /5`}</td>
      <td>
        <button className="btn btn-outline-danger"
                type="button"
                onClick={() => handleDelete(user._id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

const qualityCell = (qualities) => {
  return (
    <>
      {qualities.map(quality => (
        <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
          {quality.name}
        </span>
      ))}
    </>
  )
}
