import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities'

const Qualities = ({qualities: qualitiesId}) => {
  const qualities = useSelector(getQualities())
  const isLoading = useSelector(getQualitiesLoadingStatus())

  if (isLoading) {
    return 'Loading...'
  }

  const userQualities = qualitiesId.map(id => (qualities.find(q => (q._id === id))))

  return (
    <>
      {userQualities.map((q) => (
        <Quality key={q._id}
                 name={q.name}
                 color={q.color}/>
      ))}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
}

export default Qualities

const Quality = ({name, color}) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>
}

Quality.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
