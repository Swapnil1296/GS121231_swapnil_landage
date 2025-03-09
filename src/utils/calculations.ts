export const calculateSalesDollars = (salesUnits: number, price: number): number => {
    return salesUnits * price;
  };
  
  export const calculateGMDollars = (salesDollars: number, salesUnits: number, cost: number): number => {
    return salesDollars - salesUnits * cost;
  };
  
  export const calculateGMPercent = (gmDollars: number, salesDollars: number): number => {
    if (salesDollars === 0) return 0;
    return gmDollars / salesDollars;
  };
  
  export const getGMPercentColor = (gmPercent: number): string => {
    if (gmPercent >= 0.4) return 'bg-green-300';
    if (gmPercent >= 0.1 && gmPercent < 0.4) return 'bg-yellow-300';
    if (gmPercent >= 0.05 && gmPercent < 0.1) return 'bg-orange-300';
    return 'bg-red-300';
  };
  