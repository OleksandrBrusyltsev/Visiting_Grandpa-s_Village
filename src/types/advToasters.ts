type AdvToaster = {
    id: number;
    startDate: string;
    endDate: string;
    timeout: number;
    translations: {
        language: string;
        text: string;
    }[];
};
