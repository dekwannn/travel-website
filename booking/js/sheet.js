const API_KEY = 'AIzaSyBq4Tcp55znDVAQQ8WSuDUYRhUNYzUxgi0';
const SPREADSHEET_ID = '1nkkjW8YrBl2V0-ppsRTgTGJwhChCA3YmG2OcdfNzstw';
const RANGE = 'Sheet1!A:B';  // Ambil data dari kolom A (kolom tanggal)

async function getBookingData() {
    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        const data = await response.json();
        
        if (response.ok) {
            console.log('Data Booking:', data.values); // Tambahkan log ini
            return data.values || []; // Ambil semua nilai tanggal dan status
        } else {
            console.error('Error mengambil data:', data);
            return [];
        }
    } catch (error) {
        console.error('Error saat mengambil data dari Google Sheets:', error);
        return [];
    }
}

function cekTanggal() {
    const tanggal = document.getElementById('tanggal').value; // Mengambil nilai dari input
    console.log(`Tanggal yang dipilih: ${tanggal}`); // Debugging untuk melihat nilai tanggal
    if (!tanggal) {
        alert("Silakan pilih tanggal booking terlebih dahulu.");
        return;
    }
    checkAvailability(tanggal); // Panggil fungsi untuk memeriksa ketersediaan
}


async function addBookingData(tanggal) {
    const body = {
        values: [
            [tanggal]  // Tambahkan tanggal ke spreadsheet
        ]
    };

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Data berhasil ditambahkan ke Google Sheets:', result);
        } else {
            console.error('Gagal menambahkan data:', result);
        }
    } catch (error) {
        console.error('Error saat menambahkan data:', error);
    }
}

// Fungsi untuk mengecek apakah tanggal sudah dibooking
async function checkAvailability(tanggal) {
    const bookings = await getBookingData();

    console.log(`Tanggal yang dicari: ${tanggal}`); // Debugging

    // Cek apakah tanggal ada dalam data dan statusnya
    const booking = bookings.find(row => row[0] === tanggal);
    
    if (booking) {
        const status = booking[1]; // Ambil status dari kolom B
        console.log(`Tanggal: ${tanggal}, Status: ${status}`); // Debugging
        if (status === "Booked") {
            alert("Maaf, tanggal tersebut sudah dibooking.");
        } else {
            alert("Tanggal tersedia untuk booking.");
            // Ubah status menjadi Booked di spreadsheet
            await updateBookingStatus(tanggal, "Booked"); // Ubah status
        }
    } else {
        alert("Tanggal tersedia untuk booking."); // Jika tanggal tidak ditemukan
    }
}

async function updateBookingStatus(tanggal, statusBaru) {
    const body = {
        values: [[statusBaru]] // Nilai baru untuk status
    };

    try {
        // Mencari baris yang sesuai dengan tanggal
        const bookings = await getBookingData();
        const rowIndex = bookings.findIndex(row => row[0] === tanggal); // Temukan indeks baris berdasarkan tanggal

        if (rowIndex === -1) {
            alert("Tanggal tidak ditemukan di spreadsheet.");
            return;
        }

        // Mengupdate status di baris yang ditemukan
        const rangeToUpdate = `Sheet1!B${rowIndex + 1}`; // Baris yang ingin diperbarui (B adalah kolom status)

        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${rangeToUpdate}?valueInputOption=USER_ENTERED&key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Status berhasil diperbarui:', result);
            alert(`Status untuk tanggal ${tanggal} berhasil diubah menjadi ${statusBaru}.`);
        } else {
            console.error('Gagal memperbarui status:', result);
            alert('Terjadi kesalahan saat memperbarui status.');
        }
    } catch (error) {
        console.error('Error saat memperbarui status:', error);
        alert('Terjadi kesalahan saat memperbarui status.');
    }
}






// Panggil fungsi saat pengguna mengecek ketersediaan
function cekTanggal() {
    const tanggal = document.getElementById('tanggal').value;
    if (!tanggal) {
        alert("Silakan pilih tanggal booking terlebih dahulu.");
        return;
    }
    checkAvailability(tanggal);
}
