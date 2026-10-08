export function formatNaira(amount: number, fractionDigits = 2): string {
  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}
