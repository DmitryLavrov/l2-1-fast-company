import React from 'react'

const Qualities = ({qualities}) => {
  return (
    <>
      {qualities.map(quality => (
        <Quality key={quality._id} {...quality}/>
      ))}
    </>
  )
}

export default Qualities

const Quality = ({name, color}) => {
  return (
    <span className={`badge bg-${color} m-1`}>
      {name}
    </span>
  )
}
