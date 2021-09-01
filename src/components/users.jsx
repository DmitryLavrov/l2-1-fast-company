import React, {useState} from 'react'
import User from './user'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'

const Users = ({users:allUsers, ...rest}) => {
  const numberOfUsers = allUsers.length
  const usersPerPage = 4

  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const usersOfPage = paginate(allUsers, currentPage, usersPerPage)

  return (<>
    {numberOfUsers > 0 && (
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
        {usersOfPage.map(user => <User key={user._id} {...user} {...rest}/>)}
        </tbody>
      </table>
    )}
    <Pagination numberOfUsers={numberOfUsers}
                usersPerPage={usersPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}/>
  </>)
}

export default Users
