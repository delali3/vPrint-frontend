// components/PdfPreview.tsx
import * as pdfjs from 'pdfjs-dist';

// Initialize the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs`;
/**
 * Extract page count from a PDF file
 * @param file PDF file to process
 * @returns Promise containing the page count
 */
export const extractPdfPageCount = async (file: File): Promise<number> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      return pdf.numPages;
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw new Error('Failed to process PDF file');
    }
  };


  /**
 * Check if a file is a valid PDF
 * @param file File to validate
 * @returns Boolean indicating if the file is a valid PDF
 */
export const isValidPdf = (file: File): boolean => {
    return file.type === 'application/pdf';
  };

  /**
 * Extract metadata from a PDF file
 * @param file PDF file to process
 * @returns Promise containing metadata object
 */
export const extractPdfMetadata = async (file: File): Promise<any> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      const metadata = await pdf.getMetadata();
      return metadata;
    } catch (error) {
      console.error('Error extracting PDF metadata:', error);
      throw new Error('Failed to extract PDF metadata');
    }
  };


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