type AdvToaster = {
    id: number;
    start_date: string;
    end_date: string;
    timeout: number;
    is_active: boolean;
    translations: Record<Language, string>;
};
