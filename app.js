let data = [];

function addData() {
    const dokan = document.getElementById('dokan').value;
    const amount = document.getElementById('amount').value;

    if (dokan && amount) {
        data.push({ dokan, amount });
        document.getElementById('dokan').value = '';
        document.getElementById('amount').value = '';
        alert('Data added successfully!');
    } else {
        alert('Please fill out both fields.');
    }
}

function exportToExcel() {
    if (data.length === 0) {
        alert('No data to export.');
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8," + 
        data.map(e => e.dokan + "," + e.amount).join("\n");

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
        alert('Data cleared!');
    }
}
