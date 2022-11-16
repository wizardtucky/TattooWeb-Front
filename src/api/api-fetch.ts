export interface ApiFetchOptions<Body>
  extends Omit<RequestInit, 'body' | 'headers'> {
  body?: Body
}

export const apiFetch = async <T, Body = unknown>(
  path: string,
  options: ApiFetchOptions<Body> = {}
) => {
  const { body, method, ...opts } = options
  const url = new URL(path, import.meta.env.VITE_API_URL)

  const formatedBody = body ? JSON.stringify(body) : undefined

  const headers = new Headers()
  if (['POST', 'PUT'].includes(method as string)) {
    headers.append('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    ...opts,
    headers,
    method,
    body: formatedBody,
  })

  const contentType = response.headers.get('Content-Type')

  let result
  if (contentType === 'application/json') {
    result = await response.json()
  } else {
    result = await response.text()
  }

  return result as T
}
