import React from 'react';

function StudentList({ students }) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-bordered mt-4 bg-white shadow-md rounded-lg w-full">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="p-2 text-center">ID</th>
                        <th className="p-2 text-center">Name</th>
                        <th className="p-2 text-center">Image</th>
                        <th className="p-2 text-center">Age</th>
                        <th className="p-2 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student._id} className="border-b border-gray-300 text-center">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{student.name}</td>
                            <td className="p-2">
                                <img
                                    src={student.image || '/assets/placeholder.jpg'}
                                    alt={student.name}
                                    width="50"
                                    className="rounded-lg"
                                />
                            </td>
                            <td className="p-2">{student.age}</td>
                            <td className={`p-2 font-semibold ${student.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                {student.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
