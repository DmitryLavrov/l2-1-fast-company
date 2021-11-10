import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
// import EditForm from './components/ui/editForm'
import { ProfessionProvider } from './hooks/useProfession'
import { QualityProvider } from './hooks/useQuality'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Switch>
        <ProfessionProvider>
          <QualityProvider>
            <Route path="/login/:type?"><Login/></Route>
            <Route path="/users/:userId?"><Users/></Route>
            {/* <Route path="/users/:userId?/edit"><EditForm/></Route> */}
          </QualityProvider>
        </ProfessionProvider>
        <Route path="/" exact><Main/></Route>
      </Switch>
      <ToastContainer/>
    </div>
  )
}

export default App
