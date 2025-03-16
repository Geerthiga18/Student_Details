import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();


    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }

            const res = await axios.get('http://localhost:5000/api/students', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setStudents(res.data);
        } catch (err) {
            console.error("Error fetching students:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchStudents();  
    }, []);


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/students/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchStudents(); 
        } catch (err) {
            console.error("Error deleting student:", err.response?.data || err.message);
        }
    };

 
    const handleLogout = () => {
        localStorage.removeItem('token');  
        navigate('/'); 
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center">
          
            <h2 className="text-4xl font-bold text-blue-900 mb-6 text-center w-full">
                STUDENT DASHBOARD
            </h2>

          
            <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-300">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2 border border-gray-300 text-center">ID</th>
                        <th className="p-2 border border-gray-300 text-center">Name</th>
                        <th className="p-2 border border-gray-300 text-center">Image</th>
                        <th className="p-2 border border-gray-300 text-center">Age</th>
                        <th className="p-2 border border-gray-300 text-center">Status</th>
                        <th className="p-2 border border-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id} className="border-b border-gray-300">
                            <td className="p-2 text-center border border-gray-300">{index + 1}</td>
                            <td className="p-2 text-center border border-gray-300">{student.name}</td>
                            <td className="p-2 text-center border border-gray-300">
                                <img src={student.image} alt={student.name} width="50" className="rounded-lg" />
                            </td>
                            <td className="p-2 text-center border border-gray-300">{student.age}</td>
                            <td className={`p-2 text-center font-semibold ${student.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                {student.status}
                            </td>
                            <td className="p-2 flex justify-center space-x-2 border border-gray-300">
                                <button 
                                    onClick={() => navigate(`/edit-student/${student._id}`)} 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>

                                <button 
                                    onClick={() => handleDelete(student._id)} 
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col items-center mt-6 space-y-4">
                <button 
                    onClick={() => navigate('/add-student')} 
                    className="bg-blue-800 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-400 transition"
                >
                    Add Student
                </button>

                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-red-600 transition mt-10"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;