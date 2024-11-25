import React, { ChangeEvent, memo, useState } from 'react';
import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';
import { useMainStore } from '@/stores/store-provider';
import { validateTransferImages } from '@/functions/validateTransferImages';

type Props = {
    label: string;
    nameAttr: string;
    multiple?: boolean;
};

const HiddenInput = styled('input')({
    opacity: 0,
    inset: 0,
    overflow: 'hidden',
    position: 'absolute',
    cursor: 'pointer',
});

const FileUploadWithPreview = memo(function FileUploadWithPreview({ label, nameAttr, multiple }: Props) {

    const photo = useMainStore(state => state.houseAdding?.photo);
    const setHouseData = useMainStore(state => state.setHouseAdding);

    const [isDragOver, setIsDragOver] = useState<number | null>(null);

    const handleAddFiles = (payload: FileList) => {

        const newFiles = Array.from(payload);

        setHouseData(houseData => {
            if (houseData) {
                houseData.photo = multiple ?
                    [...houseData.photo, ...newFiles] :
                    [newFiles[0]]
            }
            return houseData
        });
    }


    const handleChangeFile = (file: File, targetIndex: number) => {
        setHouseData(houseData => {
            if (houseData) {
                houseData.photo = houseData.photo.map((el, index) => index === targetIndex ? file : el);
            }
            return houseData
        })
    }

    const handleRemoveFile = (targetIndex: number) => {
        setHouseData(houseData => {
            if (houseData) {
                houseData.photo = houseData.photo.filter((el, index) => index !== targetIndex);
            }
            return houseData
        })
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const targetIndex = getTargetIndex(event);
        if (targetIndex >= 0) {
            const isInputFilled = Boolean(photo?.[targetIndex]);

            if (isInputFilled) {
                files?.length && handleChangeFile(files[0], targetIndex);
            } else {
                if (files && files.length) {
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
            const isInputFilled = Boolean(photo?.[targetIndex]);
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
        if (targetIndex + direction < 0 || targetIndex + direction >= photo!.length) return;

        setHouseData(houseData => {
            if (houseData) {
                houseData.photo = houseData.photo.map((el, index) => index === targetIndex ? houseData.photo[targetIndex + direction] : index === targetIndex + direction ? houseData.photo[targetIndex] : el);
            }
            return houseData
        })
    }

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
                [...photo, null].map((file, index) => (
                    <Stack
                        key={index}
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
                                name={multiple ? `${nameAttr + index}` : nameAttr}
                                accept={"image/*"}
                                onChange={onChange}
                                multiple={multiple}
                                data-index={index}
                                required={!photo?.[0]}
                            />
                            <IconButton
                                aria-label="add file"
                                size="large"
                            >
                                <AddAPhotoOutlinedIcon fontSize="large" sx={{ color: 'rgb(63, 85, 64)' }} />
                            </IconButton>
                            <Typography>{photo[index] ? 'Змінити фото' : 'Вибрати фото'}</Typography>
                        </Stack>

                        {photo[index] && (
                            <Box
                                component="img"
                                src={URL.createObjectURL(photo[index] as File)}
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
                        {photo[index] && (
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
                                <IconButton onClick={() => handleMoveFile(+1, index)} aria-label="move down" size="small" disabled={index === photo.length - 1} title='Перемістити фото вниз'>
                                    <SouthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === photo.length - 1 && { visibility: 'hidden' }]} />
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>
                ))
            }
        </Box>
    );
});

export default FileUploadWithPreview;

function getTargetIndex(event: React.DragEvent | React.ChangeEvent) {
    const target = event.target as HTMLElement;
    const index = target.getAttribute('data-index');
    return Number(index);
}