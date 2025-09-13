  import React from 'react';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  // import Header from './components/common/Header';
  import Footer from './components/common/Footer';
  import Navbar from './components/common/Navbar';
  import ProtectedRoute from './components/common/ProtectedRoute';
  import DashboardPage from './pages/DashboardPage';
  import LoginPage from './pages/LoginPage';
  import SignupPage from './pages/SignupPage';
  import EmployeeListPage from './pages/EmployeeListPage';
  import EmployeeDetailPage from './components/employees/EmployeeEditModal';
  import AddEmployeePage from './pages/AddEmployeePage';
  import EditEmployeePage from './components/employees/EmployeeDetailModal';
  import UserProfilePage from './pages/UserProfilePage';
  import { AuthProvider } from './context/AuthContext';
  // import './App.css';

  function App() {
    return (
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            {/* <Header /> */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/employees" element={<ProtectedRoute><EmployeeListPage /></ProtectedRoute>} />
                <Route path="/employees/:id" element={<ProtectedRoute><EmployeeDetailPage /></ProtectedRoute>} />
                <Route path="/add-employee" element={<ProtectedRoute><AddEmployeePage /></ProtectedRoute>} />
                <Route path="/employees/:id/edit" element={<ProtectedRoute><EditEmployeePage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    );
  }

  export default App;