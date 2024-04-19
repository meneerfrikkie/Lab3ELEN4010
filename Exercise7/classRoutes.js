const express = require('express');
const router = express.Router();

let students = []; // Simple array to store students

router.get('/api/list', (req, res) => {
    res.json(students); // Send the list of students
});

router.post('/api/create', (req, res) => {
    const { student } = req.body;
    students.push(student); // Add new student to array
    res.redirect('/class');
});

router.post('/api/edit/:id', (req, res) => {
    const { id } = req.params;
    const { newName } = req.body;
    students[parseInt(id)] = newName; // Update student name
    res.redirect('/class');
});

router.post('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    students.splice(parseInt(id), 1); // Remove student
    res.redirect('/class');
});

module.exports = router;
