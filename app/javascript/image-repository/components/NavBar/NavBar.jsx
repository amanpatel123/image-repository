import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav} from 'react-bootstrap';
import { useCurrentUserQuery } from '../../data/queries';
import { SignInForm } from '../SignInForm';
import './navBar.css';

const NavBar = () => {  
  const { data, loading: queryLoading } = useCurrentUserQuery();
  
  return (
    <Navbar scrolling dark expand="md">
      <Navbar.Brand>
        <Link className="navbar-brand" to="/repository/gallery">
          Image Repository
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/repository/gallery">Images</Link>
          <Link className="nav-link" to="/repository/my_uploads">My Uploads</Link>
        </Nav>
         { queryLoading ? 'Loading...'
            : data.currentUser 
              ? <>Welcome, {data.currentUser.fullName}!</>
              : <SignInForm />
          }
      </Navbar.Collapse>
    </Navbar>
  );
};

export { NavBar };
