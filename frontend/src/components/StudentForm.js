import React, { useState } from 'react';
import axios from 'axios';

function StudentForm({ refreshStudents }) {
    const [student, setStudent] = useState({ name: '', age: '', status: 'Active', image: null });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', student.name);
        formData.append('age', student.age);
        formData.append('status', student.status);
        if (student.image) {
            formData.append('image', student.image);
        }
        try {
            await axios.post('http://localhost:5000/api/students', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            refreshStudents();
            setStudent({ name: '', age: '', status: 'Active', image: null });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" placeholder="Name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} className="form-control mb-2" required />
            <input type="file" accept="image/*" onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} className="form-control mb-2" />
            <input type="number" placeholder="Age" value={student.age} onChange={(e) => setStudent({ ...student, age: e.target.value })} className="form-control mb-2" required />
            <select value={student.status} onChange={(e) => setStudent({ ...student, status: e.target.value })} className="form-control mb-2">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
            <button type="submit" className="btn btn-primary">Add Student</button>
        </form>
    );
}

export default StudentForm;
