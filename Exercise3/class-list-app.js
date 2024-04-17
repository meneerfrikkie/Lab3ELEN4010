// Array of student objects
const students = [
  { name: 'Kwezi', studentNumber: 453528, yearOfStudy: 4 },
  { name: 'Pieter', studentNumber: 454345, yearOfStudy: 3 },
  { name: 'Jade', studentNumber: 678345, yearOfStudy: 4 },
  { name: 'Kiren', studentNumber: 567893, yearOfStudy: 4 }
]

// Function to initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput')
  const filterPropertySelect = document.getElementById('filterProperty')
  const studentListDiv = document.getElementById('studentList')

  // Listen for user input to dynamically filter the student list
  searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase()
    const filterProperty = filterPropertySelect.value
    const filteredStudents = students.filter(student =>
      student[filterProperty].toString().toLowerCase().includes(searchText)
    )
    updateStudentList(filteredStudents)
  })

  // Function to update the displayed list of students based on search results
  function updateStudentList (filteredStudents) {
    studentListDiv.innerHTML = '' // Clear previous results
    filteredStudents.forEach(student => {
      const studentDiv = document.createElement('div')
      studentDiv.textContent = `${student.name} - Student Number: ${student.studentNumber}, Year: ${student.yearOfStudy}`
      studentListDiv.appendChild(studentDiv)
    })
  }

  // Initially display all students
  updateStudentList(students)
})
