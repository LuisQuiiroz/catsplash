export function customError ({ error, status }) {
  console.log({ error, status })
  return { error, status }
}
