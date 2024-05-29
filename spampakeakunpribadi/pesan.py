from telethon import TelegramClient, events, sync
import asyncio

# Masukkan API ID, API Hash, dan nomor telepon Anda
api_id = 'xxxxxxxxxxxxxx'
api_hash = 'xxxxxxxxxxx'
phone_number = 'xxxxxxxxxxxx'

# Buat klien Telegram
client = TelegramClient('session_name', api_id, api_hash)

async def main():
    # Masukkan username atau ID penerima
    recipient = 'xxxxxx'
    message = 'xxxxxxxxxxxxx'
    max_messages = 20
    delay = 1  # delay dalam detik

    await client.start(phone_number)
    
    for i in range(max_messages):
        await client.send_message(recipient, message)
        print(f'Pesan {i+1} dikirim')
        await asyncio.sleep(delay)  # delay antara pesan
    
    print('Selesai mengirim pesan')

# Jalankan skrip
with client:
    client.loop.run_until_complete(main())
