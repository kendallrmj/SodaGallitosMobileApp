export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "El campo Email no puede estar vacio"
  if (!re.test(email)) return 'Correo invalido'
  return ''
}
