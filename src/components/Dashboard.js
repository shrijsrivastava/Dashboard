import React from 'react'
import './Dashboard.css'
import Card from './Card'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleAddWidgetClick = () => {
    navigate('/add-widget');
  };
    
  return (
    <div className="body">

            <div className='head'>
                <div className='text'>CNAPP Dashboard</div>
                <div className='tools'>
                <div className='btn'><button className='btn'onClick={handleAddWidgetClick}>Add Widget <i class="fa-regular fa-plus"></i></button></div>
                <div className='btn'><button className='btn'><i class="fa-solid fa-rotate"></i></button></div>
                <div className='btn'><button className='btn'><i class="fa-solid fa-ellipsis-vertical"></i></button></div>
                <div className='btn'><button className='btn1'><i class="fa-solid fa-clock"></i> | Last 2 Days <i class="fa-solid fa-angle-down"></i></button></div>
                </div>
             </div>
               <Card/>
      </div>
             

  )
}

export default Dashboard