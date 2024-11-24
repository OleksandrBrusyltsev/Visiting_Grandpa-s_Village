import React, { useImperativeHandle, useState } from 'react';
import { Box, IconButton, Stack, styled, Typography } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined';

type Props = {
    label: string;
    nameAttr: string;
    multiple?: boolean;
};

const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: '50%',
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploadWithPreview = React.forwardRef(function FileUploadWithPreview({ label, nameAttr, multiple }: Props, ref) {
    const [selectedFiles, setSelectedFiles] = useState<Array<File | null>>([null]);
    useImperativeHandle(ref, () => ({
        reset() {
            setSelectedFiles([null]);
            setPreviews([]);
            inputRef.current = [];
        },
        getSelectedFiles() {
            return selectedFiles;
        }
    }), [selectedFiles]);
    const [previews, setPreviews] = useState<Array<string>>([]);
    const [isDragOver, setIsDragOver] = useState<number | null>(null);

    const inputRef = React.useRef<(any)[]>([]);

    const handleButtonClick = (index: number) => {
        if (inputRef.current && inputRef.current[index]) {
            inputRef.current[index].click();
        }
    };

    const handleAddFile = (file: File) => {
        const isLast = multiple && previews.length === 4 || !multiple;
        setSelectedFiles(files => [...files.filter((el) => el !== null), ...(isLast ? [file] : [file, null])]);
        setPreviews(previews => [...previews, URL.createObjectURL(file)]);
    }
 
    const handleChangeFile = (file: File, targetIndex: number) => {
        setSelectedFiles(files => files.map((el, index) => index === targetIndex ? file : el));
        setPreviews(previews => previews.map((item, index) => index === targetIndex ? URL.createObjectURL(file) : item));
    }

    const handleRemoveFile = (targetIndex: number) => {
        setSelectedFiles(files => [...files.filter((file, index) => file && index !== targetIndex), null]);
        setPreviews(previews => previews.filter((_, index) => index !== targetIndex));
        inputRef.current.splice(targetIndex, 1);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const targetIndex = inputRef.current?.indexOf(event.target as HTMLInputElement);
        const isInputFilled = Boolean(selectedFiles[targetIndex]);
        
        if (isInputFilled) { 
            file ? handleChangeFile(file, targetIndex) : handleRemoveFile(targetIndex)
        } else {
            if (file) {
                handleAddFile(file);
            } return
        }
    }   

    const onDrop = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        setIsDragOver(null);
        const file = event.dataTransfer.files[0];
        const targetIndex = inputRef.current?.findIndex(el => (event.currentTarget as HTMLElement).contains(el));
        const isInputFilled = Boolean(selectedFiles[targetIndex]);
        isInputFilled ? handleChangeFile(file, targetIndex) : handleAddFile(file);
    };

    const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        const targetIndex = inputRef.current?.findIndex(el => (event.currentTarget as HTMLElement).contains(el));
        isDragOver !== targetIndex && setIsDragOver(targetIndex);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLElement>) => {
        event.preventDefault();
        if ((event.currentTarget as HTMLElement).contains(event.relatedTarget as HTMLElement)) return;
        setIsDragOver(null);
    };
    
    const handleMoveFile = (direction: -1 | 1, targetIndex: number) => {
        if (targetIndex + direction < 0 || targetIndex + direction >= selectedFiles.length) return;
        
        setSelectedFiles(files => files.map((el, index) => index === targetIndex ? files[targetIndex + direction] : index === targetIndex + direction ? files[targetIndex] : el));
        
        setPreviews(previews => previews.map((item, index) => index === targetIndex ? previews[targetIndex + direction] : index === targetIndex + direction ? previews[targetIndex] : item));
        
        [inputRef.current[targetIndex], inputRef.current[targetIndex + direction]] = [inputRef.current[targetIndex + direction], inputRef.current[targetIndex]];
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
            <Typography component={'legend'}>{label} (виберіть або перетащіть файл в форматі png, jpeg.{multiple && ' Максимум 5 штук' })</Typography>
            
            {
                selectedFiles?.map((file, index) => (
                    <Stack
                        key={index}
                        onDrop={onDrop}
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
                                position: 'relative',
                                gap: 1,
                                cursor: 'pointer',
                            }}>
                            <HiddenInput
                                type="file"
                                name={multiple ? `${nameAttr + index}` : nameAttr}
                                accept={"image/png, image/jpeg"}
                                // onChange={onChange}
                                onChange={onChange}
                                ref={(el: any) => inputRef.current[index] = el}
                                required={ !selectedFiles[0] }
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
                                <IconButton onClick={() => handleMoveFile(-1, index)} aria-label="move up" size="small" disabled={index === 0} title='Перемістити фото вгору'>
                                    <NorthOutlinedIcon fontSize="small" sx={[{ color: 'rgb(63, 85, 64)' }, index === 0 && { visibility: 'hidden' }]} />
                                </IconButton>
                                <IconButton onClick={() => handleRemoveFile(index)} aria-label="delete" size="small">
                                    <ClearOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                                </IconButton>
                                <IconButton onClick={() => handleMoveFile(+1, index)} aria-label="move down" size="small" disabled={index === previews.length - 1} title='Перемістити фото вниз'>
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