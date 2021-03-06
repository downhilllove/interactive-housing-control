import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../svg/logo.svg'

const routes = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Übersicht',
    to: '/uebersicht',
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
    <Navbar color="light" light expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          <Logo style={{ height: '35px' }} />
        </Link>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {routes.map(({ title, to }) => (
              <NavLink key={title} title={title} to={to} />
            ))}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
