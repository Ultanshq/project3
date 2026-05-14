// 1. Inisialisasi Data saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    muatData();
});

// 2. Fungsi untuk Menambah Item Makan
function tambahItem() {
    const namaInput = document.getElementById('food-name');
    const calInput = document.getElementById('food-cal');

    const nama = namaInput.value;
    const kalori = parseInt(calInput.value);

    // Validasi input
    if (nama === "" || isNaN(kalori) || kalori <= 0) {
        alert("Masukkan nama makanan dan jumlah kalori yang valid!");
        return;
    }

    // Buat objek data baru
    const itemBaru = {
        id: Date.now(),
        nama: nama,
        kalori: kalori
    };

    // Ambil data lama dari LocalStorage, tambah yang baru, lalu simpan lagi
    const dataLama = JSON.parse(localStorage.getItem('diaryMakan')) || [];
    dataLama.push(itemBaru);
    localStorage.setItem('diaryMakan', JSON.stringify(dataLama));

    // Reset Form
    namaInput.value = "";
    calInput.value = "";

    // Refresh Tampilan
    muatData();
}

// 3. Fungsi untuk Memuat & Menampilkan Data
function muatData() {
    const listElement = document.getElementById('diary-list');
    const consumedText = document.getElementById('consumed-val');
    const remainingText = document.getElementById('remaining-calories');
    const targetText = document.getElementById('target-val');

    // Ambil target kalori dari halaman depan (default 2000 jika belum hitung)
    const targetKalori = parseInt(localStorage.getItem('userTarget')) || 2000;
    targetText.innerText = targetKalori;

    // Ambil daftar makanan dari LocalStorage
    const daftarMakan = JSON.parse(localStorage.getItem('diaryMakan')) || [];
    
    // Hitung total kalori yang sudah dikonsumsi
    let totalTerpakai = 0;
    listElement.innerHTML = ""; // Kosongkan list sebelum diisi

    daftarMakan.forEach(item => {
        totalTerpakai += item.kalori;
        
        // Buat elemen list HTML
        const li = document.createElement('li');
        li.className = 'diary-item';
        li.innerHTML = `
            <div class="info">
                <b>${item.nama}</b>
                <span>${item.kalori} kkal</span>
            </div>
            <button class="btn-del" onclick="hapusItem(${item.id})">Hapus</button>
        `;
        listElement.appendChild(li);
    });

    // Update Angka Statistik
    consumedText.innerText = totalTerpakai;
    const sisa = targetKalori - totalTerpakai;
    remainingText.innerText = sisa;

    // Ganti warna jika sisa kalori minus (overlimit)
    if (sisa < 0) {
        remainingText.style.color = "#ff4757";
    } else {
        remainingText.style.color = "white";
    }
}

// 4. Fungsi untuk Menghapus Satu Item
function hapusItem(id) {
    let daftarMakan = JSON.parse(localStorage.getItem('diaryMakan')) || [];
    // Filter data: buang yang ID-nya cocok
    daftarMakan = daftarMakan.filter(item => item.id !== id);
    localStorage.setItem('diaryMakan', JSON.stringify(daftarMakan));
    muatData();
}

// 5. Fungsi untuk Reset Semua Data Hari Ini
function resetDiary() {
    if (confirm("Apakah kamu yakin ingin menghapus semua catatan makan hari ini?")) {
        localStorage.removeItem('diaryMakan');
        muatData();
    }
}