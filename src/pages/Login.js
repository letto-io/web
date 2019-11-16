import React from 'react'
import Cookie from 'js-cookie'
import { toast } from 'react-toastify'
import { Link } from '@reach/router'

import { login } from '../gateways/login'
import { useInput } from '../utils/form'
import Simplistic from '../templates/Simplistic'

const Login = () => {
  const email = useInput()
  const password = useInput()
  const persist = useInput({ checkbox: true })

  const onSubmit = React.useCallback(
    (evt) => {
      evt.preventDefault()
      const endure = persist.checked

      login({
        email: email.value,
        password: password.value,
        persist: persist.checked,
      })
        .then(({ data }) => {
          const opts = endure ? { expires: 30 } : undefined

          Cookie.set('session', JSON.stringify(data), opts)
          Cookie.set('token', data.token, opts)
          if (data.person.admin) {
            Cookie.set('admin', true, opts)
          }
        })
        .catch(({ response: resp }) => {
          if (resp.status === 401) {
            toast('Usuário ou senha inválida', 3000)
          }
          if (resp.status >= 500) {
            toast('Erro no servidor', 3000)
          }
        })
    },
    [email.value, password.value, persist.checked],
  )

  return (
    <Simplistic>
      <h1 className='login-box__title'>Login</h1>
      <form onSubmit={onSubmit}>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='user-email'
              type='text'
              required='required'
              value={email.value}
              onChange={email.onChange}
            />
            <label htmlFor='user-email'>Usuário</label>
          </div>
          <div className='input-field col s12'>
            <input
              id='user-password'
              type='password'
              required='required'
              value={password.value}
              onChange={password.onChange}
            />
            <label htmlFor='user-password'>Senha</label>
          </div>
        </div>
        <div className='login-box__options'>
          <div className='row'>
            <div className='col m6 s12'>
              <div>
                <input
                  className='filled-in'
                  id='user-persist'
                  type='checkbox'
                  checked={persist.checked}
                  onChange={persist.onChange}
                />
                <label htmlFor='user-persist'>Manter conectado</label>
              </div>
            </div>
            <div className='col m6 s12'>
              <Link to='/recuperar-senha'>Esqueci minha senha</Link>
            </div>
          </div>
        </div>
        <button
          className='login-box__main-button btn waves-effect waves-light'
          type='submit'
        >
          Entrar
        </button>
      </form>
    </Simplistic>
  )
}

export default Login
