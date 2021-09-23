import React from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation, useParams, useRouteMatch} from 'react-router-dom'

const Main = ({isAdmin}) => {
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
      Main
    </div>
  )
}

Main.propTypes = {
  isAdmin: PropTypes.bool
}

export default Main
