'use server';
import {tgUserId} from '../data/admin/tgUserId';
import recaptchaValidation from './recaptchaValidation';

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
type TgResponseType = {
    ok: boolean,
    // result: {
    //     from: {
    //         first_name: string,
    //     },
    //     date: number,
    //     text: string
    // }
}

async function sendTelegramMessage(message: string, chatId: string) {
    const attempt = 3;
    const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ chat_id: chatId, text: message });

    for (let i = 0; i < attempt; i++) {
        try {
            const response = await fetch(url, { method: 'POST', headers, body });

            if(!response.ok) throw new Error('Network error');

            const data: TgResponseType = await response.json();

            if (data.ok) {
                return {
                    chatId,
                    status: true,
                }
            } else throw new Error('Telegram response error');
            
        } catch (error) {
            console.log('Attemp №', i + 1, 'failed', error);
        }
    }
    return {
        chatId,
        status: false,
    };
}
export async function telegramAction(data: any) {
    const formattedDate = getCurrentDateTime();
    const message = `Звернення від: ${formattedDate},
                    Ім'я: ${data.name},
                    Телефон: ${data.phone.replace(/[^+\d]/g, '')},
                    Повідомлення: ${data.message}`;
    
    const validationResult = await recaptchaValidation(data?.recaptchaResponse);

    if (!validationResult?.ok) {
        return
    }
    const commonResp: Array<{chatId: string; status: boolean}> = [];
    for(let user of tgUserId) {
        if(user.chatId) {
            const chatIdResp = await sendTelegramMessage(message, user.chatId);
            commonResp.push(chatIdResp);
        }
    }
    return commonResp.some(item => item.status) ? 
        {
            status: true
        } : 
        {
            status: false
        }
    // return Math.floor(Math.random() * 10) > 5 ? {
    //     status: true,
    // } : 
    // {
    //     status: false, 
    // }
}