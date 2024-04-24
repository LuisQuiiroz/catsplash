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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    customError({ error: `Error getting user data, ${error}`, status: 404 })
    throw new Error(`Error updating user: ${error.message}`)
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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    // Manejar la respuesta en caso de éxito, si es necesario
    return true
  } catch (error) {
    customError({ error: `Error uploading user, ${error}`, status: 404 })
    throw new Error(`Error updating user: ${error.message}`)
  }
}
