import React from 'react'

import './Login.scss'

const Login = () => (
  <>
    <h1 className='login-box__title'>Login</h1>
    <form ng-submit='login(user)'>
      <div className='row'>
        <div className='input-field col s12'>
          <input
            id='user-email'
            type='text'
            required='required'
            ng-model='user.email'
          />
          <label htmlFor='user-email'>Usuário</label>
        </div>
        <div className='input-field col s12'>
          <input
            id='user-password'
            type='password'
            required='required'
            ng-model='user.password'
          />
          <label htmlFor='user-password'>Senha</label>
        </div>
      </div>
      <div className='login-box__options'>
        <div className='row'>
          <div className='col m6 s12'>
            <p>
              <input
                className='filled-in'
                id='user-persist'
                type='checkbox'
                ng-model='user.persist'
              />
              <label htmlFor='user-persist'>Manter conectado</label>
            </p>
          </div>
          <div className='col m6 s12'>
            <a href='/recuperar_senha'>Esqueci minha senha</a>
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
  </>
)

export default Login
