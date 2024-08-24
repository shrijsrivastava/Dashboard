import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddWidgetPage from './components/AddWidgetPage';
import SearchResults from './components/SearchResults';

function App() {
  return (

      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/add-widget" element={<AddWidgetPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
  
  );
}

export default App;
