import React from 'react'

import Login from './pages/Login'

import './App.scss'

const App = () => (
  <>
    <header className='login-header'>
      <img
        className='login-header__logo'
        src='/images/main_logo.png'
        alt="Logo: A cubist representation of Odin's birds"
      />
    </header>
    <main>
      <div className='container'>
        <div className='row'>
          <div className='offset-m2 offset-l3 col s12 m8 l6'>
            <div className='card'>
              <div className='login-box'>
                <div className='div'>
                  <Login />
                </div>
              </div>
            </div>
            <p className='login-info'>IFSP São Carlos &#169;</p>
          </div>
        </div>
      </div>
    </main>
  </>
)

export default App
