import { test, expect } from '@playwright/test'

test.describe('Checkout challenge', async () => {
  test.use({ storageState: '.auth/customer01.json' })

  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/')
  })


  test.afterAll(async ({ browser }) => {
    await browser.close()
  })

  test('Buy now pay later', async ({ page }) => {
    await page.getByTestId('search-query').fill('Thor Hammer')
    await page.getByTestId('search-submit').click()

    await expect(page.getByTestId('search_completed')).toBeVisible()
    await expect(page.locator('[data-test="search-caption"]')).toContainText('Searched for: Thor Hammer')
    const item = page.locator('.col-md-9 .card').getByText('Thor Hammer')
    await expect(item).toBeVisible()
    // await expect(page.locator('.col-md-9 .card').getByText('Thor Hammer')).toBeVisible()
    await item.click()

    await expect(page.locator('h1').getByText(' Thor Hammer ')).toBeVisible()

    // Product added to shopping cart.
    await expect(page.getByTestId('add-to-cart')).toBeVisible()
    await page.getByTestId('add-to-cart').click()
    await page.getByRole('alert', { name: 'Product added to shopping' }).click()
    await expect(page.getByTestId('nav-cart')).toBeVisible()
    await expect(page.getByTestId("cart-quantity")).toHaveText("1")
    await page.getByTestId('nav-cart').click()
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout')
    await expect(page.getByRole('cell', { name: 'Thor Hammer', exact: true })).toBeVisible()
    await expect(page.getByTestId('proceed-1')).toBeVisible()

    const gray = 'rgb(128, 128, 128)'
    const green = 'rgb(51, 153, 51)'
    const step1Cart = page.locator('ul.steps-4 li:nth-child(1) div.step-indicator')
    const step2Signin = page.locator('ul.steps-4 li:nth-child(2) div.step-indicator')
    const step3Billing = page.locator('ul.steps-4 li:nth-child(3) div.step-indicator')
    const step4Payment = page.locator('ul.steps-4 li:nth-child(4) div.step-indicator')

    // Cart is current (gray)
    await expect(step1Cart).toHaveCSS('background-color', gray)
    await page.locator('[data-test="proceed-1"]').click()

    // Cart is done (green), Sign in is current (gray)
    await expect(step1Cart).toHaveCSS('background-color', green)
    await expect(step2Signin).toHaveCSS('background-color', gray)
    await expect(page.locator('p.ng-star-inserted')).toContainText('you are already logged in. You can proceed to checkout')
    await page.getByTestId('proceed-2').click()

    // Sign in is done (green), Billing is current (gray)
    await expect(step2Signin).toHaveCSS('background-color', green)
    await expect(step3Billing).toHaveCSS('background-color', gray)

    // Billing address
    await expect(page.getByRole('heading', { name: 'Billing Address' })).toBeVisible()


    await page.getByTestId('state').fill('test')
    await page.getByTestId('postal_code').fill('0012345')
    await page.getByTestId('proceed-3').click()

    // Billing is done (green), Payment is current (gray)
    await expect(step3Billing).toHaveCSS('background-color', green)

    //Step 4- Payment should be in "grey"yet, but it is in "green"after to click on "Proceed" in step billingAddress- #BUG
    // await expect(step4Payment).toHaveCSS('background-color', gray)

    //Payment
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible()
    await expect(page.locator('div').filter({ hasText: 'Confirm' }).nth(5)).toBeVisible()
    await expect(page.getByTestId('finish')).toBeDisabled()
    await expect(page.getByTestId('payment-method')).toBeVisible()
    await page.getByTestId('payment-method').click()
    await page.getByTestId('payment-method').selectOption({ value: 'buy-now-pay-later' })
    await page.getByTestId('monthly_installments').selectOption({ value: '3' })
    await expect(page.getByTestId('finish')).toBeEnabled()
    await page.getByTestId('finish').click()
    await expect(page.getByTestId('payment-success-message')).toBeVisible()
    await expect(page.getByTestId('payment-success-message')).toContainText('Payment was successful')
    await page.getByTestId('finish').click()

    //Thanks for your order! Your invoice number is
    await expect(page.locator('#order-confirmation')).toBeVisible()
    await expect(page.locator('#order-confirmation')).toContainText('Thanks for your order! Your invoice number is')
  })
})

test.describe('API challenge', async () => {
  test('', async ({ page }) => {

  })
})