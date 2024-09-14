export function truncateWithEllipses(text: any, max: number) {
  return text?.substr(0, max - 1) + (text?.length > max ? '...' : '')
}
