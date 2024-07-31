'use server';
import {tgUserId} from '../data/admin/tgUserId';
import recapchaValidation from './recapchaValidation';

function getCurrentDateTime() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export async function telegramAction(data: any) {
    const formattedDate = getCurrentDateTime();
    const message = `Звернення від: ${formattedDate},
                    Ім'я: ${data.name},
                    Телефон: ${data.phone.replace(/[^+\d]/g, '')},
                    Повідомлення: ${data.message}`;
    
    const validationResult = await recapchaValidation(data?.recapchaResponse);

    if (!validationResult?.ok) {
        console.log(validationResult?.message);
        return
    }

    for(let user of tgUserId) {
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: user.chatId,
                text: message,
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent:', data);
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
    }
}