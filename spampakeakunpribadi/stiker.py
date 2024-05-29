from telethon import TelegramClient, sync
from telethon.tl.types import InputDocument
import asyncio

# Masukkan API ID, API Hash, dan nomor telepon Anda
api_id = 'xxxxxxxxxxxxxx'
api_hash = 'xxxxxxxxxxx'
phone_number = 'xxxxxxxxxxxx'

# Buat klien Telegram
client = TelegramClient('session_name', api_id, api_hash)

async def get_sticker_info(user_id, message_id):
    await client.start(phone_number)
    print(f"Trying to fetch message with ID: {message_id} from user ID: {user_id}")
    try:
        msg = await client.get_messages(user_id, ids=message_id)
        print(f"Message fetched: {msg}")
        if not msg:
            raise ValueError("Pesan tidak ditemukan.")
        if not msg.media:
            raise ValueError("Pesan tidak mengandung media.")
        if not hasattr(msg.media, 'document'):
            raise ValueError("Pesan tidak mengandung dokumen stiker.")
        
        sticker = msg.media.document
        print(f"Sticker info: {sticker}")
        return sticker
    except Exception as e:
        print(f"Error saat mengambil pesan: {e}")
        raise

async def main():
    # Masukkan username atau ID penerima
    recipient = 'xxxxxxx'
    user_id = xxxxxxxxx  # Ganti dengan user ID dari link
    message_id = xxxxxxxxxx  # Ganti dengan message ID dari link

    # Ambil informasi stiker
    try:
        sticker_info = await get_sticker_info(user_id, message_id)
    except ValueError as ve:
        print(f"Error: {ve}")
        return

    # Buat objek InputDocument
    input_document = InputDocument(
        id=sticker_info.id,
        access_hash=sticker_info.access_hash,
        file_reference=sticker_info.file_reference
    )

    max_messages = 20
    delay = 1  # delay dalam detik

    for i in range(max_messages):
        await client.send_file(recipient, input_document)
        print(f'Stiker {i+1} dikirim')
        await asyncio.sleep(delay)  # delay antara pengiriman

    print('Selesai mengirim stiker')

# Jalankan skrip
with client:
    client.loop.run_until_complete(main())
