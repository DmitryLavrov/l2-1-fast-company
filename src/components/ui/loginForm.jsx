import React, {useEffect, useState} from 'react'
import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckboxField from '../common/form/checkboxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [data, setData] = useState({email: '', password: '', stayOn: false})
  const [errors, setErrors] = useState({})

  const {singIn} = useAuth()
  const isValid = (Object.keys(errors).length === 0)

  const history = useHistory()

  const handleChange = (field) => {
    setData(prev => ({
      ...prev,
      [field.name]: field.value
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log('Submit data', data)

    try {
      await singIn(data)
      history.push('/')
    } catch (err) {
      setErrors(err)
    }
  }

  return (

          <form onSubmit={handleSubmit}>
            <TextField name="email" label="Электронная почта" value={data.email} onChange={handleChange}
                       error={errors.email}/>
            <TextField name="password" label="Пароль" type="password" value={data.password} onChange={handleChange}
                       error={errors.password}/>

            <CheckboxField value={data.stayOn} onChange={handleChange} name="stayOn">
              Оставаться в системе
            </CheckboxField>

            <button type="submit" disabled={!isValid} className="btn btn-outline-primary w-100">
              Submit
            </button>
          </form>

  )
}

export default LoginForm
