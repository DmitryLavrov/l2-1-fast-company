import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
// import EditForm from './components/ui/editForm'
import { ProfessionProvider } from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import Logout from './layouts/logout'
import EditUserPage from './components/page/editUserPage/editUserPage'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  return (
    <div>
      <AuthProvider>
        <NavBar/>
        <ProfessionProvider>
            <Switch>
              <Route path="/login/:type?"><Login/></Route>
              <Route path="/logout"><Logout/></Route>
              <Route path="/users/:userId?/edit"><EditUserPage/></Route>
              <ProtectedRoute path="/users/:userId?"><Users/></ProtectedRoute>
              <Route path="/" exact><Main/></Route>
              <Redirect to="/"/>
            </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
