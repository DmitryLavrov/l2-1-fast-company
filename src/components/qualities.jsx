import React from 'react'
import PropTypes from 'prop-types'

const Qualities = ({qualities}) => {
  return (
    <>
      {qualities.map((quality) => (
        <Quality key={quality._id} {...quality} />
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
