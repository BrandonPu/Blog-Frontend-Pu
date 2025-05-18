export function validateNotEmpty(value) {
  if (!value || value.trim() === "") {
    return { valid: false, error: "El campo no puede estar vacío." };
  }
  return { valid: true };
}
