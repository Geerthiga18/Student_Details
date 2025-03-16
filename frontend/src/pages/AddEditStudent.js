import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddEditStudent() {
    const [student, setStudent] = useState({ name: '', image: null, age: '', status: 'Active' });
    const [preview, setPreview] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/students/${id}`)
                .then(res => {
                    setStudent(res.data);
                    setPreview(res.data.image || '');
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) { 
            setStudent(prevState => ({ ...prevState, image: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No authentication token found.");
                return;
            }
    
           
            const formData = new FormData();
            formData.append('name', student.name);
            formData.append('age', student.age);
            formData.append('status', student.status);
            if (student.image instanceof File) { 
                formData.append('image', student.image); 
            }
    
            console.log("Submitting Student Data:");
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]); 
            }
    
          
            const headers = {
                Authorization: `Bearer ${token}`,
            };
    
            let response;
            if (id) {
                response = await axios.put(`http://localhost:5000/api/students/${id}`, formData, { headers });
            } else {
                response = await axios.post(`http://localhost:5000/api/students`, formData, { headers });
            }
    
            console.log("Student added/updated successfully:", response.data);
            navigate('/dashboard');
        } catch (err) {
            console.error("Error submitting student:", err.response?.data || err.message);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/background.jpg')" }}>
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-blue-600">{id ? 'Edit Student' : 'Add Student'}</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input type="text" name="name" value={student.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                        {preview && <img src={preview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg shadow-md" />}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Age</label>
                        <input type="number" name="age" value={student.age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Status</label>
                        <select name="status" value={student.status} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        {id ? 'Update Student' : 'Add Student'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddEditStudent;