const loginWith = async (page, username, password, name) => {
    await page.goto('/login')
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login'}).click()

    if (name !== 'wrongname') {
       await page.getByText(`Logged in as ${name}`).waitFor() 
    }  
}

const createBlog = async (page, title, author, url) => {
    await page.goto('/create')
    await page.getByPlaceholder('title').fill(title)
    await page.getByPlaceholder('author').fill(author)
    await page.getByPlaceholder('url').fill(url)
    await page.getByRole('button', { name: 'Create'}).click()

    //await page.waitForURL('/')
    await page.locator('.blog').getByText(title).waitFor() // waits for the whole blog (since everything is rendered at once) to be rendered
}

export { loginWith, createBlog }