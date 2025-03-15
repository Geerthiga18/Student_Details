import React, { useState } from 'react';
import axios from 'axios';

function StudentForm({ refreshStudents }) {
    const [student, setStudent] = useState({ name: '', image: '', age: '', status: 'Active' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/students', student);
            refreshStudents();
            setStudent({ name: '', image: '', age: '', status: 'Active' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input type="text" placeholder="Name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} className="form-control mb-2" required />
            <input type="text" placeholder="Image URL" value={student.image} onChange={(e) => setStudent({ ...student, image: e.target.value })} className="form-control mb-2" required />
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