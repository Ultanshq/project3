/**
 * Fungsi Utama: Hitung Kalori
 * Dipanggil saat tombol "Hitung Sekarang" diklik
 */
function hitungKalori() {
    // 1. Ambil data dari elemen input
    const gender = document.getElementById('gender').value;
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const usia = parseInt(document.getElementById('usia').value);
    const aktivitas = parseFloat(document.getElementById('aktivitas').value);

    // 2. Validasi Input (Pastikan tidak ada kolom yang kosong)
    if (!berat || !tinggi || !usia || berat <= 0 || tinggi <= 0 || usia <= 0) {
        alert("Ups! Mohon masukkan data tubuh yang valid ya.");
        return;
    }

    // 3. Rumus Mifflin-St Jeor untuk BMR (Basal Metabolic Rate)
    let bmr;
    if (gender === 'pria') {
        // Rumus Pria: (10 * BB) + (6.25 * TB) - (5 * Usia) + 5
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) + 5;
    } else {
        // Rumus Wanita: (10 * BB) + (6.25 * TB) - (5 * Usia) - 161
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) - 161;
    }

    // 4. Hitung TDEE (Total Daily Energy Expenditure) 
    // TDEE = BMR * Faktor Aktivitas
    const tdee = Math.round(bmr * aktivitas);

    // Tambahkan ini di home/index.js agar datanya tersimpan untuk halaman Diary
localStorage.setItem('userTarget', tdee);

    // 5. Tampilkan Hasil ke Layar
    tampilkanHasil(tdee);
}

/**
 * Fungsi untuk menampilkan hasil dengan efek transisi
 */
function tampilkanHasil(totalKalori) {
    const resultBox = document.getElementById('result-container');
    const calorieText = document.getElementById('calorie-number');

    // Munculkan kotak hasil (hapus class hidden)
    resultBox.classList.remove('hidden');

    // Efek Animasi Angka Berjalan (Counter)
    let startValue = 0;
    let endValue = totalKalori;
    let duration = 1000; // 1 detik
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Hitung angka saat ini berdasarkan progress (0 sampai 1)
        const currentNumber = Math.floor(progress * endValue);
        calorieText.innerText = currentNumber.toLocaleString('id-ID');

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);

    // Opsional: Scroll otomatis ke kotak hasil di HP
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Tambahan: Menekan 'Enter' di keyboard juga akan memicu tombol hitung
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        hitungKalori();
    }
});