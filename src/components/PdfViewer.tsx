// components/PdfPreview.tsx
import React, { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';

// Initialize the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';

interface PdfPreviewProps {
  file: File;
  pageCount: number;
  thumbnailCount?: number; // Number of thumbnails to display
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ 
  file, 
  pageCount, 
  thumbnailCount = 3 // Default to showing first 3 pages
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Create the preview URL when the file changes
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);
  
  // Generate thumbnails for the first few pages
  useEffect(() => {
    if (!file || !previewUrl) return;
    
    const generateThumbnails = async () => {
      setIsLoading(true);
      
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        
        // Limit thumbnail count to actual page count
        const numThumbnails = Math.min(thumbnailCount, pdf.numPages);
        const thumbnailsArray: string[] = [];
        
        for (let i = 1; i <= numThumbnails; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.2 }); // Small scale for thumbnails
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          if (!context) continue;
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          
          await page.render({
            canvasContext: context,
            viewport
          }).promise;
          
          const thumbnail = canvas.toDataURL('image/jpeg');
          thumbnailsArray.push(thumbnail);
        }
        
        setThumbnails(thumbnailsArray);
      } catch (error) {
        console.error('Error generating thumbnails:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateThumbnails();
  }, [file, previewUrl, thumbnailCount]);
  
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      {/* Main Preview */}
      <div className="relative bg-gray-900 h-64">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        
        {previewUrl && (
          <iframe
            src={`${previewUrl}#page=${currentPage}`}
            className="w-full h-full bg-white"
            title="PDF preview"
          />
        )}
        
        {/* Page navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage <= 1}
            className="p-1 rounded-full bg-gray-800 text-white disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <span className="text-white text-sm bg-gray-800 px-2 py-1 rounded">
            Page {currentPage} of {pageCount}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage >= pageCount}
            className="p-1 rounded-full bg-gray-800 text-white disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <div className="bg-gray-800 p-2 flex overflow-x-auto space-x-2">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={`thumbnail-${index}`}
              onClick={() => setCurrentPage(index + 1)}
              className={`cursor-pointer border-2 flex-shrink-0 ${
                currentPage === index + 1 ? 'border-purple-500' : 'border-transparent'
              }`}
            >
              <img
                src={thumbnail}
                alt={`Page ${index + 1} thumbnail`}
                className="h-16 w-auto"
              />
            </div>
          ))}
          
          {thumbnailCount < pageCount && (
            <div className="flex items-center justify-center h-16 px-3 text-gray-400 text-sm bg-gray-700 bg-opacity-50 rounded">
              +{pageCount - thumbnailCount} more pages
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfPreview;