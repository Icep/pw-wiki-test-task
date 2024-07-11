import { test, expect } from '@playwright/test'
import { Application } from '../../app'

let app: Application

test.beforeEach(async ({ page }) => {
    app = new Application(page)
    await app.mainPage.open('https://proxinator-na.svc.ue1.site-dev.c-gurus.com/')
})

test.describe('Navigation bar functionality', () => {
    test('Navigate to "Buy" section', async ({ page }) => {
        // Click on the "Buy" link in the navbar
        await app.navbar.openBuySection()
        // Verify that the user is taken to the "Buy" section
        await expect(page.url()).toContain('/Cars/forsale')
        await app.buyPage.checkUsedCarsSearchFormIsVisible()
    })

    test('Verify navigation to "Sell" section', async ({ page }) => {
        // Click on the "Sell" link in the navbar
        await app.navbar.openSellSection()
        // Verify that the user is taken to the "Sell" section
        await expect(page.url()).toContain('/sell-car/?pid=SellMyCarDesktopHeader')
        await app.sellPage.checkVinPlateModalIsVisible()
    })

    test('Navigate to "Finance" section', async ({ page }) => {
        // Click on the "Current events" link in the main menu
        await app.navbar.openFinanceSection()
        // Verify that the user is taken to the "Current events" section
        await expect(page.url()).toContain('/Cars/finance')
        await app.financePage.checkCalloutLauncherBtnIsVisible()
    })

    test('Navigate to "Research" section', async ({ page }) => {
        // Click on the "Research" link in the navbar
        await app.navbar.openResearchSection()
        // Verify that the user is taken to the "Research" section
        await expect(page.url()).toContain('/research')
        await app.researchPage.checkMainTitleToContainText('Car reviews and advice')
    })

    test('Verify navigation with an invalid URL', async ({ page }) => {
        // Modify the URL in the browser's address bar to an invalid Wikipedia URL
        await page.goto('https://proxinator-na.svc.ue1.site-dev.c-gurus.com/Cars/new/searchresults.a?entitySelectgHelper.selectedEntity=d21&zip=65080#listing=387258231/NEWCAR_FEATURED/DEFAULT')
        // Verify that a 404 error page or a similar error message is displayed
        await app.notFoundPage.check404PageIsVisible()
    })
})