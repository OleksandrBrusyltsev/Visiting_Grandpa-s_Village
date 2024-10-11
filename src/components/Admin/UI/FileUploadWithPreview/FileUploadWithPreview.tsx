import React, { useImperativeHandle, useState } from 'react';
import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';

type Props = {
    label: string;
    inputName: string;
    multiple?: boolean;
};

const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploadWithPreview = React.forwardRef(function FileUploadWithPreview({ label, inputName, multiple }: Props, ref) {
    useImperativeHandle(ref, () => ({
        reset() {
            setSelectedFiles([]);
            setPreviews([]);
            inputRef.current = [];
        },
    }), []);
    const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([null]);
    const [previews, setPreviews] = useState<Array<string>>([]);
    const [isDragOver, setIsDragOver] = useState<number | null>(null);

    const inputRef = React.useRef<(HTMLInputElement)[]>([]);

    //зміна фотографій через кнопку
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        const targetIndex = inputRef.current?.indexOf(event.target as HTMLInputElement);
        if (file) {
            onChangeFile(file, targetIndex);
        }
    };

    const onChangeFile = (file: File, targetIndex: number) => { 
        setSelectedFiles(files => files.map((el, index) => index === targetIndex ? file : el));
        setPreviews(previews => previews.map((item, index) => index === targetIndex ? URL.createObjectURL(file) : item));
    }

    //додавання фотографій через базову кнопку 
    const handleAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onAddFile(file);
        }
    };
    const onAddFile = (file: File) => { 
        setSelectedFiles(files => {
            if (multiple) {
                if (previews.length < 4) {
                    return [...files.filter((el) => el !== null), file, null];
                }
                return [...files.filter((el) => el !== null), file];
            }
            return [file];
        });
        setPreviews(previews => [...previews, URL.createObjectURL(file)]);
    }

    //програмний тригер прихованого інпуту
    const handleButtonClick = (index: number) => {
        if (inputRef.current && inputRef.current[index]) {
            inputRef.current[index].click();  
        }
    };
    
    //обробка дропа після перетягування
    const handleDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();

        setIsDragOver(null);
        const file = event.dataTransfer.files[0];
        const targetIndex = inputRef.current?.findIndex(el => (event.currentTarget as HTMLElement).contains(el));

        if (file) {
            if (targetIndex === selectedFiles.length - 1 && !selectedFiles[selectedFiles.length - 1]) {
                onAddFile(file);
            } else {
                onChangeFile(file, targetIndex);
            }
        }
    };

    //видалення фотографій
    const handleRemoveFile = (i: number) => {
        setSelectedFiles(files => multiple ? [...files.filter((file, index) => index !== i && file !== null), null] : [null]);
        setPreviews(previews => previews.filter((_, index) => index !== i));
    }
    
    //зміна порядку фотографій
    const handleMoveFile = (direction: -1 | 1, targetIndex: number) => {
        if (targetIndex + direction < 0 || targetIndex + direction >= selectedFiles.length) return;
        setSelectedFiles(files => files.map((el, index) => index === targetIndex ? files[targetIndex + direction] : index === targetIndex + direction ? files[targetIndex] : el));
        setPreviews(previews => previews.map((item, index) => index === targetIndex ? previews[targetIndex + direction] : index === targetIndex + direction ? previews[targetIndex] : item));
        [inputRef.current[targetIndex], inputRef.current[targetIndex + direction]] = [inputRef.current[targetIndex + direction], inputRef.current[targetIndex]];
    }

    //відслідковування активного інпута під час перетягування
    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();

        const targetIndex = inputRef.current?.findIndex(el => (event.currentTarget as HTMLElement).contains(el));
        isDragOver !== targetIndex && setIsDragOver(targetIndex);
    };
    const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        if((event.currentTarget as HTMLElement).contains(event.relatedTarget as HTMLElement)) return;
        setIsDragOver(null);
    };
    
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
            <Typography component={'legend'}>{label} (виберіть або перетащіть файл в форматі png, jpeg.{multiple && ' Максимум 5 штук' })</Typography>
            
            {
                selectedFiles?.map((file, index) => (
                    <Stack
                        key={index}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        sx={[{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'stretch',
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
                            onClick={() => handleButtonClick(index)}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                            }}>
                            <HiddenInput
                                type="file"
                                name={multiple ? `${inputName + index}` : inputName}
                                accept={"image/png, image/jpeg"}
                                onChange={!file ? handleAddFile : handleFileChange}
                                ref={(el: HTMLInputElement) => inputRef.current[index] = el}
                            />
                            <IconButton
                                aria-label="add file"
                                size="large"
                            >
                                <AddAPhotoOutlinedIcon fontSize="large" sx={{ color: 'rgb(63, 85, 64)' }} />
                            </IconButton>
                            <Typography>{previews[index] ? 'Змінити фото' : 'Вибрати фото'}</Typography>
                        </Stack>

                        {previews[index] && (
                            <Box
                                component="img"
                                src={previews[index]}
                                alt="Попередній перегляд"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    border: '1px solid grey',
                                }}
                            />
                        )}
                        {previews[index] && (
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
                                <IconButton onClick={() => handleMoveFile(-1, index)} aria-label="delete" size="small" disabled={index === 0} title='Перемістити фото вгору'>
                                    <NorthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === 0 && { visibility: 'hidden' }]} />
                                </IconButton>
                                <IconButton onClick={() => handleRemoveFile(index)} aria-label="delete" size="small">
                                    <ClearOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                                </IconButton>
                                <IconButton onClick={() => handleMoveFile(+1, index)} aria-label="delete" size="small" disabled={index === previews.length - 1} title='Перемістити фото вниз'>
                                    <SouthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === previews.length - 1 && { visibility: 'hidden' }]} />
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>
                ))
            }
        </Box>
    );
});
export default FileUploadWithPreview