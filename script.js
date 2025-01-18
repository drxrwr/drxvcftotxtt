document.getElementById('processFilesBtn').addEventListener('click', function () {
    const files = Array.from(document.getElementById('file-input').files); // Urutkan sesuai pemilihan
    const fileAreas = document.getElementById('file-areas');

    fileAreas.innerHTML = ''; // Kosongkan div sebelum menambahkan elemen baru

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileContent = e.target.result; // Konten file VCF
            const lines = fileContent.split('\n'); // Pisahkan per baris

            const phoneNumbers = [];
            lines.forEach(line => {
                if (line.startsWith('TEL:')) {
                    phoneNumbers.push(line.replace('TEL:', '').trim()); // Ambil nomor telepon
                }
            });

            // Buat elemen untuk nama file baru
            const fileNameInput = document.createElement('input');
            fileNameInput.type = 'text';
            fileNameInput.placeholder = 'Masukkan nama file TXT';
            fileNameInput.classList.add('file-name-input');

            const fileNameLabel = document.createElement('label');
            fileNameLabel.textContent = `Nama File Asal: ${file.name}`;
            fileNameLabel.classList.add('file-name-label');

            // Buat tombol unduh
            const generateButton = document.createElement('button');
            generateButton.textContent = 'Generate TXT';
            generateButton.classList.add('generate-txt-btn');

            generateButton.addEventListener('click', () => {
                const txtContent = phoneNumbers.join('\n');
                const customFileName = fileNameInput.value.trim();
                const fileName = customFileName || file.name.replace(/\.[^/.]+$/, ''); // Gunakan nama file asal jika input kosong

                const blob = new Blob([txtContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);

                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `${fileName}.txt`;
                downloadLink.textContent = `Download ${fileName}.txt`;
                downloadLink.style.display = 'block';

                fileAreas.appendChild(downloadLink);
                URL.revokeObjectURL(url);
            });

            // Tambahkan elemen ke area file
            fileAreas.appendChild(fileNameLabel);
            fileAreas.appendChild(fileNameInput);
            fileAreas.appendChild(generateButton);
        };
        reader.readAsText(file);
    });
});
