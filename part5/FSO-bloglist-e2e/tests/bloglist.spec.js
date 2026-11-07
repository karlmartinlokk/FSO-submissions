const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('login form is shown after button click on front page', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'login'})
    await expect(loginButton).toBeVisible()

    await loginButton.click()
    
    const username = page.getByPlaceholder('username')
    const password = page.getByPlaceholder('password')

    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })
})