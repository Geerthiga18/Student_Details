import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEditStudent from './pages/AddEditStudent';
import Signup from './pages/Signup';

function App() {
    return (
        <div className="min-h-screen">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-student" element={<AddEditStudent />} />
                <Route path="/edit-student/:id" element={<AddEditStudent />} />
            </Routes>
        </div>
    );
}

export default App;
