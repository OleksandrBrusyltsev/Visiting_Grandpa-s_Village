import React, { ChangeEvent, forwardRef, memo, useImperativeHandle, useState } from 'react';
import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import { useMainStore } from '@/stores/store-provider';
import { validateTransferImages } from '@/functions/validateTransferImages';

type Props = Readonly<{
    label: string;
    multiple?: boolean;
}>;

const HiddenInput = styled('input')({
    opacity: 0,
    inset: 0,
    overflow: 'hidden',
    position: 'absolute',
    cursor: 'pointer',
});

const FileUploadWithPreview = forwardRef<ResetType & {photos: File[]}, Props>(function FileUploadWithPreview({ label, multiple }, ref) {

    const setIsDirtyPage = useMainStore(state => state.setIsDirtyPage);
    
    const [photos, setPhotos] = useState<File[]>([]);
    useImperativeHandle(ref, () => ({
        reset: () => {
            setPhotos([]);
        },
        photos
    }), [photos]);

    const [isDragOver, setIsDragOver] = useState<number | null>(null);

    const handleAddFiles = (payload: FileList) => {

        const newFiles = Array.from(payload);
        setIsDirtyPage(true);
        setPhotos(photos => {
            return multiple ?
            [...photos, ...newFiles] :
            [newFiles[0]]
        });
    }

    const handleChangeFile = (file: File, targetIndex: number) => {
        setPhotos(photos => photos.map((el, index) => index === targetIndex ? file : el));
    }

    const handleRemoveFile = (targetIndex: number) => {
        setPhotos(photos => photos.filter((el, index) => index !== targetIndex));
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const targetIndex = getTargetIndex(event);
        if (targetIndex >= 0) {
            const isInputFilled = Boolean(photos?.[targetIndex]);

            if (isInputFilled) {
                files?.length && handleChangeFile(files[0], targetIndex);
            } else {
                if (files?.length) {
                    handleAddFiles(files);
                } return
            }
        }
    }

    const onDrop = (event: React.DragEvent) => {
        event.preventDefault();
        setIsDragOver(null);
        const files = event.dataTransfer.files;

        //фильтруем не изображения
        const filteredFileList = validateTransferImages(files);
        if (!filteredFileList.length) return;

        const targetIndex = getTargetIndex(event);
        if (targetIndex >= 0) {
            const isInputFilled = Boolean(photos?.[targetIndex]);
            isInputFilled ? handleChangeFile(filteredFileList[0], targetIndex) : handleAddFiles(filteredFileList);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        const targetIndex = getTargetIndex(event);
        if (targetIndex >= 0) {
            isDragOver !== targetIndex && setIsDragOver(targetIndex);
        }
    };

    const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        if ((event.currentTarget as HTMLElement).contains(event.relatedTarget as HTMLElement)) return;
        setIsDragOver(null);
    };

    const handleMoveFile = (direction: -1 | 1, targetIndex: number) => {
        if (targetIndex + direction < 0 || targetIndex + direction >= photos.length) return;
        setPhotos(photos => photos.map((el, index) => {
            if (index === targetIndex) {
                return photos[targetIndex + direction];
            } else if (index === targetIndex + direction) {
                return photos[targetIndex];
            } else return el
        }));
    }

    const data = multiple ? [...photos, null] : [photos[0] || null];

    return (
        <Box
            component="fieldset"
            sx={{
                border: '1px solid grey',
                p: 2,
                borderRadius: '8px',
                transition: 'all 0.3s ease',
            }}
        >
            <Typography component={'legend'}>{label} (виберіть або перетащіть файл із зображенням.)</Typography>

            {
                data.map((file, index) => (
                    <Stack
                        key={typeof file === 'string' ? file : file?.name ?? 'null'}
                        onDrop={onDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        sx={[{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'stretch',
                            border: '1px dashed transparent',
                            '&:not(:last-of-type)': {
                                mb: '10px'
                            }
                        }, isDragOver === index && {
                            backgroundColor: 'rgba(63, 85, 64, 0.3)',
                            border: '1px dashed rgb(63, 85, 64)',
                            borderRadius: '8px',
                        }]}
                    >
                        <Stack
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                position: 'relative',
                                gap: 1,
                                cursor: 'pointer',
                            }}>
                            <HiddenInput
                                type="file"
                                accept={"image/*"}
                                onChange={onChange}
                                value={''}
                                multiple={multiple}
                                data-index={index}
                            />
                            <IconButton
                                aria-label="add file"
                                size="large"
                            >
                                <AddAPhotoOutlinedIcon fontSize="large" sx={{ color: 'rgb(63, 85, 64)' }} />
                            </IconButton>
                            <Typography>{photos[index] ? 'Змінити фото' : 'Вибрати фото'}</Typography>
                        </Stack>

                        {photos[index] && (
                            <Box
                                component="img"
                                src={URL.createObjectURL(photos[index] as File)}
                                alt="Попередній перегляд"
                                draggable={false}
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    border: '1px solid grey',
                                }}
                            />
                        )}
                        {photos[index] && (
                            <Stack
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    ml: 2
                                }}
                            >
                                <IconButton onClick={() => handleMoveFile(-1, index)} aria-label="move up" size="small" disabled={index === 0} title='Перемістити фото вгору'>
                                    <NorthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === 0 && { visibility: 'hidden' }]} />
                                </IconButton>
                                <IconButton onClick={() => handleRemoveFile(index)} aria-label="delete" size="small">
                                    <ClearOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                                </IconButton>
                                <IconButton onClick={() => handleMoveFile(+1, index)} aria-label="move down" size="small" disabled={index === photos.length - 1} title='Перемістити фото вниз'>
                                    <SouthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === photos.length - 1 && { visibility: 'hidden' }]} />
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>
                ))
            }
        </Box>
    );
});

export default memo(FileUploadWithPreview);

function getTargetIndex(event: React.DragEvent | React.ChangeEvent) {
    const target = event.target as HTMLElement;
    const index = target.getAttribute('data-index');
    return Number(index);
}