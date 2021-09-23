import React from 'react'
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({isAdmin}) => {
  const params = useParams()
  const history = useHistory()
  const location = useLocation()
  const routeMatch = useRouteMatch()
  console.log('params', params)
  console.log('history', history)
  console.log('location', location)
  console.log('routeMatch', routeMatch)
  console.log('isAdmin', isAdmin)
  return (
    <div>
      Login
    </div>
  )
}

Login.propTypes = {
  isAdmin: PropTypes.bool
}

export default Login
