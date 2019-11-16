import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Router } from '@reach/router'

import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import RecoverPassword from './pages/RecoverPassword'
import RedefinePassword from './pages/RedefinePassword'

const App = () => (
  <>
    <Router>
      <Login path='/' />
      <RecoverPassword path='/recuperar-senha' />
      <RedefinePassword path='/redefinir-senha' />
    </Router>
    <ToastContainer />
  </>
)

export default App
