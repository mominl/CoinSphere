import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TransactionHistory from './pages/TransactionHistory';
import Transfer from './pages/Transfer';
import Learn from './pages/Learn';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/learn" element={<Learn />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="bottom-right"
            theme="dark"
            autoClose={5000}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;