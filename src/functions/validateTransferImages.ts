export const validateTransferImages = (files: FileList) => {
    const validFiles = new DataTransfer();
    Array.from(files).forEach((file) => {
        if (file.type.startsWith('image/')) {
            validFiles.items.add(file);
        }
    });
    return validFiles.files;
};
