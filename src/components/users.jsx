import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import api from '../api'
import Pagination from './pagination'
import {paginate} from '../utils/paginate'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'

const Users = ({users: allUsers, ...rest}) => {
  const usersPerPage = 8

  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'rate', order: 'acs'})

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

  const handleSort = (sortSet) => {
    setSortBy(sortSet)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const filteredUsers = selectedProf ? allUsers.filter(user => user.profession._id === selectedProf._id) : allUsers

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

  const usersOfPage = paginate(sortedUsers, currentPage, usersPerPage)

  const numberOfUsers = filteredUsers.length

  if ((currentPage > 1) && (currentPage >= numberOfUsers / usersPerPage + 1)) {
    setCurrentPage(Math.floor(numberOfUsers / usersPerPage))
  }

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
          <UsersTable users={usersOfPage} onSort={handleSort} sortSet={sortBy} {...rest}/>
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
