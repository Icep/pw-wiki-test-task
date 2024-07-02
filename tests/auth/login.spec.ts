import { test, expect } from '@playwright/test'
import { Application } from '../../app'

let app: Application

test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.mainPage.open('https://en.wikipedia.org/wiki/Main_Page')
})

test.describe('Login', () => {
    test.skip('Successful login', async ({ page }) => {
        // Click on "Log in"
        await app.navbar.clickLoginLink()
        // Enter a correct username and password and press the login button
        await app.loginSteps.login('username', 'Test@password123')
        // Verify that the user successfully logs into the system and a welcome message is displayed
        await app.loginPage.expectSuccessMessageToBeVisible()
        await app.loginPage.expectSuccessMessageTextToBe('You are now logged in.')
    })

    test('Login with incorrect credentials', async ({ page }) => {
        // Click on "Log in"
        await app.navbar.clickLoginLink()
        // Enter an incorrect username and password and attempt to log in
        await app.loginSteps.login('incorrect_username', 'incorrect_password')
        // Verify that an error message appears and the login is not completed
        await app.loginPage.expectErrorMessageToBeVisible()
        await app.loginPage.expectErrorMessageTextToBe('Incorrect username or password entered. Please try again.')
    })
})