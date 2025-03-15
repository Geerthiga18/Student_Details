import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEditStudent from './pages/AddEditStudent';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
    return (
        <div className="bg-gray-200 min-h-screen">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddEditStudent />} />
                <Route path="/edit-student/:id" element={<AddEditStudent />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </div>
    );
}

export default App;
