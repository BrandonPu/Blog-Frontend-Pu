export function validateName(name) {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, error: "El nombre es muy corto." };
  }
  if (trimmed.length > 40) {
    return { valid: false, error: "El nombre es demasiado largo." };
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(trimmed)) {
    return { valid: false, error: "El nombre solo puede contener letras y espacios." };
  }
  return { valid: true };
}
