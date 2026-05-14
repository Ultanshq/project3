// 1. Database Makanan Lebih Lengkap
const databaseMakanan = [
    // --- MAKANAN BERAT ---
    { nama: "Nasi Putih", porsi: "1 piring (150g)", kalori: 204 },
    { nama: "Nasi Goreng Biasa", porsi: "1 piring", kalori: 570 },
    { nama: "Nasi Uduk", porsi: "1 piring", kalori: 260 },
    { nama: "Nasi Kuning", porsi: "1 piring", kalori: 250 },
    { nama: "Ayam Goreng (Dada)", porsi: "1 potong", kalori: 250 },
    { nama: "Ayam Bakar", porsi: "1 potong", kalori: 190 },
    { nama: "Bebek Goreng", porsi: "1 potong", kalori: 337 },
    { nama: "Ikan Bakar (Nila/Gurame)", porsi: "1 porsi", kalori: 180 },
    { nama: "Ikan Lele Goreng", porsi: "1 ekor", kalori: 240 },
    { nama: "Sate Kambing", porsi: "1 tusuk", kalori: 54 },
    { nama: "Sate Padang", porsi: "1 porsi (10 tusuk)", kalori: 580 },
    { nama: "Rendang Sapi", porsi: "1 potong", kalori: 195 },
    { nama: "Gulai Kambing", porsi: "1 mangkok", kalori: 350 },
    { nama: "Soto Betawi", porsi: "1 mangkok", kalori: 490 },
    { nama: "Soto Ayam", porsi: "1 mangkok", kalori: 312 },
    { nama: "Bakso Sapi + Mie", porsi: "1 mangkok", kalori: 450 },
    { nama: "Mie Ayam Biasa", porsi: "1 mangkok", kalori: 421 },
    { nama: "Gado-Gado", porsi: "1 piring", kalori: 295 },
    { nama: "Ketoprak", porsi: "1 piring", kalori: 450 },
    { nama: "Pempek Kapal Selam", porsi: "1 buah besar", kalori: 345 },

    // --- LAUK PAUK ---
    { nama: "Telur Rebus", porsi: "1 butir", kalori: 77 },
    { nama: "Telur Dadar", porsi: "1 butir", kalori: 93 },
    { nama: "Tempe Goreng", porsi: "1 potong", kalori: 118 },
    { nama: "Tempe Bacem", porsi: "1 potong", kalori: 80 },
    { nama: "Tahu Goreng", porsi: "1 potong", kalori: 35 },
    { nama: "Perkedel Kentang", porsi: "1 buah", kalori: 120 },
    { nama: "Ati Ampela Ayam", porsi: "1 tusuk", kalori: 145 },

    // --- CEMILAN / JAJANAN ---
    { nama: "Martabak Manis (Terang Bulan)", porsi: "1 potong", kalori: 270 },
    { nama: "Martabak Telur", porsi: "1 potong", kalori: 200 },
    { nama: "Bakwan Sayur (Bala-bala)", porsi: "1 buah", kalori: 137 },
    { nama: "Pisang Goreng", porsi: "1 buah", kalori: 150 },
    { nama: "Singkong Rebus", porsi: "1 potong sedang", kalori: 146 },
    { nama: "Siomay Bandung", porsi: "1 buah", kalori: 51 },
    { nama: "Batagor", porsi: "1 buah", kalori: 58 },
    { nama: "Krupuk Kaleng (Putih)", porsi: "1 buah", kalori: 65 },
    { nama: "Donat Gula", porsi: "1 buah", kalori: 210 },

    // --- MINUMAN ---
    { nama: "Es Teh Manis", porsi: "1 gelas", kalori: 90 },
    { nama: "Es Jeruk", porsi: "1 gelas", kalori: 110 },
    { nama: "Jus Alpukat + Susu", porsi: "1 gelas", kalori: 250 },
    { nama: "Kopi Susu Gula Aren", porsi: "1 gelas", kalori: 180 },
    { nama: "Susu Sapi Segar", porsi: "1 gelas", kalori: 146 },
    { nama: "Teh Tarik", porsi: "1 gelas", kalori: 155 },
    { nama: "Minuman Soda", porsi: "1 kaleng (330ml)", kalori: 140 },

    // --- FAST FOOD ---
    { nama: "Burger Keju", porsi: "1 buah", kalori: 300 },
    { nama: "Kentang Goreng", porsi: "1 porsi sedang", kalori: 312 },
    { nama: "Pizza", porsi: "1 slice", kalori: 285 },
];

// 2. Fungsi untuk menampilkan data ke tabel
function tampilkanSemua(data) {
    const listTable = document.getElementById('foodList');
    const noResult = document.getElementById('noResult');
    
    listTable.innerHTML = "";

    if (data.length === 0) {
        noResult.classList.remove('hidden');
    } else {
        noResult.classList.add('hidden');
        data.forEach(item => {
            const row = `
                <tr>
                    <td><strong>${item.nama}</strong></td>
                    <td>${item.porsi}</td>
                    <td><span class="cal-badge">${item.kalori} kkal</span></td>
                </tr>
            `;
            listTable.innerHTML += row;
        });
    }
}

// 3. Fungsi Pencarian (Live Search)
function cariMakanan() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const hasilFilter = databaseMakanan.filter(makanan => {
        return makanan.nama.toLowerCase().includes(input);
    });
    tampilkanSemua(hasilFilter);
}

document.addEventListener('DOMContentLoaded', () => {
    tampilkanSemua(databaseMakanan);
});