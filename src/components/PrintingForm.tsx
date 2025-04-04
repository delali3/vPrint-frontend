// components/PrintingForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { BackendPrintOrder, PrintColorType, BindingType } from '../types';
import Button from './ui/Button';
import { uploadPdf, getPdfPreviewUrl, calculatePrice } from '../services/api';
import { formatFileSize } from '../utils/fileUtils';

interface PrintingFormProps {
  onOrderSubmit: (order: BackendPrintOrder) => void;
}

const PrintingForm: React.FC<PrintingFormProps> = ({ onOrderSubmit }) => {
  // File state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    fileId: string;
    originalName: string;
    pageCount: number;
    colorPages: number;
    monochromePages: number;
    size: number;
  } | null>(null);

  // Preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Print options state
  const [printColor, setPrintColor] = useState<PrintColorType>('monochrome');
  const [binding, setBinding] = useState<BindingType>('none');
  const [campusDelivery, setCampusDelivery] = useState(false);

  // Price state
  const [priceBreakdown, setPriceBreakdown] = useState<{
    baseCost: number;
    bindingCost: number;
    deliveryCost: number;
    totalCost: number;
    priceConfig: any;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadPdf(file);
      setFileInfo(result);

      // Set preview URL
      const url = getPdfPreviewUrl(result.fileId);
      setPreviewUrl(url);
      setCurrentPage(1);

      // Initial price calculation will happen in the updatePrice effect
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadError('Failed to upload and process the PDF file');
      setFileInfo(null);
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  // Recalculate price when options change
  const updatePrice = async () => {
    if (!fileInfo) return;

    try {
      // Use the version with color and monochrome page counts
      const priceResult = await calculatePrice(
        fileInfo.colorPages,
        fileInfo.monochromePages,
        printColor,
        binding,
        campusDelivery
      );

      setPriceBreakdown(priceResult);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  // Update price when options change
  useEffect(() => {
    updatePrice();
  }, [printColor, binding, campusDelivery, fileInfo]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileInfo || !priceBreakdown) {
      setUploadError('Please upload a PDF file');
      return;
    }

    const order: BackendPrintOrder = {
      fileId: fileInfo.fileId,
      fileName: fileInfo.originalName,
      pageCount: fileInfo.pageCount,
      printColor,
      binding,
      campusDelivery,
      totalPrice: priceBreakdown.totalCost
    };

    onOrderSubmit(order);
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Clear selected file
  const handleClearFile = () => {
    setFileInfo(null);
    setPreviewUrl(null);
    setUploadError(null);
    setPriceBreakdown(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Navigate between PDF pages
  const handlePageChange = (newPage: number) => {
    if (!fileInfo) return;

    const maxPage = fileInfo.pageCount;
    if (newPage >= 1 && newPage <= maxPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-50 rounded-lg shadow-md p-6">
      {/* File Upload Section */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2 font-medium">Upload Your Document</label>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="application/pdf"
          className="hidden"
        />

        {!fileInfo ? (
          <div
            onClick={handleUploadClick}
            className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-400 mb-1">Drag and drop your PDF here or click to browse</p>
            <p className="text-gray-500 text-sm">PDF files only (Max 50MB)</p>
          </div>
        ) : (
          <div className="border-2 border-gray-700 rounded-lg p-4 bg-gray-800">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="bg-purple-500 bg-opacity-10 p-2 rounded-lg mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium truncate max-w-xs">{fileInfo.originalName}</p>
                  <div className="flex text-sm text-gray-400 mt-1">
                    <span className="mr-3">{formatFileSize(fileInfo.size)}</span>
                    <span className="text-green-400">{fileInfo.pageCount} pages</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                className="text-gray-400 hover:text-white p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* PDF Preview */}
            {previewUrl && (
              <div className="mt-3 border border-gray-700 rounded-lg overflow-hidden">
                <div className="relative bg-gray-900 h-64">
                  <iframe
                    src={`${previewUrl}#page=${currentPage}`}
                    className="w-full h-full bg-white"
                    title="PDF preview"
                  />

                  {/* Page navigation */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                      className="p-1 rounded-full bg-gray-800 text-white disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <span className="text-white text-sm bg-gray-800 px-2 py-1 rounded">
                      Page {currentPage} of {fileInfo.pageCount}
                    </span>

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= fileInfo.pageCount}
                      className="p-1 rounded-full bg-gray-800 text-white disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {uploadError && <p className="mt-2 text-red-400 text-sm">{uploadError}</p>}
        {isUploading && (
          <div className="mt-2 flex items-center text-purple-400">
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing your document...
          </div>
        )}
      </div>

      {/* Print Options Section */}
      <div className="space-y-6">
        {/* Print Color Options */}
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Print Color</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${printColor === 'monochrome'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setPrintColor('monochrome')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Monochrome</span>
                {printColor === 'monochrome' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                Black and white printing (GHC {priceBreakdown?.priceConfig?.monochrome || '0.5'}/page)
              </p>
            </div>

            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${printColor === 'colored'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setPrintColor('colored')}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Colored</span>
                {printColor === 'colored' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                Full color printing (GHC {priceBreakdown?.priceConfig?.colored || '1'}/page)
              </p>
            </div>
          </div>
        </div>

        {/* Binding Options */}
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Binding Method</label>
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${binding === 'none'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setBinding('none')}
            >
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full border-2 mr-2 flex-shrink-0 relative">
                  {binding === 'none' && (
                    <div className="absolute inset-0.5 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-white">No Binding</span>
              </div>
              <p className="text-gray-400 text-sm">
                Loose sheets, no binding (GHC {priceBreakdown?.priceConfig?.binding?.none || '0'})
              </p>
            </div>

            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${binding === 'comb'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setBinding('comb')}
            >
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full border-2 mr-2 flex-shrink-0 relative">
                  {binding === 'comb' && (
                    <div className="absolute inset-0.5 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-white">Comb Binding</span>
              </div>
              <p className="text-gray-400 text-sm">
                Plastic comb binding (GHC {priceBreakdown?.priceConfig?.binding?.comb || '7'})
              </p>
            </div>

            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${binding === 'slide'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setBinding('slide')}
            >
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full border-2 mr-2 flex-shrink-0 relative">
                  {binding === 'slide' && (
                    <div className="absolute inset-0.5 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-white">Slide Binding</span>
              </div>
              <p className="text-gray-400 text-sm">
                Professional slide binding (GHC {priceBreakdown?.priceConfig?.binding?.slide || '5'})
              </p>
            </div>

            <div
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${binding === 'tape'
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-gray-600'
                }`}
              onClick={() => setBinding('tape')}
            >
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full border-2 mr-2 flex-shrink-0 relative">
                  {binding === 'tape' && (
                    <div className="absolute inset-0.5 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <span className="text-white">Tape Binding</span>
              </div>
              <p className="text-gray-400 text-sm">
                Simple tape binding (GHC {priceBreakdown?.priceConfig?.binding?.tape || '3'})
              </p>
            </div>
          </div>
        </div>

        {/* Campus Delivery Option */}
        <div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={campusDelivery}
                onChange={() => setCampusDelivery(!campusDelivery)}
              />
              <div className={`w-10 h-6 bg-gray-700 rounded-full shadow-inner ${campusDelivery ? 'bg-purple-600' : ''
                }`}></div>
              <div className={`dot absolute w-4 h-4 bg-white rounded-full transition left-1 top-1 ${campusDelivery ? 'transform translate-x-4' : ''
                }`}></div>
            </div>
            <div className="ml-3 text-gray-300 font-medium">Campus Delivery</div>
          </label>
          <p className="mt-1 text-gray-400 text-sm ml-13">
            Have your prints delivered to your campus location - GHC 2 (GHC {priceBreakdown?.priceConfig?.campusDelivery || '2'} additional)
          </p>
        </div>

        {/* Price and Submit */}
        <div className="pt-4 border-t border-gray-700">
          {priceBreakdown && fileInfo && (
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Color Pages ({fileInfo.colorPages} × GHC {priceBreakdown.priceConfig.colored})
                </span>
                <span className="text-white">GHC {(fileInfo.colorPages * priceBreakdown.priceConfig.colored).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Monochrome Pages ({fileInfo.monochromePages} × GHC {priceBreakdown.priceConfig.monochrome})
                </span>
                <span className="text-white">GHC {(fileInfo.monochromePages * priceBreakdown.priceConfig.monochrome).toFixed(2)}</span>
              </div>
              
              {binding !== 'none' && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Binding ({binding})</span>
                  <span className="text-white">GHC {priceBreakdown.bindingCost.toFixed(2)}</span>
                </div>
              )}
              
              {campusDelivery && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Campus Delivery</span>
                  <span className="text-white">GHC {priceBreakdown.deliveryCost.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300">Estimated Total</span>
            <span className="text-xl text-purple-500 font-bold">
              GHC {priceBreakdown ? priceBreakdown.totalCost.toFixed(2) : '0.00'}
            </span>
          </div>

          <Button
            type="submit"
            disabled={!fileInfo || isUploading}
            fullWidth
          >
            {isUploading ? 'Processing...' : 'Continue to Checkout'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PrintingForm;