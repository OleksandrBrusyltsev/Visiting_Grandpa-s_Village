import { AdminSlice } from '@/stores/adminSlice';

export default function showErrors(
    form: HTMLFormElement,
    cb: AdminSlice['setDialogOpen'],
    isSingleBlockPage?: boolean,
) {
    const invalidInputs = form.querySelectorAll(':invalid:not(fieldset)') as NodeListOf<HTMLInputElement>;
    const errors: Record<Language, string> = { uk: '', ru: '', en: '' };
    invalidInputs?.forEach((input: HTMLInputElement) => {
        const partsLength = input.name.split('-').length;
        const name = input.name.split('-')[0];
        const lang = partsLength === 3 ? input.name.split('-')[1] as Language : 'uk';
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
