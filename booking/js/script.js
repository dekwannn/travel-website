let currentStep = 1;

  // Fungsi untuk melanjutkan ke langkah berikutnya
function nextStep() {
    if (validateStep(currentStep)) {
        document.getElementById('step-' + currentStep).classList.remove('active');
        currentStep++;
        document.getElementById('step-' + currentStep).classList.add('active');
        updateStepIndicator();
    }

    if (currentStep === 3) {
        fillConfirmationData();
    }

    if (currentStep === 5) {
        generateWaLink();
    }
    
  }

  // Fungsi untuk kembali ke langkah sebelumnya
  function prevStep() {
      document.getElementById('step-' + currentStep).classList.remove('active');
      currentStep--;
      document.getElementById('step-' + currentStep).classList.add('active');
      updateStepIndicator();
  }

  // Update step indicator (angka dan garis)
  function updateStepIndicator() {
      const steps = document.querySelectorAll('.step-indicator .step');
      const lines = document.querySelectorAll('.step-indicator .line');
      
      steps.forEach((step, index) => {
          if (index < currentStep) {
              step.classList.add('active');
          } else {
              step.classList.remove('active');
          }
      });

      lines.forEach((line, index) => {
          if (index < currentStep - 1) {
              line.classList.add('active');
          } else {
              line.classList.remove('active');
          }
      });
  }

  // Validasi form sebelum lanjut ke langkah berikutnya
  function validateStep(step) {
      const inputs = document.querySelectorAll('#step-' + step + ' input, #step-' + step + ' select');
      for (let input of inputs) {
          if (!input.checkValidity()) {
              input.reportValidity();
              return false;
          }
      }
      return true;
  }

  document.getElementById('pembayaran').addEventListener('change', function() {
        const pembayaran = this.value;
        const instruksiPembayaran = document.getElementById('instruksi-pembayaran');

        // Tampilkan instruksi pembayaran sesuai dengan pilihan user
        if (pembayaran === 'QRIS') {
            instruksiPembayaran.innerHTML = '<p>Scan kode QR untuk pembayaran melalui QRIS.</p>';
        } else if (pembayaran === 'Transfer BRI') {
            instruksiPembayaran.innerHTML = '<p>Transfer ke rekening BRI: 123456789.</p>';
        } else if (pembayaran === 'DANA') {
            instruksiPembayaran.innerHTML = '<p>Kirim pembayaran ke DANA: 08123456789.</p>';
        } else {
            instruksiPembayaran.innerHTML = ''; // Kosongkan jika tidak ada pilihan yang valid
        }
    });

    function generateBookingCode() {
        const randomCode = 'BOOK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        return randomCode;
    }
    
    function submitToStep6() {
        // Panggil fungsi untuk menghasilkan link WA
        generateWaLink();
    
        // Sembunyikan Step 5 dan tampilkan Step 6
        document.getElementById('step-5').style.display = 'none';
        document.getElementById('step-6').style.display = 'block';

        const tanggal = document.getElementById('tanggal').value;

    // Tambahkan tanggal booking ke Google Sheets
        addBookingData(tanggal).then(() => {
            console.log('Tanggal berhasil ditambahkan ke Google Sheets');
            
            // Pindah ke step 6
            document.getElementById('step-5').style.display = 'none';
            document.getElementById('step-6').style.display = 'block';
        }).catch((error) => {
            console.error('Error menambahkan tanggal ke Google Sheets:', error);
            alert('Terjadi kesalahan saat menambahkan data ke Google Sheets. Silakan coba lagi.');
        });
    }

    function generateWaLink() {
        const kodeBooking = generateBookingCode();  // Generate booking code
        const nama = document.getElementById('nama').value;
        const telepon = document.getElementById('telepon').value;
        const tanggal = document.getElementById('tanggal').value;
        const durasi = document.getElementById('durasi').value;
        const wilayah = document.getElementById('wilayah').value;
        const pembayaran = document.getElementById('pembayaran').value;
        
    
        // Encode pesan agar sesuai dengan format URL
        const waMessage = `Halo Admin,%0ASaya%20telah%20melakukan%20pembayaran.%0A%0AInformasi%20Booking:%0ANama:%20${nama}%0ANomor%20Telepon:%20${telepon}%0ATanggal%20Booking:%20${tanggal}%0ADurasi:%20${durasi}%0AWilayah:%20${wilayah}%0AKode%20Booking:%20${kodeBooking}%0AMetode%20Pembayaran:%20${pembayaran}%0A%0ABukti%20Pembayaran%20telah%20diunggah.%0ASilakan%20kirim%20bukti%20pembayaran%20berupa%20gambar%20melalui%20WhatsApp%20ini.`;
    
        const waLink = `https://wa.me/6281239739506?text=${waMessage}`;
        document.getElementById('waLink').setAttribute('href', waLink);

    }

    document.getElementById('durasi').addEventListener('change', function() {
    const durasi = parseInt(this.value);

    // Mendapatkan elemen dropdown paket untuk hari 1, 2, dan 3
    const paket1 = document.getElementById('paket1');
    const paket2 = document.getElementById('paket2');
    const paket3 = document.getElementById('paket3');

    const labelHari1 = document.getElementById('label-hari-1');
    const labelHari2 = document.getElementById('label-hari-2');
    const labelHari3 = document.getElementById('label-hari-3');

    // Tampilkan dropdown sesuai dengan durasi
    if (durasi === 1) {
        paket1.style.display = 'block';
        labelHari1.style.display = 'block';

        paket2.style.display = 'none';
        labelHari2.style.display = 'none';

        paket3.style.display = 'none';
        labelHari3.style.display = 'none';
    } else if (durasi === 2) {
        paket1.style.display = 'block';
        labelHari1.style.display = 'block';

        paket2.style.display = 'block';
        labelHari2.style.display = 'block';

        paket3.style.display = 'none';
        labelHari3.style.display = 'none';
    } else if (durasi === 3) {
        paket1.style.display = 'block';
        labelHari1.style.display = 'block';

        paket2.style.display = 'block';
        labelHari2.style.display = 'block';

        paket3.style.display = 'block';
        labelHari3.style.display = 'block';
    }

    // Update nilai wilayah berdasarkan pilihan
    updateWilayahField();
});

// Event listeners untuk setiap dropdown perubahan pilihan wisata
document.getElementById('paket1').addEventListener('change', updateWilayahField);
document.getElementById('paket2').addEventListener('change', updateWilayahField);
document.getElementById('paket3').addEventListener('change', updateWilayahField);

// Fungsi untuk mengupdate nilai wilayah di input field
function updateWilayahField() {
    const wilayahField = document.getElementById('wilayah');
    const durasi = parseInt(document.getElementById('durasi').value);

    let wilayah = '';
    const paket1Value = document.getElementById('paket1').value;
    const paket2Value = document.getElementById('paket2').value;
    const paket3Value = document.getElementById('paket3').value;

    // Gabungkan tempat yang dipilih berdasarkan durasi
    if (durasi >= 1) wilayah += ` ${paket1Value}`;
    if (durasi >= 2) wilayah += `, ${paket2Value}`;
    if (durasi === 3) wilayah += `,  ${paket3Value}`;

    // Tampilkan wilayah yang dipilih di input field
    wilayahField.value = wilayah;
}

function fillConfirmationData() {
    // Ambil nilai dari input Step 1
    const tanggal = document.getElementById('tanggal').value;
    const durasi = document.getElementById('durasi').value;
    const wilayah = document.getElementById('wilayah').value;

    // Ambil nilai dari input Step 2
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const telepon = document.getElementById('telepon').value;
    const alamat = document.getElementById('alamat').value;

    // Tampilkan data di form konfirmasi
    document.getElementById('confirm-tanggal').value = tanggal;
    document.getElementById('confirm-durasi').value = durasi;
    document.getElementById('confirm-wilayah').value = wilayah;
    document.getElementById('confirm-nama').value = nama;
    document.getElementById('confirm-email').value = email;
    document.getElementById('confirm-telepon').value = telepon;
    document.getElementById('confirm-alamat').value = alamat;
}

document.getElementById('bukti').addEventListener('change', function() {
    const buktiPembayaran = this.files[0];
    const waButton = document.getElementById('waLink');

    if (buktiPembayaran) {
        waButton.style.pointerEvents = 'auto';  // Aktifkan tombol WhatsApp
        waButton.style.opacity = '1';  // Setel tombol agar terlihat normal
        generateWaLink();  // Buat ulang link WA dengan data terbaru
    } else {
        waButton.style.pointerEvents = 'none';  // Nonaktifkan tombol jika belum ada bukti pembayaran
        waButton.style.opacity = '0.5';  // Setel tombol agar terlihat tidak aktif
    }
});

function goToLandingPage() {
    window.location.href = '/'; // Ganti dengan URL halaman landing Anda
}
