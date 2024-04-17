// Define the students array with details for each student
const students = [
  { name: 'Kwezi', studentNumber: 453528, yearOfStudy: 4, electives: [{ courseCode: 'ELEN4010', yearOffered: 4 }, { courseCode: 'ELEN4001', yearOffered: 4 }, { courseCode: 'ELEN4020', yearOffered: 4 }] },
  { name: 'Pieter', studentNumber: 454345, yearOfStudy: 3, electives: [{ courseCode: 'ELEN4010', yearOffered: 4 }, { courseCode: 'ELEN4001', yearOffered: 4 }, { courseCode: 'ELEN4017', yearOffered: 4 }] },
  { name: 'Jade', studentNumber: 678345, yearOfStudy: 4, electives: [{ courseCode: 'ELEN4001', yearOffered: 4 }, { courseCode: 'ELEN4020', yearOffered: 4 }, { courseCode: 'ELEN4017', yearOffered: 4 }] },
  { name: 'Kiren', studentNumber: 567893, yearOfStudy: 4, electives: [{ courseCode: 'ELEN4010', yearOffered: 4 }, { courseCode: 'ELEN4001', yearOffered: 4 }, { courseCode: 'ELEN4020', yearOffered: 4 }] }
]

// Function to create a text input for editing names
function createNameEditor (student, studentInfo, editButton) {
  const input = document.createElement('input') // Create an input field
  input.type = 'text'
  input.value = student.name // Set initial value to the current name
  input.classList.add('name-editor')

  // Add event listener for when the user stops editing (e.g., loses focus)
  input.addEventListener('blur', function () {
    student.name = input.value // Update the student's name in the array
    studentInfo.textContent = `${student.name} (Student Number: ${student.studentNumber}) - Year: ${student.yearOfStudy}`
    studentInfo.replaceWith(input) // Temporarily replace paragraph with input
    editButton.textContent = 'Edit' // Change button text back to "Edit"
  })

  return input
}

// Event listener for the Display Students button
document.getElementById('displayStudentsButton').addEventListener('click', function () {
  const studentListDiv = document.getElementById('studentList')
  studentListDiv.innerHTML = '' // Clear the existing content of the student list

  // Iterate through each student in the array
  students.forEach((student) => {
    // Create a div element for each student
    const studentDiv = document.createElement('div')
    studentDiv.classList.add('student')

    // Create a paragraph element to display student details
    const studentInfo = document.createElement('p')
    studentInfo.textContent = `${student.name} (Student Number: ${student.studentNumber}) - Year: ${student.yearOfStudy}`

    // Create a button for editing student details
    const editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.addEventListener('click', function () {
      if (editButton.textContent === 'Edit') {
        const input = createNameEditor(student, studentInfo)
        studentInfo.replaceWith(input) // Replace the paragraph with input for editing
        input.focus() // Automatically focus on the input
        editButton.textContent = 'Save' // Change the button text to "Save"
      } else {
        const input = studentDiv.querySelector('input')
        student.name = input.value // Update the student name in the array
        studentInfo.textContent = `${student.name} (Student Number: ${student.studentNumber}) - Year: ${student.yearOfStudy}`
        input.replaceWith(studentInfo) // Replace input with updated paragraph
        editButton.textContent = 'Edit' // Change the button text back to "Edit"
      }
    })

    // Append the student info and edit button to the student div
    studentDiv.appendChild(studentInfo)
    studentDiv.appendChild(editButton)

    // Append the student div to the main student list div
    studentListDiv.appendChild(studentDiv)
  })

  // Create and append a button to delete all students from the list
  const deleteAllButton = document.createElement('button')
  deleteAllButton.textContent = 'Delete All Students'
  deleteAllButton.addEventListener('click', function () {
    studentListDiv.innerHTML = '' // Remove all student entries
    deleteAllButton.remove() // Also remove the delete button itself
  })
  studentListDiv.appendChild(deleteAllButton)
})
