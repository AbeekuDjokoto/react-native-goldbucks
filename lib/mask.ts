export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain || !local) return email;

  const visible = local.slice(-5);
  return `****${visible}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return `****${digits.slice(-4)}`;
}
