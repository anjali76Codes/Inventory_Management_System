import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InventoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
