import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='nav'>
      <ul className='nav_list'>
      <li>
          <button className='nav-button' onClick={() => handleNavigate('/')}>
            Home &gt;
          </button>
        </li>
        <li>
        <li className='dash'>Dashboard V2</li> 
        </li>
        
      </ul>

      <form className='search_container' onSubmit={handleSearch}>
        <input
          type="text" 
          placeholder="Search Anything..."
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className='search-btn'><i class="fa-solid fa-magnifying-glass"></i></button>
      </form>

      <div className='nav_last'>
        <div className='empty1'></div>
        <i className="fa-solid fa-angle-down"></i>
        <div className='icon'>
          <i className="fa-regular fa-bell"></i>
        </div>
        <div className='empty2'></div>
      </div>
    </div>
  );
}

export default Navbar;
