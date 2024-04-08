import { customError } from './customError'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function GetOneUser (userId) {
  try {
    const res = await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      return await res.json()
    } else {
      return customError({ error: 'Failed to fetch user', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error getting user data, ${error}`, status: 404 })
  }
}
export async function updateUser (data, userId) {
  try {
    const res = await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img: data.picture,
        name: data.name,
        biography: data.biography,
        phone: data.phone,
        username: data.username,
        email: data.email
      })
    })
    if (res.ok) {
      return res.ok
    } else {
      return customError({ error: 'Error uploading user', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error uploading user, ${error}`, status: 404 })
  }
}
