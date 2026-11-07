const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ request, page }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
    })

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

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
      const result = page.getByText('Logged in as Superuser')

      await expect(result).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'wrongname', 'wrongpassword')
      const notifDiv = page.locator('.notification') //locate element with CSS className 'notification'

      await expect(notifDiv).toContainText('Error, wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'root', 'salainen')
    })

    test('a blog can be created', async ( {page} ) => {
      await createBlog(page, 'test title', 'test author', 'test url')

      const blogDiv = page.locator('.blog').filter({ hasText: 'test title'})

      await expect(blogDiv).toContainText('test title')
      await expect(blogDiv).toContainText('test author')
      await expect(blogDiv).toContainText('test url')
    })
  })
})