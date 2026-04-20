function formatINR(paise) {
  const amount = Number(paise) / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
function inrToPaise(inr) {
  const amount = Number.parseFloat(inr.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(amount)) return 0n;
  return BigInt(Math.round(amount * 100));
}
function formatDate(nanos) {
  const ms = Number(nanos / 1000000n);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(ms));
}
function buildWhatsAppLink(phone, message) {
  const cleaned = phone.replace(/\D/g, "");
  const number = cleaned.startsWith("91") ? cleaned : `91${cleaned}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export {
  formatDate as a,
  buildWhatsAppLink as b,
  formatINR as f,
  inrToPaise as i
};
