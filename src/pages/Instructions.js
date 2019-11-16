import React from 'react'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import { isEmpty, map, groupBy, toPairs, sortBy, prop, compose } from 'ramda'
import { Link } from '@reach/router'
import { toast } from 'react-toastify'

import { index } from '../gateways/instruction'
import Header from '../components/Header'
import Home from '../templates/Home'

const Instructions = ({ onLogout }) => {
  const user = JSON.parse(Cookies.get('session')).person
  const [seasons, setSeasons] = React.useState([])

  React.useEffect(() => {
    index()
      .then(({ data }) => {
        setSeasons(
          groupBy((instruction) => {
            const startDate = new Date(instruction.start_date)

            const semester = startDate.getMonth() < 7 ? 1 : 2
            const year = startDate.getFullYear()

            return `${year}/${semester}`
          }, data),
        )
      })
      .catch(() => {
        toast('Erro ao carregar disciplinas')
      })
  }, [])

  return (
    <Home>
      <header>
        <Header title='Disciplinas' />
        <ul className='side-nav fixed barra-lateral' id='slide-out'>
          <div className='barra-lateral__header'>
            <i className='barra-lateral__user-avatar material-icons'>
              account_circle
            </i>
            <p className='barra-lateral__user-name'>{user.name}</p>
            <p className='barra-lateral__user-email'>{user.email}</p>
          </div>
          <li className='no-padding barra-lateral__item'>
            <button type='button' onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </header>
      <main>
        <oddin-preloader load-var='load' side-bar='true' />
        <div className='container'>
          {isEmpty(seasons) ? (
            <p className='empty-message center-align'>
              Você não está cadastrado(a) em nenhuma disciplina
            </p>
          ) : (
            <ul
              className='collapsible lista-disciplinas'
              data-collapsible='expandable'
            >
              {compose(
                map(([label, instructions]) => (
                  <li key={label}>
                    <div className='collapsible-header lista-disciplinas__header'>
                      <i className='material-icons'>collections_bookmark</i>{' '}
                      {label}
                    </div>
                    <div className='collection collapsible-body lista-disciplinas__body'>
                      {map(
                        (instruction) => (
                          <Link
                            key={instruction.id}
                            to={`/disciplinas/${instruction.id}/aulas`}
                            className='collection-item'
                          >
                            {instruction.lecture.name} - Turma:{' '}
                            {instruction.class_code}
                          </Link>
                        ),
                        instructions,
                      )}
                    </div>
                  </li>
                )),
                sortBy(prop(0)),
              )(toPairs(seasons))}
            </ul>
          )}
        </div>
      </main>
    </Home>
  )
}
Instructions.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default Instructions
