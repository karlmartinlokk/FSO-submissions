const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login'}).click()
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'Create new blog'}).click()
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'Create'}).click()

    await page.locator('.blog').getByText(title).waitFor() // waits for the whole blog (since everything is rendered at once) to be rendered
}

export { loginWith, createBlog }