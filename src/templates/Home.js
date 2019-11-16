import React from 'react'
import PropTypes from 'prop-types'

const Home = ({ children }) => <div>{children}</div>
Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Home
