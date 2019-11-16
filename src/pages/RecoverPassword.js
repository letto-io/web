import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

import Simplistic from '../templates/Simplistic'
import { useInput } from '../utils/form'
import { recoverPassword } from '../gateways/login'

const RecoverPassword = ({ navigate }) => {
  const email = useInput()

  const onSubmit = React.useCallback(
    (evt) => {
      evt.preventDefault()
      const address = email.value

      recoverPassword({ email: email.value })
        .then(() => {
          toast(
            `Um Email com o link para recuperação de senha será enviado para ${address}`,
          )
          navigate('/')
        })
        .catch(() => {
          toast('Não foi possível enviar o email de recuperação de senha', 3000)
        })
    },
    [email.value, navigate],
  )

  const onReturn = React.useCallback(() => navigate('/'), [navigate])

  return (
    <Simplistic>
      <h1 className='login-box__title'>Recuperar Senha</h1>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='login-box__alert col s12'>
            <p>
              Insira o mesmo e-mail cadastrado em nosso sistema. Você receberá
              um link para a redefinição de senha
            </p>
          </div>
          <div className='input-field col s12'>
            <input
              id='user-email'
              type='text'
              required='required'
              value={email.value}
              onChange={email.onChange}
            />
            <label htmlFor='user-email'>E-mail de cadastro</label>
          </div>
        </div>
        <div className='login-box__buttons'>
          <button
            type='button'
            className='btn waves-effect waves-light'
            onClick={onReturn}
          >
            Voltar
          </button>
          <button className='btn waves-effect waves-light' type='submit'>
            Enviar
          </button>
        </div>
      </form>
    </Simplistic>
  )
}
RecoverPassword.propTypes = {
  navigate: PropTypes.func.isRequired,
}

export default RecoverPassword
