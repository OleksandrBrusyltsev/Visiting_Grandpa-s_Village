"use server";

type ValidationResult = {
    ok: boolean
    message: string
}

export default async function recaptchaValidation(captureResponse: string): Promise<ValidationResult | undefined> {
    if (!process.env.RECAPTCHA_SERVER_TOKEN) {
        return
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SERVER_TOKEN,
            response: captureResponse
        })
    }).then(r => r.json());

    let result: ValidationResult;

    try {

        result = {
            ok: response.success,
            message: response.success ? 'Ваше замовлення успішно віправлено!' : 'Можливо ви робот!'
        }
    } catch (error) {
        result = {
            ok: false,
            message: 'Упс... Щось пішло не так:('
        }
    }

    return result;
}