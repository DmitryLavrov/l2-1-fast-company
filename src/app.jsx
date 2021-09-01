import React, {useState} from 'react'

import Users from './components/users'
import api from './api'
import SearchStatus from './components/searchStatus'

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const handleBookmark = (userId) => {
    setUsers(users.filter(user=>{
      if (user._id === userId) {
        user.bookmark = !user.bookmark
      }
      return user
    }))
  }

  return (
    <div>
      <SearchStatus numberOfUsers={users.length}/>
      <Users users={users}
             onDelete={handleDelete}
             onBookmark={handleBookmark}/>
    </div>
  )
}

export default App
