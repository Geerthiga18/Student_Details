const express = require('express');
const multer = require('multer');
const { verifyToken } = require('../middleware/authMiddleware');
const { addStudent, getStudents, updateStudent, deleteStudent } = require('../controllers/studentController');

const router = express.Router();

// ✅ Configure Multer Storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Protect routes with `verifyToken`
router.post('/', verifyToken, upload.single('image'), addStudent);
router.get('/', verifyToken, getStudents);
router.put('/:id', verifyToken, upload.single('image'), updateStudent);
router.delete('/:id', verifyToken, deleteStudent);

module.exports = router;
