import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

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
    }
  }
})

const {commentsRequested, commentsReceived, commentsRequestFailed} = commentsSlice.actions

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
      const {content} = await commentService.getComments(userId)
      dispatch(commentsReceived(content))
    } catch (err) {
      dispatch(commentsRequestFailed(err.message))
    }
}

export const getComments = () => state => state.comments.entities
export const getCommentsLoadingStatus = () => state => state.comments.isLoading

const {reducer: commentsReducer} = commentsSlice

export default commentsReducer
