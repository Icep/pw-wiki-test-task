import { test, expect } from '@playwright/test'
import { Application } from '../../app'

let app: Application

test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.mainPage.open('https://www.cargurus.com/')
})

test.describe('Navigation bar functionality', () => {
    test('Navigate to "Buy" section', async ({ page }) => {
        // Click on the "Buy" link in the navbar
        await app.navbar.openBuySection()
        // Verify that the user is taken to the "Buy" section
        await expect(page.url()).toContain('/Cars/forsale')
    })

    test('Verify navigation to "Sell" section', async ({ page }) => {
        // Click on the "Sell" link in the navbar
        await app.navbar.openSellSection()
        // Verify that the user is taken to the "Sell" section
        await expect(page.url()).toContain('/sell-car/?pid=SellMyCarDesktopHeader')
    })

    test('Navigate to "Finance" section', async ({ page }) => {
        // Click on the "Current events" link in the main menu
        await app.navbar.openFinanceSection()
        // Verify that the user is taken to the "Current events" section
        await expect(page.url()).toContain('/Cars/finance')
    })

    test('Navigate to "Research" section', async ({ page }) => {
        // Click on the "Research" link in the navbar
        await app.navbar.openResearchSection()
        // Verify that the user is taken to the "Research" section
        await expect(page.url()).toContain('/research')
    })

    test('Verify navigation with an invalid URL', async ({ page }) => {
        // Modify the URL in the browser's address bar to an invalid Wikipedia URL
        await app.mainPage.open('https://www.cargurus.com/Cars/new/searchresults.a?entitySelectgHelper.selectedEntity=d21&zip=65080#listing=387258231/NEWCAR_FEATURED/DEFAULT')
        // Verify that a 404 error page or a similar error message is displayed
        await app.mainPage.check404PageIsVisible()
    })
})


test.describe('Login', () => {
    //For this test we need to have a valid username and password but unfortunately we don't have it
    //and registration is not possible because of limit on IP address
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

test.describe('Opening Articles', () => {
    test('Opening an article from the "Featured article" section', async ({ page }) => {
        // Click on the title of an article in the "Featured article" section
        await app.mainPage.clickOpenFullFeaturedArticle()
        // Verify that the full version of the selected article opens
        await app.articlePage.checkArticleElementsVisibility()
        await app.articlePage.checkArticleTextContentNotEmpty()
    })

    test('Open an article through search', async ({ page }) => {
        // Enter "Quantum mechanics" in the search field and press Enter
        await app.navbar.search('Kurube Kanga ruins')
        // Verify that a search page with results matching the query is displayed
        await expect(app.articlePage.title).toHaveText('Kurube Kanga ruins')
        await app.articlePage.checkArticleElementsVisibility()
        await app.articlePage.checkArticleTextContentNotEmpty()
    })

    test('Attempt to open a deleted article', async ({ page }) => {
        // Try to open an article that has been deleted or does not exist by typing its URL directly into the browser
        await page.goto('https://en.wikipedia.org/wiki/Deleted_Article')
        // Verify that the user receives a message that the article does not exist
        await app.mainPage.checkNoArticleTextIsVisible()
    })
})

test.describe('Content Verification on Page', () => {
    test('Verify the presence of the main elements on the homepage', async ({ page }) => {
        // Verify the presence of the logo, search bar, main menu, "In the news" section, and footer
        await app.mainPage.checkMainPageElementsVisibility()
        await app.mainPage.checkElementsTextNotEmpty()
    })

    test('Verify the presence of the "Did you know" section', async ({ page }) => {
        // Verify the presence of the "Did you know" section on the homepage
        await app.mainPage.checkDidYouKnowSectionVisibility()
        await app.mainPage.checkDidYouKnowSectionTextNotEmpty()
    })
})

test.describe('External Resources and Internal Linking', () => {
    test('Verify internal links on the homepage', async ({ page }) => {
        // Click on a random internal link on the homepage
        await app.mainPage.clickRandomInternalLink()
        // Verify that the transition is successful and the corresponding page opens
        await app.articlePage.checkArticleElementsVisibility()
    })

    test('Verify external links', async ({ page }) => {
        // Click on an external reference link
        await app.mainPage.clickMediaWikiLink()
        // Verify that the external webpage opens in a new tab or window
        await expect(page.url()).toContain('www.mediawiki.org/wiki/MediaWiki')
    })
})
