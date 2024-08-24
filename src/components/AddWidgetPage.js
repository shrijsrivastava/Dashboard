import React from 'react';
import axios from 'axios';
import  { useState } from 'react';
import './AddWidgetPage.css';
import { useNavigate } from 'react-router-dom';
import {  Box } from '@mui/material';

function AddWidgetPage() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleClose = () => {
    navigate('/');
  };

  const handleButtonClick = (index) => {
    setActiveButton(index);
    setIsFormVisible(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Determine the category based on the active button
    let category;
    switch (activeButton) {
      case 1:
        category = 'cspm';
        break;
      case 2:
        category = 'cwpp';
        break;
      case 3:
        category = 'registry';
        break;
      default:
        return; 
    }

    try {
      
      await axios.post(`http://localhost:5000/${category}`, {
        name: widgetName,
        description: widgetText
      });
      alert('Widget added successfully!');
      setWidgetName('');
      setWidgetText('');
      setIsFormVisible(false);
    } catch (error) {
      console.error('There was an error adding the widget!', error);
    }
  };

  const clearForm = () => {
    setWidgetName('');
    setWidgetText('');
  };

  return (
    <Box
      sx={{
        width: '50%',
        height: '100%',
        position: 'fixed',
        right: 0,
        top: 0,
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        overflow: 'auto',
      }}
    >
      <div className='title'>
        <div className='text3'>Add Widget</div> 
        <button className='cross' onClick={handleClose}><i class="fa-solid fa-xmark"></i></button>
        </div> 
        <p className='info'>Personalise your dashboard by adding the following widget</p>
        <div className='category'>
        <button className={`cspm ${activeButton === 1 ? 'active' : ''}`}
          onClick={() => handleButtonClick(1)}>CSPM</button>
        <button className={`cspm ${activeButton === 2 ? 'active' : ''}`}
          onClick={() => handleButtonClick(2)}>CWPP</button>
        <button className={`cspm ${activeButton === 3 ? 'active' : ''}`}
          onClick={() => handleButtonClick(3)}>Registry</button>
        </div>

        
      {isFormVisible && (
        <div className="form-overlay" onClick={() => setIsFormVisible(false)}>
          <div className="form-container" onClick={(e) => e.stopPropagation()}>
            {/* <h2>{activeButton === 1 ? 'Add CSPM Widget' : activeButton === 2 ? 'Add CWPP Widget' : 'Add Registry Widget'}</h2> */}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="widgetName">Widget Name</label><br/>
                <input
                  id="widgetName"
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="widgetText">Widget Text</label><br/>
                <textarea
                  id="widgetText"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className='wid'>
              <button className='cancel-button' type="button" onClick={clearForm}>Cancel</button>
              <button className='form-button' type="submit">Add Widget</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </Box>
  );
}

export default AddWidgetPage;
