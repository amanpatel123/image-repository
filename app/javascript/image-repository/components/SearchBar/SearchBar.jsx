import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './searchBar.css';

const SearchBar = ({ redirectToReferrer, setRedirectToReferrer }) => {
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    return function() {
      setRedirectToReferrer(false);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query != ""){
      setRedirectToReferrer(true);
    }
  }

  return (
    <>
      <form className="searchbar__container" onSubmit={handleSubmit}>
        <div className="searchbar__input">
          <input type="search" autoComplete="off" placeholder="Search by tags" value={query} 
          className="form-control input-lg" aria-label="label" aria-describedby="basic-addon1"
          onChange={(e)=>{setQuery(e.target.value)}}
          />
        </div>
        <div className="searchbar__button">
          <Button type="submit" variant='primary'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Button>
        </div>
      </form>
      { redirectToReferrer &&
         <Redirect
          to={{
          pathname: "/repository/search",
          search: `?q=${query}`
          }}
        />
      }
    </>
  )
}

export { SearchBar };