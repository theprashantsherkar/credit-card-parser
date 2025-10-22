
import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Paper,
    CssBaseline,
    Container,
    ThemeProvider,
    createTheme
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    InsertDriveFile as FileIcon,
    Close as CloseIcon
} from '@mui/icons-material';

// Create a simple theme for demonstration
const theme = createTheme({
    palette: {
        mode: 'dark', // Use dark mode
        primary: {
            main: '#90caf9', // A light blue
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12, // Add rounded corners
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Add rounded corners
                    textTransform: 'none', // Use normal case for buttons
                },
            },
        },
    },
});

/**
 * A reusable file uploader component with drag-and-drop support,
 * built with Material-UI.
 */
export function FileUploader({ onFilesSelected }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    /**
     * Processes an array of files, updating state and calling the callback.
     * @param {FileList} fileList - The list of files to process.
     */
    const handleFiles = (fileList) => {
        const filesArray = Array.from(fileList);
        setSelectedFiles(filesArray);
        if (onFilesSelected) {
            onFilesSelected(filesArray);
        }
        // Reset drag state
        setIsDragOver(false);
    };

    /**
     * Handles file selection from the hidden file input.
     */
    const handleFileChange = (event) => {
        if (event.target.files) {
            handleFiles(event.target.files);
        }
    };

    /**
     * Handles drag-over event to show visual feedback.
     */
    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow drop
        setIsDragOver(true);
    };

    /**
     * Handles drag-leave event to reset visual feedback.
     */
    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragOver(false);
    };

    /**
     * Handles files dropped onto the component.
     */
    const handleDrop = (event) => {
        event.preventDefault(); // Prevent browser from opening file
        if (event.dataTransfer.files) {
            handleFiles(event.dataTransfer.files);
        }
    };

    /**
     * Triggers the hidden file input click event.
     */
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    /**
     * Removes a file from the selected files list.
     * @param {number} index - The index of the file to remove.
     */
    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        if (onFilesSelected) {
            onFilesSelected(newFiles);
        }
        // Also clear the file input value
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    /**
     * Formats file size for display.
     * @param {number} bytes - File size in bytes.
     * @returns {string} - Formatted file size.
     */
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };

    return (
        <Box>
            {/* Hidden file input */}
            <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Dropzone */}
            <Paper
                variant="outlined"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    padding: 2,
                    textAlign: 'center',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: isDragOver ? 'primary.main' : 'grey.500',
                    backgroundColor: isDragOver ? 'action.hover' : 'background.paper',
                    transition: 'border-color 0.3s, background-color 0.3s',
                    borderRadius: 2,
                    cursor: 'pointer',
                }}
                onClick={handleButtonClick} // Allow clicking the box to open file dialog
            >
                <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main'}} />
                <Typography variant="h6" gutterBottom>
                    Drag and drop files here
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    or
                </Typography>
                <Button variant="contained" onClick={(e) => {
                    e.stopPropagation(); // Prevent paper's click from firing too
                    handleButtonClick();
                }}>
                    Select Files
                </Button>
            </Paper>

            {/* Selected Files List */}
            {selectedFiles.length > 0 && (
                <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                        Selected Files:
                    </Typography>
                    <List>
                        {selectedFiles.map((file, index) => (
                            <Paper
                                key={index}
                                variant="outlined"
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    bgcolor: 'background.default',
                                }}
                            >
                                <ListItem
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => handleRemoveFile(index)}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemIcon>
                                        <FileIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={file.name}
                                        secondary={formatFileSize(file.size)}
                                        primaryTypographyProps={{
                                            noWrap: true,
                                            title: file.name,
                                            style: { fontWeight: 500 },
                                        }}
                                    />
                                </ListItem>
                            </Paper>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
}
