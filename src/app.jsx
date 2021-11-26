import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
// import EditForm from './components/ui/editForm'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'
import AuthProvider from './hooks/useAuth'

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar/>
        <ProfessionProvider>
          <QualityProvider>
            <Switch>
              <Route path="/login/:type?"><Login/></Route>
              <Route path="/users/:userId?"><Users/></Route>
              {/* <Route path="/users/:userId?/edit"><EditForm/></Route> */}
              <Route path="/" exact><Main/></Route>
              <Redirect to="/"/>
            </Switch>
          </QualityProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer/>
    </div>
  )
}

export default App
