import { customError } from './customError'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getAllPosts () {
  try {
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.ok) {
      return await res.json()
    } else {
      return customError({ error: 'Failed to fetch posts', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error when making GET request: ${error}`, status: 404 })
  }
}

export async function getOnePost (id) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      return await res.json()
    } else {
      return customError({ error: 'Failed to fetch post', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error when making GET request: ${error}`, status: 404 })
  }
}

export async function createPost (data, userId) {
  try {
    const res = await fetch(`${apiUrl}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: data.description.trim(),
        img: data.photo.trim(),
        userId
      })
    })
    if (res.ok) {
      return await res.json()
    } else {
      return customError({ error: 'Post could not be created', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error when making POST request: ${error}`, status: 404 })
  }
}
export async function putPost (data, postId, userId) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: data.description.trim(),
        img: data.photo.trim(),
        userId
      })
    })
    if (res.ok) {
      return await res.json()
    } else {
      return customError({ error: 'Post could not be updated', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error when making PUT request: ${error}`, status: 404 })
  }
}

export async function deletePost (id) {
  try {
    const res = await fetch(`${apiUrl}/api/posts/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      return customError({ error: 'Error deleting post', status: 404 })
    }
  } catch (error) {
    return customError({ error: `Error when making DELETE request: ${error}`, status: 404 })
  }
}
