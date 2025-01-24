type ResetType = {
    reset: () => void;
};

type ImperativeHandleObjType = ResetType & {
    turnOver: () => void;
};

type EditPageProps<T> = {
    item: T;
    imagePreviews: (string | File)[];
    position: number;
    lang: Language;
    handleTextChange: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, imgIndex: number) => void;
    matchMedia?: MatchedMediaResult;
    ref: React.ForwardedRef<ResetType>;
};
