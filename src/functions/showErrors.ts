import { AdminSlice } from '@/stores/adminSlice';

export default function showErrors(
    form: HTMLFormElement,
    cb: AdminSlice['setDialogOpen'],
    isSingleBlockPage?: boolean,
) {
    const invalidInputs = form.querySelectorAll(':invalid') as NodeListOf<HTMLInputElement>;
    const errors: Record<Language, string> = { uk: '', ru: '', en: '' };
    invalidInputs?.forEach((input: HTMLInputElement) => {
        const name = input.name.split('-')[0];
        const lang = input.name.split('-')[1] as Language;
        const blockPosition = isSingleBlockPage ? 0 : +input.name.split('-').at(-1)! + 1;
        errors[lang] += isSingleBlockPage
            ? 'Поле ' + name + ', помилка: "' + input.validationMessage + '" \n'
            : 'Блок ' +
              blockPosition +
              ', поле ' +
              name +
              ', помилка: "' +
              input.validationMessage +
              '" \n';
    });
    const message = Object.entries(errors)
        .map(([lang, error]) =>
            error.trim().length ? `Мова ${lang.toUpperCase()}:\n${error}` : null,
        )
        .filter(Boolean)
        .join('\n');
    cb(true, 'error', `Помилки в формі! \n ${message}`);
}
