import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import TextField from '../components/textField'
import {validator} from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({email: '', password: ''})
  const [errors, setErrors] = useState({})

  const isValid = (Object.keys(errors).length === 0)

  const handleChange = (event) => {
    setData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {message: 'Электронная почта обязательна для заполнения'},
      isEmail: {message: 'Введите корректный email'}
    },
    password: {
      isRequired: {message: 'Пароль обязателен для заполнения'},
      hasCapital: {message: 'Пароль должен содержать хотя бы одну заглавную букву'},
      hasNumber: {message: 'Пароль должен содержать хотя бы одну цифру'},
      min: {message: 'Пароль должен состоять из 8 и более символов', value: 8}
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValidate = validate()
    if (isValidate) return
    console.log('Error', data)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="offset-md-3 col-md-6 shadow p-3">
          <h3 className="mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField name="email" label="Электронная почта" value={data.email} onChange={handleChange}
                       error={errors.email}/>
            <TextField name="password" label="Пароль" type="password" value={data.password} onChange={handleChange}
                       error={errors.password}/>
            <button type="submit" disabled={!isValid} className="btn btn-outline-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  isAdmin: PropTypes.bool
}

export default Login
