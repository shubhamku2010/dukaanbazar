/**
 * Convert paise (smallest Indian currency unit) to formatted INR string.
 * Backend stores prices in paise (1 INR = 100 paise).
 */
export function formatINR(paise: bigint): string {
  const amount = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Convert INR string input to paise bigint.
 */
export function inrToPaise(inr: string): bigint {
  const amount = Number.parseFloat(inr.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(amount)) return 0n;
  return BigInt(Math.round(amount * 100));
}

/**
 * Format a nanosecond timestamp (IC standard) to a human-readable date.
 */
export function formatDate(nanos: bigint): string {
  const ms = Number(nanos / 1_000_000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(ms));
}

/**
 * Build a WhatsApp deep-link with pre-filled message.
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
