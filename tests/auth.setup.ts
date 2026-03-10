import { test as setup, expect } from '@playwright/test'

// import { LoginPage } from "./lib/pages/login.page"

setup('Create costumer 01 auth', async ({ page, context }) => {
  const email = 'customer2@practicesoftwaretesting.com'
  const password = 'welcome01'
  const customer01AuthFile = '.auth/customer01.json'
  const username = 'Jack Howe'

  await page.goto('https://practicesoftwaretesting.com/auth/login')

  await page.getByTestId('email').fill(email)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login-submit').click()
  await page.waitForLoadState('networkidle')

  // await expect(page.getByTestId('nav-menu')).toContainText(username)
  await context.storageState({ path: customer01AuthFile })

  await page.close()
})