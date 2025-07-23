import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Subscriptions from './pages/Subscriptions';
import Email from './pages/Email';
import Products from './pages/Products';
import Segments from './pages/Segments';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="email" element={<Email />} />
          <Route path="products" element={<Products />} />
          <Route path="segments" element={<Segments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
