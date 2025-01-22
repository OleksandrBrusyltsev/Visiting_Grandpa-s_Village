type ResetType = {
    reset: () => void;
};

type EditPageProps<T> = {
    item: T;
    imagePreviews: (string | File)[];
    position: number;
    lang: Language;
    handleTextChange: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, imgIndex: number) => void;
    isMobile?: boolean;
    ref: React.ForwardedRef<ResetType>;
};
