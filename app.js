let data = JSON.parse(localStorage.getItem('data')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    if (data.length > 0) {
        viewData();
    }
});

function saveDataToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(data));
}

function addData() {
    const date = document.getElementById('date').value;
    const dokan = document.getElementById('dokan').value;
    const amount = document.getElementById('amount').value;

    if (dokan && amount) {
        data.push({ date, dokan, amount });
        saveDataToLocalStorage();
        alert('Data added successfully!');
        document.getElementById('dokan').value = '';
        document.getElementById('amount').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

function viewData() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    if (data.length === 0) {
        alert('No data to display.');
        return;
    }

    data.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-yellow-100' : 'bg-yellow-200';
        row.innerHTML = `
            <td class="border p-1 sm:p-2"><input type="date" value="${entry.date}" onchange="updateData(${index}, 'date', this.value)" class="bg-transparent"></td>
            <td class="border p-1 sm:p-2"><input type="text" value="${entry.dokan}" onchange="updateData(${index}, 'dokan', this.value)" class="bg-transparent"></td>
            <td class="border p-1 sm:p-2"><input type="number" value="${entry.amount}" onchange="updateData(${index}, 'amount', this.value)" class="bg-transparent"></td>
            <td class="border p-1 sm:p-2 text-center">
                <button onclick="removeData(${index})" class="bg-red-500 text-white p-1 rounded ml-2 hover:bg-red-600 transition">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('inputForm').classList.add('hidden');
    document.getElementById('dataTable').classList.remove('hidden');
}

function showInputForm() {
    document.getElementById('inputForm').classList.remove('hidden');
    document.getElementById('dataTable').classList.add('hidden');
}

function updateData(index, field, value) {
    data[index][field] = value;
    saveDataToLocalStorage();
    alert(`Data updated: ${field} = ${value}`);
}

function removeData(index) {
    if (confirm('Are you sure you want to remove this entry?')) {
        data.splice(index, 1);
        saveDataToLocalStorage();
        viewData();
    }
}

function clearData() {
    if (confirm('Are you sure you want to clear all data?')) {
        data = [];
        saveDataToLocalStorage();
        viewData();
    }
}

function downloadExcel() {
    if (data.length === 0) {
        alert('No data to download.');
        return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    XLSX.writeFile(wb, 'data.xlsx');
}
