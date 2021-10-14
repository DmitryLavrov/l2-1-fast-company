import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import EditForm from './components/ui/editForm'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <Route path="/" exact><Main/></Route>
        <Route path="/login/:type?"><Login/></Route>
        <Route path="/users/:userId?/edit"><EditForm/></Route>
        <Route path="/users/:userId?"><Users/></Route>
      </Switch>
    </div>
  )
}

export default App
