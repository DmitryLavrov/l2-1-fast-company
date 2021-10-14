import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom'

import api from '../../../api'
import UserCards from './userCards'
import CommentsList from './commentsList'
import CommentForm from './commentForm'

const UserPage = ({userId}) => {
  const [user, setUser] = useState()
  const history = useHistory()
  const [comments, setComments] = useState([])

  useEffect(() => {
    api.users.getById(userId).then(user => setUser(user))
  }, [])

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = () => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data))
  }

  const handleDeleteComment = (id) => {
    api.comments.remove(id).then(fetchComments)
  }

  const handleButton = () => {
    history.push(`/users/${userId}/edit`)
  }

  if (!user) return <h3>Loading....</h3>

  return (
    <div className="container">
      <div className="row gutters-sm">

        <UserCards user={user} onClickButton={handleButton}/>

        <div className="col-md-8">
          <CommentForm userId={userId} renderComments={fetchComments}/>

          {(comments.length > 0) &&
          <CommentsList comments={comments} onDelete={handleDeleteComment}/>
          }
        </div>
      </div>
    </div>
  )
}

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
}

export default UserPage
