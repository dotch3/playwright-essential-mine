import { test, expect } from '@playwright/test'

test.describe('API challenge', async () => {

  const apiUrl = 'https://api.practicesoftwaretesting.com'
  test('GET /products/{id}', async ({ request }) => {

    const getProductResponse = await request.get(`${apiUrl}/products/search?q=thor`)

    expect(getProductResponse.status()).toBe(200)

    const productBody = await getProductResponse.json()
    const productId = productBody.data[0].id
    console.log(`ID found: ${productId}`)

    //Gert call for specific product ID
    const response = await request.get(`${apiUrl}/products/${productId}`)
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body.name).toBe('Thor Hammer')
    expect(body.in_stock).toBe(true)
    expect(body.category.name).toBe('Hammer')
    expect(body.price).toBe(11.14)
  })
})