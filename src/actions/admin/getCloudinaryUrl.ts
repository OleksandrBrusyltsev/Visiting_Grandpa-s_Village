"use server";

const url = process.env.SERV_URL;

    export default async function getCloudinaryUrl(photos: Array<File | string>) {
        const photosAsStringAndEmpty = photos.map((item) => (typeof item === 'string' ? item : null));
        const photosAsFile = photos.filter((item) => typeof item !== 'string');

        if (!photosAsFile.length) {
            return photos as string[];
        }

        const formData = new FormData();

        photosAsFile.forEach((photo) => {
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
                const cloudinaryUrls = result.data.urls as string[];
                let index = 0;
                const photosUrls = photosAsStringAndEmpty.map((photo) =>
                    !photo ? cloudinaryUrls[index++] : photo,
                );

                return photosUrls;
            }
        } catch (error) {
            return `Error from Cloudinary: ${(error as Error).message}`;
        }
    }