import { test, expect } from '@playwright/test'

const apiUrl = 'https://api.practicesoftwaretesting.com'


const email = 'customer2@practicesoftwaretesting.com'
const password = 'welcome01'
test('GET products', async ({ request }) => {

  const response = await request.get(`${apiUrl}/products`)

  expect(response.status()).toBe(200)
  expect(response.ok()).toBe(true)
  const body = await response.json()
  expect(body.total).toBe(50)

})

test('POST /users/login', async ({ request }) => {

  // Post, uses the endpoint and the object send inside {data: {}}
  const response = await request.post(`${apiUrl}/users/login`, {
    data: {
      email: email,
      password: password,
    }
  })

  expect(response.status()).toBe(200)
  const body = await response.json()
  console.log(body)
  expect(body.access_token).not.toBeFalsy()

  const userResponse = await request.get(`${apiUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${body.access_token}`,
    }
  })
  expect(userResponse.status()).toBe(200)
  const userData = await userResponse.json()
  console.log(userData)
  expect(userData.email).toBe(email)
  expect(userData.first_name).toBe('Jack')
  expect(userData.last_name).toBe('Howe')
})