document.addEventListener('DOMContentLoaded', (event) => {
    // Load students from localStorage
    loadStudents();

    document.getElementById('createStudentBtn').addEventListener('click', function() {
        document.getElementById('createStudentModal').style.display = "block";
    });

    document.getElementsByClassName('close')[0].addEventListener('click', function() {
        document.getElementById('createStudentModal').style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('createStudentModal')) {
            document.getElementById('createStudentModal').style.display = "none";
        }
        if (event.target == document.getElementById('viewStudentModal')) {
            document.getElementById('viewStudentModal').style.display = "none";
        }
    });

    document.getElementById('studentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const photo = document.getElementById('photo').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const location = document.getElementById('location').value;
        
        const student = {
            name,
            photo,
            email,
            mobile,
            location,
            createdAt: new Date().toLocaleString()
        };

        addStudentToTable(student);
        saveStudent(student);

        document.getElementById('createStudentModal').style.display = "none";
        document.getElementById('studentForm').reset();
    });

    document.getElementsByClassName('close-view')[0].addEventListener('click', function() {
        document.getElementById('viewStudentModal').style.display = "none";
    });
});

function addStudentToTable(student) {
    const tbody = document.querySelector('tbody');
    const row = tbody.insertRow();
    
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    
    const rowIndex = tbody.rows.length - 1; // Adjust index because new row is already added

    cell1.innerHTML = rowIndex + 1;
    cell2.innerHTML = student.name;
    cell3.innerHTML = `<img src="${student.photo}" alt="${student.name}" width="50">`;
    cell4.innerHTML = student.mobile;
    cell5.innerHTML = student.email;
    cell6.innerHTML = student.location;
    cell7.innerHTML = student.createdAt;
    cell8.innerHTML = `
        <button class="viewBtn" onclick="viewStudent(${rowIndex})">View</button>
        <button class="deleteBtn" onclick="deleteStudent(${rowIndex})">Delete</button>`;
}

function viewStudent(index) {
    const students = JSON.parse(localStorage.getItem('students'));
    const student = students[index];
    document.getElementById('studentDetails').innerHTML = `
        <strong>Name:</strong> ${student.name}<br>
        <strong>Photo:</strong> <img src="${student.photo}" alt="${student.name}" width="100"><br>
        <strong>Email:</strong> ${student.email}<br>
        <strong>Mobile:</strong> ${student.mobile}<br>
        <strong>Location:</strong> ${student.location}<br>
        <strong>Created At:</strong> ${student.createdAt}<br>`;
    document.getElementById('viewStudentModal').style.display = "block";
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students'));
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function saveStudent(student) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = tbody.insertRow();
        
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);
        const cell8 = row.insertCell(7);

        cell1.innerHTML = index + 1;
        cell2.innerHTML = student.name;
        cell3.innerHTML = `<img src="${student.photo}" alt="${student.name}" width="50">`;
        cell4.innerHTML = student.mobile;
        cell5.innerHTML = student.email;
        cell6.innerHTML = student.location;
        cell7.innerHTML = student.createdAt;
        cell8.innerHTML = `
            <button class="viewBtn" onclick="viewStudent(${index})">View</button>
            <button class="deleteBtn" onclick="deleteStudent(${index})">Delete</button>`;
    });
}
