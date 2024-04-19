document.addEventListener('DOMContentLoaded', function() {
    const classList = document.getElementById('classList');

    fetch('/class/api/list')
        .then(response => response.json())
        .then(data => {
            data.forEach((student, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center'; // Use flexbox to space out content

                // Span to contain the student name
                const nameSpan = document.createElement('span');
                nameSpan.textContent = student.name || student;
                li.appendChild(nameSpan);

                // Container for buttons to group them together
                const buttonGroup = document.createElement('div');

                // Create and style the Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.className = 'btn btn-warning btn-sm mr-2'; // Added margin-right (mr-2)
                editButton.onclick = function() { editStudent(index); };
                buttonGroup.appendChild(editButton);

                // Create and style the Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'btn btn-danger btn-sm'; // Bootstrap button classes
                deleteButton.onclick = function() { deleteStudent(index); };
                buttonGroup.appendChild(deleteButton);

                // Append the button group to the list item
                li.appendChild(buttonGroup);
                classList.appendChild(li);
            });
        })
        .catch(error => console.error('Error loading the class list:', error));

    function editStudent(id) {
        const newName = prompt('Enter new name:');
        fetch(`/class/api/edit/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newName })
        }).then(() => location.reload());
    }

    function deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`/class/api/delete/${id}`, { method: 'POST' })
                .then(() => location.reload());
        }
    }
});
