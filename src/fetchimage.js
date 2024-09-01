const { Client, Intents } = require('discord.js');
const fs = require('fs'); // Module hệ thống file

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT
] });

const channelId = '1243511031821766751';  // ID của kênh Discord mà bạn muốn lấy hình ảnh

client.once('ready', async () => {
    console.log('Bot đã sẵn sàng!');

    const channel = await client.channels.fetch(channelId);

    if (channel.isTextBased()) {
        let messages = await channel.messages.fetch({ limit: 100 });

        // Lọc ra các tin nhắn có chứa hình ảnh
        const imageUrls = [];
        messages.forEach(msg => {
            if (msg.attachments.size > 0) {
                msg.attachments.forEach(attachment => {
                    imageUrls.push(attachment.url);
                });
            }
        });

        // Ghi các liên kết vào file JSON
        const jsonData = JSON.stringify(imageUrls, null, 2); // Chuyển đổi mảng liên kết thành JSON
        fs.writeFileSync('imageUrls.json', jsonData, 'utf8'); // Ghi vào file imageUrls.json

        console.log('Đã ghi xong các liên kết vào file imageUrls.json');
    } else {
        console.log('Kênh không phải là kênh văn bản.');
    }

    client.destroy();  // Tắt bot sau khi lấy xong
});

client.login('MTI3OTc0NzE5MjAwNDkzOTkwOA.GWPBx2.g8wUTnA5uvGIG1pZ_FJwtkWq3lb7K9rg11Qu7s');
