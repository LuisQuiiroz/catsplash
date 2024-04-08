export function customError ({ error, status }) {
  console.error({ error, status })
  return { error, status }
}
