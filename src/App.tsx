import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import './App.css'
import { LoginForm } from './components/Login';
import Register from './components/Register';
import type { JSX } from 'react';
import { Dashboard } from './components/Dashboard';
import OnBoardingForm from './components/OnBoardingForm';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  return sessionId ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route path="/onboarding" element={<OnBoardingForm/>}/>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<LoginForm />} />
    </Routes>
  </Router>
  );
};

export default App;
