let jumlahDiamond = 1;

function updateDiamondValue() {
  let inputElement = document.getElementById('jumlah-diamond');
  let value = parseInt(inputElement.value);

  if (isNaN(value) || value > 100000) {
    inputElement.value = 'error';
    document.getElementById('error-message').innerText = 'Jumlah diamond melebihi 100.000😪';
  } else {
    jumlahDiamond = value;
    document.getElementById('error-message').innerText = '';
  }
}

function tambahDiamond() {
  if (jumlahDiamond < 100000) {
    jumlahDiamond++;
    document.getElementById('jumlah-diamond').value = jumlahDiamond;
  }
}

function kurangiDiamond() {
  if (jumlahDiamond > 1) {
    jumlahDiamond--;
    document.getElementById('jumlah-diamond').value = jumlahDiamond;
    document.getElementById('error-message').innerText = ''; // Menghapus pesan error jika ada
  }
}


function hitungTotalHarga() {
  let hargaPerDiamond = 10;
  let totalHarga = jumlahDiamond * hargaPerDiamond;
  let strHarga = totalHarga.toLocaleString("en-US")

  let elemTotalHarga = document.getElementById('total-harga');
  elemTotalHarga.innerHTML = `<span class="angka-harga">${strHarga}</span> Rupiah`;
  document.getElementById('total-harga').style.border = '4px solid #fff'
  document.getElementById('total-harga').style.width = '360px'
  document.getElementById('total-harga').style.marginLeft = '430px'
  document.getElementById('total-harga').style.borderRadius = '20px'

  let elemAngkaHarga = elemTotalHarga.querySelector('.angka-harga');
  elemAngkaHarga.style.color = 'rgba(16, 69, 141, 0.83)';
}

function resetDiamond() {
  jumlahDiamond = 1;
  document.getElementById('jumlah-diamond').value = jumlahDiamond;
  document.getElementById('total-harga').innerText = '';
  document.getElementById('error-message').innerText = '';
  document.getElementById('total-harga').style.border = '';
}


function updateJumlahDiamond() {
  jumlahDiamond = parseInt(document.getElementById('jumlah-diamond').value);
}

// Mendengarkan perubahan pada input jumlah diamond
document.getElementById('jumlah-diamond').addEventListener('input', updateDiamondValue);

// Pilih Dana atau Gopay
let activeOption = '';

function togglePaymentOption(option) {
  const gopayElement = document.querySelector('.gopay');
  const danaElement = document.querySelector('.dana');

  if (option === 'gopay') {
    if (activeOption !== 'gopay') {
      gopayElement.classList.add('active');
      danaElement.classList.remove('active');
      activeOption = 'gopay';
    } else {
      gopayElement.classList.remove('active');
      activeOption = '';
    }
  } else if (option === 'dana') {
    if (activeOption !== 'dana') {
      danaElement.classList.add('active');
      gopayElement.classList.remove('active');
      activeOption = 'dana';
    } else {
      danaElement.classList.remove('active');
      activeOption = '';
    }
  }
}

function resetForm() {
  document.getElementById('input-id').value = '';
  document.getElementById('server').selectedIndex = 0;
  document.getElementById('jumlah-diamond').value = 1;
  document.getElementById('total-harga').style.border = '';
  document.getElementById('error-message').innerText = '';
  document.getElementById('total-harga').innerText = '';
  document.querySelector('.gopay').classList.remove('active');
  document.querySelector('.dana').classList.remove('active');
  activeOption = '';
}

function konfirmasiPembelian() {
  // Mengambil nilai-nilai yang akan ditampilkan pada kotak konfirmasi
  const jumlahDiamond = document.getElementById('jumlah-diamond').value;
  const metodePembayaran = activeOption;
  const userID = document.getElementById('input-id').value;
  const dunia = document.getElementById('server').value;
  // Memeriksa apakah ada pesan error
  const error = document.getElementById('error-message').innerText;
  // Memeriksa jika User ID atau metode pembayaran kosong
  if (!userID || !metodePembayaran) {
    alert('Mohon isi User ID / pilih metode pembayaran.');
    return; // Menghentikan proses konfirmasi
  }
  // Jika ada pesan error, munculkan notifikasi untuk mengisi jumlah diamond terlebih dahulu
  if (error) {
    alert('Mohon isi jumlah diamond terlebih dahulu.');
    return; // Menghentikan proses konfirmasi
  }
  // Menghitung total harga
  let hargaPerDiamond = 10;
  let totalHarga = jumlahDiamond * hargaPerDiamond;
  let strHarga = totalHarga.toLocaleString('en-US') + ' Rupiah';
  // Membuat pesan konfirmasi berdasarkan nilai-nilai yang diambil
  let konfirmasi = `Anda akan membeli ${jumlahDiamond} diamond`;
  konfirmasi += `\nMetode pembayaran: ${metodePembayaran}`;
  konfirmasi += `\nUser ID: ${userID}`;
  konfirmasi += `\nDunia: ${dunia}`;
  konfirmasi += `\nTotal harga: ${strHarga}`;
  // Menampilkan kotak dialog konfirmasi
  const hasilKonfirmasi = confirm(konfirmasi);
  // Jika pengguna menekan tombol "OK" pada kotak konfirmasi, lanjutkan ke langkah berikutnya
  if (hasilKonfirmasi) {
    resetForm();
  }
}