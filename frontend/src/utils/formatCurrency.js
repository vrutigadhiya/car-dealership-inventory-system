export function formatIndianCurrency(amount) {
  if (amount === null || amount === undefined) return "—";

  const num = Number(amount);

  if (num >= 10000000) {
    // Crore: 1,00,00,000+
    const cr = num / 10000000;
    return `₹${trimDecimal(cr)} Cr`;
  }

  if (num >= 100000) {
    // Lakh: 1,00,000 – 99,99,999
    const lakh = num / 100000;
    return `₹${trimDecimal(lakh)}Lakh`;
  }

  if (num >= 1000) {
    // Thousands: show with Indian comma grouping
    return `₹${num.toLocaleString("en-IN")}`;
  }

  return `₹${num}`;
}

// Removes trailing .0, keeps one decimal otherwise (e.g. 4.5 Cr, 45 Lakh not 45.0 Lakh)
function trimDecimal(value) {
  return Number(value.toFixed(2)).toString();
}