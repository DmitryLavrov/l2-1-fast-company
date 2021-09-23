import React from 'react'
import PropTypes from 'prop-types'

import Bookmark from './bookmark'
import Qualities from './qualities'
import Table from './table'
import {Link} from 'react-router-dom'

const UsersTable = ({users, onSort, sortSet, onBookmark, onDelete}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => (
        <Link to={`/users/${user._id}`}>{user.name}</Link>)
    },
    qualities: {
      name: 'Качества',
      component: (user) => (
        <Qualities qualities={user.qualities}/>)
    },
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
    <Table {...{data: users, columns, sortSet, onSort}}/>
    // <Table>
    //   <TableHeader {...{columns, sortSet, onSort}}/>
    //   <TableBody {...{columns, data: users}}/>
    // </Table>
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
