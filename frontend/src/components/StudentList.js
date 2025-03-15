import React from 'react';

function StudentList({ students }) {
    return (
        <table className="table table-bordered mt-4">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Age</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student._id}>
                        <td>{student._id}</td>
                        <td>{student.name}</td>
                        <td><img src={student.image} alt={student.name} width="50" /></td>
                        <td>{student.age}</td>
                        <td>{student.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default StudentList;