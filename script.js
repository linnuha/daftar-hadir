document.addEventListener('DOMContentLoaded', (event) => {
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('password');
    const authContainer = document.getElementById('authContainer');
    const attendanceContainer = document.getElementById('attendanceContainer');
    const form = document.getElementById('attendanceForm');
    const nameInput = document.getElementById('name');
    const attendanceList = document.getElementById('attendanceList');
    const exportBtn = document.getElementById('exportBtn');

    const correctPassword = 'password123'; // Ganti dengan password yang diinginkan

    authForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (passwordInput.value === correctPassword) {
            authContainer.style.display = 'none';
            attendanceContainer.style.display = 'block';
        } else {
            alert('Password salah. Coba lagi.');
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addNameToList(nameInput.value);
        nameInput.value = '';
    });

    exportBtn.addEventListener('click', function() {
        exportToExcel();
    });

    function addNameToList(name) {
        if(name.trim() !== '') {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            const currentDate = new Date();
            const dateStr = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
            const listItemCount = attendanceList.getElementsByTagName('li').length + 1;
            li.innerHTML = `<span>${listItemCount}. ${name}</span><span class="date">${dateStr}</span>`;
            attendanceList.appendChild(li);
        }
    }

    function exportToExcel() {
        const rows = [['No', 'Nama', 'Tanggal']];
        const items = attendanceList.getElementsByTagName('li');
        let index = 1;
        for (let item of items) {
            const name = item.querySelector('span').textContent.split('. ')[1];
            const date = item.querySelector('.date').textContent;
            rows.push([index, name, date]);
            index++;
        }

        const worksheet = XLSX.utils.aoa_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Hadir");

        XLSX.writeFile(workbook, 'daftar_hadir.xlsx');
    }
});
