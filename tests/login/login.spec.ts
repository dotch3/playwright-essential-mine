import { test, expect } from '@playwright/test'

import { LoginPage } from '../../lib/pages/login.page'

const email = process.env.EMAIL_CUSTOMER02!
const password = process.env.PASSWORD_CUSTOMER02!
const username = process.env.USERNAME_CUSTOMER02!


test.describe('Login tests', async () => {
  test('Login without Page object', async ({ page }) => {

    await page.goto('https://practicesoftwaretesting.com')
    await page.getByTestId('nav-sign-in').click()
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login')
    // fill inputs and click button

    await page.getByTestId('email').fill(email)
    await page.getByTestId('password').fill(password)
    await page.getByTestId('login-submit').click()
    // assert something

    await expect(page.getByTestId('nav-menu')).toContainText(username)
    await expect(page.getByTestId('page-title')).toContainText('My account')
  })

  test('Login with Page objects', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login(email, password)

    await expect(page.getByTestId('nav-menu')).toContainText(username)
  })
})