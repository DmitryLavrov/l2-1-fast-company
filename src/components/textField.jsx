import React, {useState} from 'react'
import PropTypes from 'prop-types'

const TextField = ({name, label, type = 'text', value, onChange, error}) => {
  const [showPassword, setShowPassword] = useState(false)

  const inputClasses = 'form-control' + (error ? ' is-invalid' : '')

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input name={name} id={name} type={showPassword ? 'text' : type} value={value} onChange={onChange}
               className={inputClasses}/>
        {type === 'password' &&
        <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
          <i className={'bi bi-eye' + (showPassword ? '-slash' : '')}/>
        </button>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
