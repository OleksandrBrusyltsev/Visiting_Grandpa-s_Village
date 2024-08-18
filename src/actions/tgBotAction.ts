'use server';
import { DateTimeFormatOptions } from 'next-intl';
import {tgUserId} from '../data/admin/tgUserId';
import recaptchaValidation from './recaptchaValidation';

function getCurrentDateTimeUkraine() {
    const now = new Date();

    const options: DateTimeFormatOptions = {
        timeZone: 'Europe/Kiev',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formattedParts = formatter.formatToParts(now);

    const day = formattedParts.find(part => part.type === 'day')?.value;
    const month = formattedParts.find(part => part.type === 'month')?.value;
    const year = formattedParts.find(part => part.type === 'year')?.value;
    const hours = formattedParts.find(part => part.type === 'hour')?.value;
    const minutes = formattedParts.find(part => part.type === 'minute')?.value;
    const seconds = formattedParts.find(part => part.type === 'second')?.value;

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

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
    const body = JSON.stringify({ chat_id: chatId, text: message,  parse_mode: 'Markdown'  });

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
    const formattedDate = getCurrentDateTimeUkraine();
    const message = `\*\*Звернення від:\*\* ${formattedDate},\n\*\*Ім'я:\*\* ${data.name},\n\*\*Телефон:\*\* ${data.phone.replace(/[^+\d]/g, '')},\n\*\*Повідомлення:\*\* ${data.message}`;
    
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