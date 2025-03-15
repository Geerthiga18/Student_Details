import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditStudent() {
    const [student, setStudent] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/students/${id}`)
                .then(res => {
                    setStudent(res.data);
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:5000/api/students/${id}`, { ...student });
            } else {
                await axios.post('http://localhost:5000/api/students', student);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600">{id ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block text-gray-700 font-medium">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={student.name || ''} 
                        onChange={handleChange} 
                        className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    />
                    
                    <label className="block text-gray-700 font-medium">Image URL</label>
                    <input 
                        type="text" 
                        name="image" 
                        value={student.image || ''} 
                        onChange={handleChange} 
                        className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    />
                    
                    <label className="block text-gray-700 font-medium">Age</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={student.age || ''} 
                        onChange={handleChange} 
                        className="w-full mb-2 px-4 py-2 border rounded-lg" 
                    />
                    
                    <label className="block text-gray-700 font-medium">Status</label>
                    <select 
                        name="status" 
                        value={student.status || 'Active'} 
                        onChange={handleChange} 
                        className="w-full mb-4 px-4 py-2 border rounded-lg"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {id ? 'Update' : 'Add'} Student
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEditStudent;