import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import api from '../../../api'

const CommentForm = ({userId, renderComments}) => {
  const [users, setUsers] = useState()
  const [selectedUser, setSelectedUser] = useState()
  const [message, setMessage] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data.filter(i => i._id !== userId)))
  }, [])

  const handleSelect = (event) => {
    setSelectedUser(event.target.value)
  }

  const handleTextArea = (event) => {
    setMessage(event.target.value)
  }

  const handleSend = (event) => {
    event.preventDefault()

    api.comments.add({
      pageId: userId,
      userId: selectedUser,
      content: message
    }).then(renderComments()).then(() => {
      setSelectedUser('')
      setMessage('')
    })
  }

  const isValid = selectedUser && message

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h2>New comment</h2>
        <form onSubmit={handleSend}>
          <div className="mb-4">
            <select name="userId" value={selectedUser} onChange={handleSelect}
                    className="form-select" required defaultValue="">
              <option disabled value="">
                Выберите пользователя
              </option>

              {users &&
              users.map(user => (<option key={user._id} value={user._id}>{user.name}</option>))
              }
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Сообщение
            </label>
            <textarea value={message} onChange={handleTextArea} className="form-control"
                      id="exampleFormControlTextarea1" rows="3"/>
          </div>

          <div className="text-end">
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

CommentForm.propTypes = {
  userId: PropTypes.string,
  renderComments: PropTypes.func
}

export default CommentForm
