import React, {useEffect, useState} from 'react'

import {validator} from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckboxField from '../common/form/checkboxField'

const RegisterForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    license: false
  })
  const [errors, setErrors] = useState({})
  const [professions, setProfessions] = useState()
  const [qualities, setQualities] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  }, [])

  const isValid = (Object.keys(errors).length === 0)

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
    },
    profession: {
      isRequired: {message: 'Профессию выбрать обязательно'}
    },
    license: {
      isRequired: {message: 'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'}
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
    const isValid = validate()
    if (!isValid) return
    console.log('Submit', data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Электронная почта" value={data.email} onChange={handleChange}
                 error={errors.email}/>
      <TextField name="password" label="Пароль" type="password" value={data.password} onChange={handleChange}
                 error={errors.password}/>

      <SelectField value={data.profession} options={professions} onChange={handleChange} defaultOption="Choose..."
                   error={errors.profession} label="Выберите профессию"/>

      <RadioField value={data.sex} name="sex" onChange={handleChange} label="Выберите пол" options={[
        {name: 'Male', value: 'male'},
        {name: 'Female', value: 'female'},
        {name: 'Other', value: 'other'}
      ]}/>

      <MultiSelectField name="qualities" options={qualities} onChange={handleChange} label="Выберите качества"/>

      <CheckboxField value={data.license} onChange={handleChange} name="license" error={errors.license}>
        Подтвердить <a>лицензионное соглашение</a>
      </CheckboxField>

      <button type="submit" disabled={!isValid} className="btn btn-outline-primary w-100">Submit</button>
    </form>

  )
}

export default RegisterForm
