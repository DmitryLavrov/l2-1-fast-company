import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import EditUserPage from './components/page/editUserPage/editUserPage'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])

  return (
    <div>
      <AuthProvider>
        <NavBar/>
            <Switch>
              <Route path="/login/:type?"><Login/></Route>
              <Route path="/logout"><Logout/></Route>
              <Route path="/users/:userId?/edit"><EditUserPage/></Route>
              <ProtectedRoute path="/users/:userId?"><Users/></ProtectedRoute>
              <Route path="/" exact><Main/></Route>
              <Redirect to="/"/>
            </Switch>
      </AuthProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
