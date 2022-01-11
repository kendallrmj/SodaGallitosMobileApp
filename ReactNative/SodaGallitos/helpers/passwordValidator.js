export function passwordValidator(password) {
  if (!password) return "La contraseña no puede estar vacia"
  if (password.length < 6) return 'La contraseña debe contener 6 caracteres como minimo'
  return ''
}
