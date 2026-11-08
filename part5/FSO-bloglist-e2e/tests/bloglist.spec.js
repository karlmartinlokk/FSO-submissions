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

      await expect(blogDiv.getByText('test title')).toBeVisible()
      await expect(blogDiv.getByText('test author')).toBeVisible()
      await expect(blogDiv.getByText('test url')).not.toBeVisible()
      await expect(blogDiv.getByText('0')).not.toBeVisible()
      await expect(blogDiv.getByText('Superuser')).not.toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')

      const blogDiv = page.locator('.blog').filter({ hasText: 'test title'})
      await blogDiv.getByRole('button', { name: 'view'}).click()

      await expect(blogDiv.locator('.likeCount')).toHaveText('0')

      await blogDiv.getByRole('button', { name: 'like' }).click() 

      await expect(blogDiv.locator('.likeCount')).toHaveText('1')
    })

    test('a blog can be deleted by its author', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      const createdBlog = page.locator('.blog').filter({ hasText: 'test title'})

      page.on('dialog', dialog => dialog.accept())
      const blogField = createdBlog.locator('..')
      await blogField.getByRole('button', { name: 'remove'}).click()

      await expect(createdBlog).not.toBeVisible()

      const notifDiv = page.locator('.notification')
      await expect(notifDiv).toContainText('Blog deleted successfully')

      await page.goto('/')
      await expect(page.getByText('Logged in as Superuser')).toBeVisible() // safeguard to check whether user stayed logged in
      await expect(createdBlog).not.toBeVisible() //checking whether blog is gone even after backend fetches again
    })

    test('the blog delete button can only seen by author', async ({ page, request }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      const deleteButton = page.locator('.blog').filter({ hasText: 'test title'}).locator('..').getByRole('button', { name: 'remove'})

      await expect(deleteButton).toBeVisible()

      await page.getByRole('button', { name: 'Logout'}).click()
      await expect(page.getByRole('button', { name: 'login'})).toBeVisible()

      await request.post('/api/users', {
        data: {
          name: 'Superuser2',
          username: 'root2',
          password: 'salainen2'
        }
      })
      await loginWith(page, 'root2', 'salainen2')
      await expect(page.getByText('Logged in as Superuser')).toBeVisible()
      await expect(page.locator('.blog').filter({ hasText: 'test title'})).toBeVisible()
      await expect(deleteButton).not.toBeVisible()
    })

    test('blogs are arranged in order of most likes', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await createBlog(page, 'test title 2', 'test author 2', 'test url 2')
      await createBlog(page, 'test title 3', 'test author 3', 'test url 3')

      const blog1 = page.locator('.blog').filter({ has: page.locator('text="test title"')})
      const blog2 = page.locator('.blog').filter({ has: page.locator('text="test title 2"')})
      const blog3 = page.locator('.blog').filter({ has: page.locator('text="test title 3"')})


      await expect(blog1).toBeVisible()
      await expect(blog2).toBeVisible()
      await expect(blog3).toBeVisible()

      const firstBlog = page.locator('.allBlogs').locator('.blog').nth(0)
      await expect(firstBlog).toBeVisible()
      const secondBlog = page.locator('.allBlogs').locator('.blog').nth(1)
      await expect(secondBlog).toBeVisible()
      const thirdBlog = page.locator('.allBlogs').locator('.blog').nth(2)
      await expect(thirdBlog).toBeVisible()


      await blog1.getByRole('button', { name: 'view'}).click()
      await blog1.getByRole('button', { name: 'like' }).click()
      await blog1.getByRole('button', { name: 'hide'}).click()
      await expect(blog1.locator('.likeCount')).toHaveText('1')

      
      for (let i = 1; i < 5; i++) {
        await blog3.getByRole('button', { name: 'view'}).click()
        await blog3.getByRole('button', { name: 'like' }).click()
        await expect(blog3.locator('.likeCount')).toHaveText(`${i}`)
        await blog3.getByRole('button', { name: 'hide'}).click()
      }

      await expect(firstBlog.locator('.likeCount')).toHaveText('4')
      await expect(secondBlog.locator('.likeCount')).toHaveText('1')

      for (let i = 1; i < 8; i++) {
        await blog2.getByRole('button', { name: 'view'}).click()
        await blog2.getByRole('button', { name: 'like' }).click()
        await expect(blog2.locator('.likeCount')).toHaveText(`${i}`)
        await blog2.getByRole('button', { name: 'hide'}).click()
      }

      await expect(firstBlog.locator('.likeCount')).toHaveText('7')
      await expect(secondBlog.locator('.likeCount')).toHaveText('4')
      await expect(thirdBlog.locator('.likeCount')).toHaveText('1')
    })
  })
})