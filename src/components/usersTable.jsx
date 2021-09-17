import React from 'react'
import PropTypes from 'prop-types'

import TableHeader from './tableHeader'
import TableBody from './tableBody'
import Bookmark from './bookmark'

const UsersTable = ({users, onSort, sortSet, onBookmark, onDelete}) => {
  const columns = {
    name: {path: 'name', name: 'Имя'},
    qualities: {name: 'Качества'},
    profession: {path: 'profession.name', name: 'Профессия'},
    completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
    rate: {path: 'rate', name: 'Оценка'},
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark status={user.bookmark} onBookmark={() => onBookmark(user._id)}/>)
    },
    delete: {
      component: (user) => (
        <button className="btn btn-outline-danger" type="button" onClick={() => onDelete(user._id)}>
          Delete
        </button>)
    }
  }

  return (
    <table className="table table-hover">
      <TableHeader {...{columns, sortSet, onSort}}/>
      <TableBody {...{columns, data: users}}/>
    </table>
  )
}

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  sortSet: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  onBookmark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UsersTable
