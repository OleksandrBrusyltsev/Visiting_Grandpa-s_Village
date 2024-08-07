'use server';
import { BotResponseStateType } from '@/components/BookingComponent/BookingComponent';
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

export async function telegramAction(data: any) {
    const formattedDate = getCurrentDateTime();
    const message = `Звернення від: ${formattedDate},
                    Ім'я: ${data.name},
                    Телефон: ${data.phone.replace(/[^+\d]/g, '')},
                    Повідомлення: ${data.message}`;
    
    const validationResult = await recaptchaValidation(data?.recaptchaResponse);

    if (!validationResult?.ok) {
        console.log(validationResult?.message);
        return
    }
    const commonResp: BotResponseStateType[] = [];
    for(let user of tgUserId) {
       try { 
            if(user.chatId) {
                await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: user.chatId,
                        text: message,
                    })
                });
                commonResp.push({
                    status: true,
                    message: "Найближчим часом з вами зв’яжеться помічник Дідуся для уточнення бронювання"
                });
            }
        } catch (error) {
            commonResp.push({
                status: false,
                message: "Повторіть спробу ще раз"
            }); 
        }      
    }
    // return commonResp.some(item => item.status) ? 
    //     {
    //         status: true,
    //         message: "Найближчим часом з вами зв’яжеться помічник Дідуся для уточнення бронювання"
    //     } : 
    //     {
    //         status: false, message: "Повторіть спробу ще раз"
    //     }
    return Math.floor(Math.random() * 10) > 5 ? {
        status: true,
        message: "Найближчим часом з вами зв’яжеться помічник Дідуся для уточнення бронювання"
    } : 
    {
        status: false, message: "Повторіть спробу ще раз"
    }
}