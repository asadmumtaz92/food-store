// FOR AMOUNT FORMAT
export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR', // PKR, USD
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
