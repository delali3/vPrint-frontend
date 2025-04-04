// services/api.ts
import axios from 'axios';
import { BackendPrintOrder, PrintColorType, BindingType } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Uploads a PDF file to the server
 */
export const uploadPdf = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(`${API_BASE_URL}/upload-pdf`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data;
};

/**
 * Gets a preview URL for a PDF file
 */
export const getPdfPreviewUrl = (fileId: string) => {
  return `${API_BASE_URL}/pdf-preview/${fileId}`;
};

/**
 * Calculates the price for printing
 * (Single pageCount parameter version)
 */
export const calculatePrice = async (
    pageCountOrColorPages: number,
    printColorOrMonochrome: PrintColorType | number,
    bindingOrPrintColor?: BindingType | PrintColorType,
    campusDeliveryOrBinding?: boolean | BindingType,
    campusDelivery?: boolean
  ) => {
    // Check if we're using the version with separate color and monochrome counts
    if (typeof printColorOrMonochrome === 'number') {
      const colorPages = pageCountOrColorPages;
      const monochromePages = printColorOrMonochrome as number;
      const printColor = bindingOrPrintColor as PrintColorType;
      const binding = campusDeliveryOrBinding as BindingType;
      
      const response = await axios.post(`${API_BASE_URL}/calculate-price`, {
        colorPages,
        monochromePages,
        printColor,
        binding,
        campusDelivery
      });
      
      return response.data;
    } else {
      // We're using the version with a single pageCount
      const pageCount = pageCountOrColorPages;
      const printColor = printColorOrMonochrome as PrintColorType;
      const binding = bindingOrPrintColor as BindingType;
      const campusDelivery = campusDeliveryOrBinding as boolean;
      
      const response = await axios.post(`${API_BASE_URL}/calculate-price`, {
        pageCount,
        printColor,
        binding,
        campusDelivery
      });
      
      return response.data;
    }
  };
  
/**
 * Calculates the price for printing with separate color and monochrome counts
 */
export const calculateDetailedPrice = async (
  colorPages: number,
  monochromePages: number,
  printColor: PrintColorType,
  binding: BindingType,
  campusDelivery: boolean
) => {
  const response = await axios.post(`${API_BASE_URL}/calculate-price`, {
    colorPages,
    monochromePages,
    printColor,
    binding,
    campusDelivery
  });
  
  return response.data;
};

/**
 * Submits an order to the server
 */
export const submitOrder = async (order: BackendPrintOrder) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit-order`, order);
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

/**
 * Gets an order by order number
 */
export const getOrder = async (orderNumber: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error getting order:', error);
    throw error;
  }
};

/**
 * Verifies payment status with the server
 */
export const getPaymentStatus = async (reference: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/payment/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};