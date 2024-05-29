const fs = require('fs');
const axios = require('axios');

let totalMessagesSent = 0;

async function sendMessages(urls, customText) {
  try {
    console.log(`Sending: "${customText}"`);
    const requests = urls.map((url, index) =>
      axios
        .get(`${url}${encodeURIComponent(customText)}`)
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
    console.log(`Total messages sent: ${totalMessagesSent}`);
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
    const customText = 'puh sepuh'; // Custom text
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    while (totalMessagesSent < 10) { // Menghentikan loop setelah 20 pesan
      await sendMessages(urls, customText);
      // await delay(1000); // Menambahkan delay jika diperlukan untuk mencegah pengiriman beruntun terlalu cepat
    }
    console.log('Maximum of 20 messages sent. Stopping.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
