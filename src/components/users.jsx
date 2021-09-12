import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import User from './user'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'
import GroupList from './groupList'
import api from '../api'
import SearchStatus from './searchStatus'

const Users = ({users: allUsers, ...rest}) => {
  const usersPerPage = 4

  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const filteredUsers = selectedProf ? allUsers.filter(user => user.profession._id === selectedProf._id) : allUsers
  const numberOfUsers = filteredUsers.length

  if (currentPage >= numberOfUsers / usersPerPage + 1) {
    setCurrentPage(Math.floor(numberOfUsers / usersPerPage))
  }

  const usersOfPage = paginate(filteredUsers, currentPage, usersPerPage)

  return (
    <div className="d-flex">
      {professions &&
      <div className="d-flex flex-column flex-lg-shrink-0 p-3">
        <GroupList selectedItem={selectedProf} items={professions} onItemSelect={handleProfessionSelect}/>
        <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
      </div>
      }
      <div className="d-flex flex-column">
        <SearchStatus numberOfUsers={numberOfUsers}/>
        {numberOfUsers > 0 && (
          <table className="table table-hover">
            <thead>
              <tr>
                {['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное', ''].map((title, key) => (
                  <th scope="col" key={key}>
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersOfPage.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            numberOfUsers={numberOfUsers}
            usersPerPage={usersPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
