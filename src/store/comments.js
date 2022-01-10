import { createAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'

import commentService from '../services/comment.service'

const initialState = {
  entities: null,
  isLoading: true,
  error: null
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested(state) {
      state.isLoading = true
    },
    commentsReceived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
      toast.info(state.error)
    },
    commentCreated(state, action) {
      state.entities.push(action.payload)
    },
    commentCreateFailed(state, action) {
      state.error = action.payload
      toast.info(state.error)
    }
  }
})

const {commentsRequested, commentsReceived, commentsRequestFailed, commentCreated, commentCreateFailed} = commentsSlice.actions

const commentCreateRequested = createAction('comments/commentCreateRequested')

// FOR CommentsList.jsx
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
      const {content} = await commentService.getComments(userId)
      dispatch(commentsReceived(content))
    } catch (err) {
      dispatch(commentsRequestFailed(err.response?.data?.error || err.message))
    }
}

// COMMENTS ACTIONS
export const createComment = (data) => async (dispatch) => {
  dispatch(commentCreateRequested())
  const comment = {
    ...data,
    _id: nanoid(),
    createdAt: Date.now()
  }

  try {
    const {content} = await commentService.createComment(comment)
    dispatch(commentCreated(content))
  } catch (err) {
    dispatch(commentCreateFailed(err.response?.data?.error || err.message))
  }
}

// SELECTORS
export const getComments = () => state => state.comments.entities

export const getCommentsLoadingStatus = () => state => state.comments.isLoading

const {reducer: commentsReducer} = commentsSlice
export default commentsReducer
