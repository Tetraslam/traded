export function formatCompensation(value: string): string {
  // Remove all non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, "");
  
  if (!numericValue) return "";
  
  const num = parseInt(numericValue, 10);
  
  if (num >= 1000000) {
    // Format as millions
    const millions = num / 1000000;
    return `$${millions.toFixed(millions % 1 === 0 ? 0 : 1)}M`;
  }
  
  if (num >= 1000) {
    // Format as thousands
    const thousands = num / 1000;
    return `$${thousands.toFixed(thousands % 1 === 0 ? 0 : 1)}K`;
  }
  
  // Format with commas for smaller numbers
  return `$${num.toLocaleString()}`;
}

export function addCommasToInput(value: string): string {
  // Remove all non-numeric characters
  const numericValue = value.replace(/[^0-9]/g, "");
  
  if (!numericValue) return "";
  
  const num = parseInt(numericValue, 10);
  return num.toLocaleString();
}

