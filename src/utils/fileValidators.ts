// utils/fileValidators.ts

/**
 * Maximum file size in bytes (50MB)
 */
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

/**
 * Validates that the file is within the allowed size limit
 * @param file The file to validate
 * @returns An error message or null if validation passes
 */
export const validateFileSize = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`;
  }
  return null;
};

/**
 * Validates that the file is a PDF
 * @param file The file to validate
 * @returns An error message or null if validation passes
 */
export const validateFilePdf = (file: File): string | null => {
  if (file.type !== 'application/pdf') {
    return 'File must be a PDF document';
  }
  return null;
};

/**
 * Checks if a file name contains potentially harmful characters
 * @param file The file to validate
 * @returns An error message or null if validation passes
 */
export const validateFileName = (file: File): string | null => {
  // Check for potentially dangerous characters
  const dangerousChars = /[<>:"/\\|?*]/;
  if (dangerousChars.test(file.name)) {
    return 'File name contains invalid characters';
  }
  return null;
};

/**
 * Runs all validations on a file
 * @param file The file to validate
 * @returns An error message or null if all validations pass
 */
export const validateFile = (file: File): string | null => {
  // Run all validations in sequence
  const sizeError = validateFileSize(file);
  if (sizeError) return sizeError;
  
  const typeError = validateFilePdf(file);
  if (typeError) return typeError;
  
  const nameError = validateFileName(file);
  if (nameError) return nameError;
  
  return null;
};