"use server";

const url = process.env.SERV_URL;

    export default async function getCloudinaryUrl(photos: File[]) {
        const formData = new FormData();
        
        photos.forEach((photo) => {
            formData.append('images', photo);
        });
        
        try {
            const response = await fetch(`${url}/api/v1/photos/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                return `Виникла помилка під час розміщення фото на Cloudinary.\nLocation: ${errorData.detail[0].loc.join(
                    ', ',
                )}; message: ${errorData.detail[0].msg}`;
            }
            if (response.ok) {
                const result = await response.json();
                return result.data.urls;
            }
        } catch (error) {
            return (error as Error).message;
        }
    }