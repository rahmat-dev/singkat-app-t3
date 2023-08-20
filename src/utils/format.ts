export const convertAvatarName = (name?: string | null) => {
  if (!name) return ''

  return name
    .split(' ')
    .slice(0, 2)
    .map(_name => _name[0])
    .join('')
    .toUpperCase()
}
