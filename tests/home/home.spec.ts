import { test, expect } from '@playwright/test'


test.describe('Home page with no auth', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/')
  })

  test('Check sign in', async ({ page }) => {
    await expect(page.getByTestId('nav-sign-in')).toBeVisible()
  })

  test('Validate test title', async ({ page }) => {
    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0')
  })

  test('Grid loads 9 items', async ({ page }) => {
    // check the count of items in home page, default = 9 items
    const products = page.locator('.col-md-9')
    await expect(products.getByRole('link')).toHaveCount(9)
  })

  test('Searching for an item', async ({ page }) => {
    // Search for item 'Thor Hammer'and assert the result

    const products = page.locator('.col-md-9')
    await page.getByTestId('search-query').fill('Thor Hammer')
    await page.getByTestId('search-submit').click()

    // Resultant Data table loaded 
    await expect(page.getByTestId('search_completed')).toBeVisible()
    await expect(page.locator('[data-test="search-caption"]')).toContainText('Searched for: Thor Hammer')
    await expect(products.getByRole('link')).toHaveCount(1)
    await expect(page.locator('.col-md-9 .card').getByText('Thor Hammer')).toBeVisible()
    await expect(page.getByAltText('Thor Hammer')).toBeVisible()
    // await expect(page.locator('[data-test="product-name"]')).toContainText('Thor Hammer');
  })


  test('Visual test', async ({ page }) => {
    await page.waitForLoadState('load')
    await expect(page).toHaveScreenshot('home-page-no-auth.png', { mask: [page.getByTitle('Practice Software Testing - Toolshop')] })
  })
})

test.describe('home page customer 01 auth', () => {
  //Applying the storage state created by auth.setup.ts
  test.use({ storageState: '.auth/customer01.json' })

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/')
  })

  test('Visual test authorized', async ({ page }) => {
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('home-page-auth.png', { mask: [page.getByTitle('Practice Software Testing - Toolshop')] })
  })
  test('Check customer 01 is signed in', async ({ page }) => {
    await expect(page.getByTestId('nav-sign-in')).not.toBeVisible()
  })
})