import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../index.css';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedLink from './ProtectedLink';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function NavigationBar() {
  const { isAuthenticated, isLoading } = useAuth0();
  const user = useContext(UserContext);
  console.log(user?.user?.role);

  return (
    <>
      <Navbar className="navbar" bg="primary" variant="dark" expand="lg">
        <Container>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Brand href="/">
              <img src="images/logo.png" alt="logo" className="logo" />
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {isLoading ? (
                  <>loading</>
                ) : !isAuthenticated ? (
                  <>
                    <Nav.Link as={NavLink} to="/" exact>
                      Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/aboutus">
                      AboutUs
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <ProtectedLink name="Home" link="/home" user={user} roles={['admin', 'worker']} />
                    <Nav.Link as={NavLink} to="/" exact>
                      Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/hauswork">
                      HausWork
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/aboutus">
                      AboutUs
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/contact">
                      Contact
                    </Nav.Link>
                    {user?.user?.role === 'admin' && (
                      <Nav.Link as={NavLink} to="/usermanagement">
                        UserManagement
                      </Nav.Link>
                    )}
                  </>
                )}
              </Nav>
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;