document.getElementById('addStudentForm').addEventListener('submit', function (event) {
  event.preventDefault()
  const studentName = document.getElementById('studentName').value

  fetch('/class/api/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ student: studentName })
  })
    .then(response => response.json())
    .then(data => {
      updateClassList(data)
    })
    .catch(error => {
      alert('Error adding student: ' + error)
    })
})

function updateClassList (data) {
  const classList = document.getElementById('classList')
  classList.innerHTML = '' // Clear existing entries
  data.forEach(function (student) {
    const li = document.createElement('LI')
    const liText = document.createTextNode(student.name)
    li.appendChild(liText)
    classList.appendChild(li)
  })
}

// Initially load class list
fetch('/class/api/list')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load classlist: response code invalid!')
    return response.json()
  })
  .then(data => updateClassList(data))
  .catch(e => alert(e))
