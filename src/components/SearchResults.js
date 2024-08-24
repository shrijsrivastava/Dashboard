import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const fetchResults = async (query) => {
    try {
      const [cspmResponse, cwppResponse, registryResponse] = await Promise.all([
        axios.get('http://localhost:5000/cspm'),
        axios.get('http://localhost:5000/cwpp'),
        axios.get('http://localhost:5000/registry')
      ]);

      const allWidgets = [
        ...cspmResponse.data,
        ...cwppResponse.data,
        ...registryResponse.data
      ];

      const filteredWidgets = allWidgets.filter(widget =>
        widget.name.toLowerCase().includes(query.toLowerCase()) ||
        widget.description.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredWidgets);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      fetchResults(query);
    }
  }, [location]);

  return (
    <div className='search-results'>
      <h2>Search Results</h2>
      <div className='results-container'>
        {results.length > 0 ? (
          results.map(widget => (
            <div key={widget.id} className='result-card'>
              <h4>{widget.name}</h4>
              <p>{widget.description}</p>
            </div>
          ))
        ) : (
          <p>No widgets found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
