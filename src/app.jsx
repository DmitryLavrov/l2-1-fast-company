import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Users from './layouts/users'
import NavBar from './components/navBar'
import Main from './layouts/main'
import Login from './layouts/login'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path="/" exact><Main/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/users/:userId?"><Users/></Route>
      </Switch>
    </div>
  )
}

export default App
