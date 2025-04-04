// utils/fileUtils.ts

/**
 * Format file size for display
 * @param bytes Size in bytes
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + ' bytes';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };
  
  /**
   * Get file extension from filename
   * @param filename The name of the file
   * @returns The file extension (lowercase, without the dot)
   */
  export const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };
  
  /**
   * Check if a file is a PDF
   * @param file File to check
   * @returns Boolean indicating whether file is a PDF
   */
  export const isPdfFile = (file: File): boolean => {
    // Check by MIME type (more reliable)
    if (file.type === 'application/pdf') {
      return true;
    }
    
    // Fallback: check by extension
    const extension = getFileExtension(file.name);
    return extension === 'pdf';
  };
  
  /**
   * Generate a sanitized filename
   * @param filename Original filename
   * @returns Sanitized filename
   */
  export const sanitizeFilename = (filename: string): string => {
    // Remove potentially dangerous characters
    return filename.replace(/[^\w\s.-]/g, '');
  };
  
  /**
   * Create a download link for a file
   * @param data File data (blob, base64, etc.)
   * @param filename Suggested filename for the download
   * @param mimeType MIME type of the file
   */
  export const downloadFile = (data: Blob | string, filename: string, mimeType: string = 'application/octet-stream'): void => {
    // Create blob if string is provided
    const blob = typeof data === 'string' 
      ? new Blob([data], { type: mimeType })
      : data;
    
    // Create object URL
    const url = URL.createObjectURL(blob);
    
    // Create temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizeFilename(filename);
    
    // Append to document, click, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Release object URL
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };
  
  /**
   * Check if file size is within limits
   * @param file File to check
   * @param maxSizeBytes Maximum allowed size in bytes
   * @returns Boolean indicating whether file size is acceptable
   */
  export const isFileSizeValid = (file: File, maxSizeBytes: number = 50 * 1024 * 1024): boolean => {
    return file.size <= maxSizeBytes;
  };
  
  /**
   * Read a file as text
   * @param file File to read
   * @returns Promise resolving to file contents as string
   */
  export const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };
  
  /**
   * Read a file as data URL (base64)
   * @param file File to read
   * @returns Promise resolving to data URL
   */
  export const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };