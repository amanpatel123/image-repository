import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import { useCurrentUserQuery } from '../../data/queries';
import { SignInForm } from '../SignInForm';

const NavBar = () => {  
  const { data, loading: queryLoading } = useCurrentUserQuery();
  
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/home">
          Image Repository
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/home">Images</Link>
          <Link className="nav-link" to="/my_uploads">My Uploads</Link>
        </Nav>
         { queryLoading ? 'Loading...'
            : data.currentUser 
              ? <>Welcome, ! {data.currentUser.fullName}</>
              : <SignInForm />
          }
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };
