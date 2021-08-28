import React from 'react'

const Bookmark = ({status, onBookmark}) => {
  return (
    <i className={`bi bi-bookmark${status ? '-fill' : ''}`}
       style={{fontSize: "1.5rem", color: `${status ? '' : 'light'}green`}}
       onClick={onBookmark}/>
  )
}

export default Bookmark
