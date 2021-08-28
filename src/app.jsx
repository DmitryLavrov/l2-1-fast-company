import React, {useState} from 'react'

import Users from "./components/users"
import api from "./api"
import SearchStatus from "./components/searchStatus"

const App = () => {
  const initialUsers = api.users.fetchAll()
  initialUsers.forEach(user => user.bookmark = false)
  const [users, setUsers] = useState(initialUsers)

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user._id !== userId))
  }

  const handleBookmark = (userId) => {
    const i = users.findIndex(user => user._id === userId)

    const newUsers = [
      ...users.slice(0, i),
      {...users[i], bookmark: !users[i].bookmark},
      ...users.slice(i + 1)
    ]

    setUsers(newUsers)
  }

  return (
    <div>
      <SearchStatus quantity={users.length}/>
      {users.length > 0 &&
        <Users users={users}
           onDelete={handleDelete}
           onBookmark={handleBookmark}/>}
    </div>
  )
}

export default App
