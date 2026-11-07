import { expect } from "@playwright/test"

const loginWith = async (page, username, password) => {
    await page.getByRole('button', { name: 'login'}).click()
    await page.getByPlaceholder('username').fill(username)
    await page.getByPlaceholder('password').fill(password)
    await page.getByRole('button', { name: 'login'}).click()
}

export default loginWith