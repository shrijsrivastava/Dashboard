import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Card.css';

function Card() {
  const navigate = useNavigate();
  const location = useLocation();
  const [widgets, setWidgets] = useState({
    cspm: [],
    cwpp: [],
    registry: []
  });

  // Function to fetch widgets data
  const fetchWidgets = async () => {
    try {
      const [cspmResponse, cwppResponse, registryResponse] = await Promise.all([
        axios.get('http://localhost:5000/cspm'),
        axios.get('http://localhost:5000/cwpp'),
        axios.get('http://localhost:5000/registry')
      ]);

      setWidgets({
        cspm: cspmResponse.data,
        cwpp: cwppResponse.data,
        registry: registryResponse.data
      });
    } catch (error) {
      console.error('Error fetching widgets data:', error);
    }
  };

  // Fetch widgets data when component mounts and when location changes
  useEffect(() => {
    fetchWidgets();
  }, [location]);

  // Handle widget deletion
  const handleDelete = async (category, id) => {
    try {
      await axios.delete(`http://localhost:5000/${category}/${id}`);
      // Update state to remove the deleted widget
      setWidgets(prevState => ({
        ...prevState,
        [category]: prevState[category].filter(widget => widget.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting the widget:', error);
    }
  };

  const handleClickOpen = () => {
    navigate('/add-widget');
  };

  return (
    <div className='container'>
      <div className='text2'>CSPM Executive Dashboard</div>
      <div className='card-container'>
        {widgets.cspm.map((widget) => (
          <div key={widget.id} className='c1'>
            <div className='widget-card'>
              <h4>{widget.name}</h4>
              <p>{widget.description}</p>
              <div className='del-btn'>
              <button className="delete-btn" onClick={() => handleDelete('cspm', widget.id)}><i class="fa-solid fa-xmark"></i></button></div>
            </div>
          </div>
        ))}
        <div className='c2'>
          <button className="add-widget-btn" onClick={handleClickOpen}>+ Add Widget</button>
        </div>
      </div>

      <div className='text2'>CWPP Dashboard</div>
      <div className='card-container'>
        {widgets.cwpp.map((widget) => (
          <div key={widget.id} className='c1'>
            <div className='widget-card'>
              <h4>{widget.name}</h4>
              <p>{widget.description}</p>
              <div className='del-btn'>
              <button className="delete-btn" onClick={() => handleDelete('cwpp', widget.id)}><i class="fa-solid fa-xmark"></i></button></div>
            </div>
          </div>
        ))}
        <div className='c2'>
          <button className="add-widget-btn" onClick={handleClickOpen}>+ Add Widget</button>
        </div>
      </div>

      <div className='text2'>Registry Scan</div>
      <div className='card-container'>
        {widgets.registry.map((widget) => (
          <div key={widget.id} className='c1'>
            <div className='widget-card'>
              <h4>{widget.name}</h4>
              <p>{widget.description}</p>
              <div className='del-btn'>
              <button className="delete-btn" onClick={() => handleDelete('registry', widget.id)}><i class="fa-solid fa-xmark"></i></button></div>
            </div>
          </div>
        ))}
        <div className='c2'>
          <button className="add-widget-btn" onClick={handleClickOpen}>+ Add Widget</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
