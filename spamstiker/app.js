const fs = require('fs');
const axios = require('axios');

let totalMessagesSent = 0;

async function sendStickers(urls, stickerId) {
  try {
    console.log(`Sending sticker: "${stickerId}"`);
    const requests = urls.map((url, index) =>
      axios
        .get(`${url}&sticker=${stickerId}`)
        .then((response) => {
          if (response.status === 200) {
            return `Link ${index + 1}: OK`;
          } else {
            return `Link ${index + 1}: Unexpected status code: ${response.status}`;
          }
        })
        .catch((error) => {
          return `Link ${index + 1}: API down!: ${error.message}`;
        })
    );
    const results = await Promise.allSettled(requests);
    results.forEach((result) => {
      console.log(result.value);
    });
    totalMessagesSent++;
    console.log(`Total stickers sent: ${totalMessagesSent}`);
    console.log('='.repeat(30));    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function main() {
  try {
    const urls = fs
      .readFileSync('urls.txt', 'utf8')
      .trim()
      .split('\n');
    const stickerId = 'CAACAgUAAxkBAAEMNgVmVfv56Li4MPVTiNn-1DxY7XH2YgACGQ4AArjh-FUdCo2M5YsX4zUE'; // ID stiker yang akan dikirim
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (totalMessagesSent < 5) { // Menghentikan loop setelah 20 pesan
      await sendStickers(urls, stickerId);
      // await delay(1000); // Menambahkan delay jika diperlukan untuk mencegah pengiriman beruntun terlalu cepat
    }
    console.log('Maximum of 20 stickers sent. Stopping.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
