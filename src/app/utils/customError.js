export function customError ({ error, status, moreInfo }) {
  if (moreInfo) {
    console.error({ error, status, moreInfo })
  } else {
    console.error({ error, status })
  }
  return { error, status }
}
