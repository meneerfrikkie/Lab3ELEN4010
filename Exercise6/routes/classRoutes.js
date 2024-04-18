const path = require('path')
const express = require('express')
const router = express.Router()

// Our class list array (in-memory storage for simplicity)
const classList = []

// Routes
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'class', 'index.html'))
})

router.get('/create', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'class', 'create.html'))
})

router.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'class', 'delete.html'))
})

router.get('/edit', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'class', 'edit.html'))
})

// RESTful API
router.get('/api/list', function (req, res) {
  res.json(classList) // Respond with JSON
})

router.get('/api/get/:id', function (req, res) {
  if (req.params.id >= 0 && req.params.id < classList.length) {
    res.json(classList[req.params.id]) // Return specific student by array index
  } else {
    res.status(404).send('Student not found')
  }
})

// Route to create a new student entry
router.post('/api/create', function (req, res) {
  // Assuming the form sends the student name as 'student'
  const studentName = req.body.student

  // Create a new student object; you might add more fields here
  const newStudent = {
    id: classList.length, // simple way to assign a unique ID based on array length
    name: studentName
  }

  // Add the new student to the class list array
  classList.push(newStudent)

  // Log to the server console
  console.log('Adding the following student:', newStudent)

  // Redirect back to the create page or to another appropriate page
  res.redirect(req.baseUrl + '/create')
})

// Edit a student
router.post('/api/edit', function (req, res) {
  const { id, newName } = req.body
  if (id >= 0 && id < classList.length) {
    // Ensure the student exists
    if (classList[id]) {
      // Update only the name property
      classList[id].name = newName
      res.send('Student updated successfully')
    } else {
      res.status(404).send('Student not found')
    }
  } else {
    res.status(404).send('Invalid student ID')
  }
})

// Delete a student
router.post('/api/delete', function (req, res) {
  const { id } = req.body
  if (id >= 0 && id < classList.length) {
    classList.splice(id, 1)
    res.send('Student deleted successfully')
  } else {
    res.status(404).send('Student not found')
  }
})

module.exports = router

module.exports = router
