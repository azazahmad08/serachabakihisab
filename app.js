let data = [];

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
});

function addData() {
    const date = document.getElementById('date').value;
    const dokan = document.getElementById('dokan').value;
    const amount = document.getElementById('amount').value;
    const editIndex = document.getElementById('editIndex').value;

    if (dokan && amount) {
        if (editIndex === '') {
            data.push({ date, dokan, amount });
            alert('Data added successfully!');
        } else {
            data[editIndex] = { date, dokan, amount };
            alert('Data updated successfully!');
            document.getElementById('editIndex').value = '';
        }
        
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
            <td class="border p-2">${entry.date}</td>
            <td class="border p-2">${entry.dokan}</td>
            <td class="border p-2">${entry.amount}</td>
            <td class="border p-2 text-center">
                <button onclick="editData(${index})" class="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600 transition">Edit</button>
                <button onclick="removeData(${index})" class="bg-red-500 text-white p-1 rounded ml-2 hover:bg-red-600 transition">Remove</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById('dataTable').classList.remove('hidden');
}

function editData(index) {
    const entry = data[index];
    document.getElementById('date').value = entry.date;
    document.getElementById('dokan').value = entry.dokan;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('editIndex').value = index;
}

function removeData(index) {
    if (confirm('Are you sure you want to remove this entry?')) {
        data.splice(index, 1);
        viewData();
    }
}

function exportToExcel() {
    if (data.length === 0) {
        alert('No data to export.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Date,Dokan,Amount\n" + 
        data.map(e => `${e.date},${e.dokan},${e.amount}`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearData() {
    if (confirm('Are you sure you want to clear all data?')) {
        data = [];
        document.getElementById('dataTable').classList.add('hidden');
        alert('Data cleared!');
    }
}
