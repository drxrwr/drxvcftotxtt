document.getElementById('processFilesBtn').addEventListener('click', function () {
  const files = Array.from(document.getElementById('file-input').files);
  const fileAreas = document.getElementById('file-areas');
  fileAreas.innerHTML = '';

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;
      const lines = fileContent.split('\n');
      const phoneNumbers = [];

      lines.forEach(line => {
        const digits = line.replace(/\D/g, '');
        if (digits.length >= 10) {
          let cleaned = line.replace(/[^\d+]/g, '').trim();
          if (!cleaned.startsWith('+') && !cleaned.startsWith('0')) {
            cleaned = '+' + cleaned;
          }
          phoneNumbers.push(cleaned);
        }
      });

      if (phoneNumbers.length === 0) {
        alert(`Tidak ada nomor ditemukan di file ${file.name}`);
        return;
      }

      const textArea = document.createElement('textarea');
      textArea.classList.add('editable-area');
      textArea.value = phoneNumbers.join('\n');

      const fileNameInput = document.createElement('input');
      fileNameInput.type = 'text';
      fileNameInput.placeholder = 'Masukkan nama file TXT (opsional)';
      fileNameInput.classList.add('file-name-input');

      const fileNameLabel = document.createElement('label');
      fileNameLabel.textContent = `Nama File Asal: ${file.name}`;
      fileNameLabel.classList.add('file-name-label');

      const generateButton = document.createElement('button');
      generateButton.textContent = 'Generate dan Download TXT';
      generateButton.classList.add('generate-txt-btn');

      generateButton.addEventListener('click', () => {
        const editedContent = textArea.value.trim();
        const customFileName = fileNameInput.value.trim();
        const fileName = customFileName || file.name.replace(/\.[^/.]+$/, '');

        if (!editedContent) {
          alert('Tidak ada nomor yang dimasukkan!');
          return;
        }

        const blob = new Blob([editedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${fileName}.txt`;
        downloadLink.click();
        URL.revokeObjectURL(url);
      });

      fileAreas.appendChild(fileNameLabel);
      fileAreas.appendChild(fileNameInput);
      fileAreas.appendChild(textArea);
      fileAreas.appendChild(generateButton);
    };
    reader.readAsText(file);
  });
});
