const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
    try {
        console.log("Received student data:", req.body); 
        console.log("Received file:", req.file); 

        if (!req.body.name || !req.body.age || !req.body.status) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
        const student = new Student({ name: req.body.name, image: imagePath, age: req.body.age, status: req.body.status });

        await student.save();
        res.status(201).json({ msg: 'Student added successfully', student });
    } catch (err) {
        console.error("Error adding student:", err);
        res.status(500).json({ msg: 'Server error' });
    }
};





exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { name, age, status } = req.body;
        const updateData = { name, age, status };

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
