import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'

const routes = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Über Uns',
    to: '/ueber-uns',
  },
]

const NavLink = ({ title, to }) => (
  <NavItem>
    <Link className="nav-link" to={to}>
      {title}
    </Link>
  </NavItem>
)

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {routes.map(({ title, to }) => (
              <NavLink key={title} title={title} to={to} />
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Navigation
