import { test, expect } from '@playwright/test'
import { Application } from '../../app'

let app: Application

test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.mainPage.open('https://en.wikipedia.org/wiki/Main_Page')
})

test.describe('Main Menu Functionality', () => {
    test('Navigate to "Contents" section', async ({ page }) => {
        // Click on the "Contents" link in the main menu
        await app.mainMenu.navigateToMainMenuItem('Contents')
        // Verify that the user is taken to the "Contents" section
        await expect(page.url()).toContain('/wiki/Wikipedia:Contents')
    })

    test('Verify navigation to "Random article"', async ({ page }) => {
        // Click on the "Random article" link in the main menu
        await app.mainMenu.navigateToMainMenuItem('Random article')
        // Verify that the user is taken to a random article
        await app.articlePage.checkArticleElementsVisibility()
    })

    test('Verify navigation with an invalid URL', async ({ page }) => {
        // Modify the URL in the browser's address bar to an invalid Wikipedia URL
        await app.mainPage.open('https://en.wikipedia.org/wiki/Invalid_UR_L')
        // Verify that a 404 error page or a similar error message is displayed
        await app.mainPage.checkNoArticleTextIsVisible()
    })
})

test.describe('Search System', () => {
    test('Search for an existing term', async ({ page }) => {
        // Enter "Quantum mechanics" in the search field and click Search button
        await app.navbar.searchForAllPagesContaining('Quantum')
        // Verify that a search page with results matching the query is displayed
        await app.searchResultPage.checkSearchResultsElementsVisibility()
        await app.searchResultPage.checkSearchResultsTextContentNotEmpty()
        await app.searchResultPage.checkSearchResultsContainText('Quantum')
    })

    test('Search with autocomplete', async ({ page }) => {
        // Type "Quan" in the search field
        await app.navbar.fillSearchField('Quan')
        // Verify that suggestions with autocomplete, including "Quantum mechanics", appear in a dropdown menu
        await app.navbar.expectSearchResultsModalVisible()
        await app.navbar.expectSearchResultsItemVisible('Quantum mechanics')
    })

    test('Search for a non-existent term', async ({ page }) => {
        // Enter a string of random characters in the search field and press Enter
        await app.navbar.search('Random123sdfg')
        // Verify that the search results page indicates that no results were found
        await expect(app.searchResultPage.noneFoundResults).toHaveText('There were no results matching the query.')
    })
})

test.describe('Login', () => {
    //For this test we need to have a valid username and password but unfortunately we don't have it
    //and registration is not possible because of limit on IP address
    test.skip('Successful login', async ({ page }) => {
        // Click on "Log in"
        await app.navbar.clickLoginLink()
        // Enter a correct username and password and press the login button
        await app.loginPage.login('username', 'Test@password123')
        // Verify that the user successfully logs into the system and a welcome message is displayed
        await app.loginPage.expectSuccessMessageToBeVisible()
        await app.loginPage.expectSuccessMessageTextToBe('You are now logged in.')
    })

    test('Login with incorrect credentials', async ({ page }) => {
        // Click on "Log in"
        await app.navbar.clickLoginLink()
        // Enter an incorrect username and password and attempt to log in
        await app.loginPage.login('incorrect_username', 'incorrect_password')
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
