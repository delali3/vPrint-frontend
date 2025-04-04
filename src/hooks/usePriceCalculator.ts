// hooks/usePriceCalculator.ts
import { useState } from 'react';
import { PrintColorType, BindingType } from '../types';

interface PriceConfig {
  monochrome: number;
  colored: number;
  binding: {
    none: number;
    comb: number;
    slide: number;
    tape: number;
  };
  campusDelivery: number;
}

interface PriceBreakdown {
  baseCost: number;
  bindingCost: number;
  deliveryCost: number;
  totalCost: number;
}

const DEFAULT_PRICE_CONFIG: PriceConfig = {
  monochrome: 1, // GHC 1 per page
  colored: 2,    // GHC 2 per page
  binding: {
    none: 0,
    comb: 5,
    slide: 7,
    tape: 3,
  },
  campusDelivery: 2,
};

export const usePriceCalculator = () => {
  const [priceConfig] = useState<PriceConfig>(DEFAULT_PRICE_CONFIG);

  /**
   * Calculate price breakdown for printing order
   */
  const calculatePriceBreakdown = (
    pageCount: number,
    printColor: PrintColorType,
    binding: BindingType,
    campusDelivery: boolean
  ): PriceBreakdown => {
    // Calculate base cost based on page count and color
    const baseCost = pageCount * priceConfig[printColor];
    
    // Get binding cost
    const bindingCost = priceConfig.binding[binding];
    
    // Get delivery cost
    const deliveryCost = campusDelivery ? priceConfig.campusDelivery : 0;
    
    // Calculate total
    const totalCost = baseCost + bindingCost + deliveryCost;
    
    return {
      baseCost,
      bindingCost,
      deliveryCost,
      totalCost
    };
  };

  /**
   * Calculate total price for printing order
   */
  const calculatePrice = (
    pageCount: number,
    printColor: PrintColorType,
    binding: BindingType,
    campusDelivery: boolean
  ): number => {
    const { totalCost } = calculatePriceBreakdown(pageCount, printColor, binding, campusDelivery);
    return totalCost;
  };

  /**
   * Get price per page for the selected color
   */
  const getPricePerPage = (printColor: PrintColorType): number => {
    return priceConfig[printColor];
  };

  /**
   * Get binding price for the selected binding type
   */
  const getBindingPrice = (binding: BindingType): number => {
    return priceConfig.binding[binding];
  };

  /**
   * Get delivery price
   */
  const getDeliveryPrice = (): number => {
    return priceConfig.campusDelivery;
  };

  return { 
    calculatePrice, 
    calculatePriceBreakdown,
    getPricePerPage,
    getBindingPrice,
    getDeliveryPrice,
    priceConfig 
  };
};