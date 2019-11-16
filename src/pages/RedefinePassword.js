import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qs from 'qs'

import Simplistic from '../templates/Simplistic'
import { useInput } from '../utils/form'
import { redefinePassword } from '../gateways/login'

const RedefinePassword = ({ navigate, location }) => {
  const password = useInput()
  const passwordConfirmation = useInput()

  const onSubmit = React.useCallback(
    (evt) => {
      evt.preventDefault()

      if (password.value !== passwordConfirmation.value) {
        toast('As senhas estão diferentes')

        return
      }

      redefinePassword({
        password: password.value,
        password_confirmation: passwordConfirmation.value,
        token: qs.parse(location.search, { ignoreQueryPrefix: true }).token,
      })
        .then(() => {
          toast('Senha redefinida com sucesso')
          navigate('/')
        })
        .catch(() => {
          toast('Erro ao redefinir senha')
        })
    },
    [password.value, passwordConfirmation.value, navigate, location.search],
  )

  return (
    <Simplistic>
      <h1 className='login-box__title'>Redefinir Senha</h1>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='user-password'
              type='password'
              value={password.value}
              onChange={password.onChange}
            />
            <label htmlFor='user-password'>Nova Senha</label>
          </div>
          <div className='input-field col s12'>
            <input
              id='user-password-confirmation'
              type='password'
              value={passwordConfirmation.value}
              onChange={passwordConfirmation.onChange}
            />
            <label htmlFor='user-password-confirmation'>
              Confirmar Nova Senha
            </label>
          </div>
        </div>
        <div className='login-box__buttons'>
          <button className='btn waves-effect waves-light' type='submit'>
            Redefinir
          </button>
        </div>
      </form>
    </Simplistic>
  )
}
RedefinePassword.propTypes = {
  navigate: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default RedefinePassword
