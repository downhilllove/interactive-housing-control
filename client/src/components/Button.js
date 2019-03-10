import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, className, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default Button
