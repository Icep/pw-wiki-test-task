import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class BuyPage extends AppPage {
    public pagePath = '/Cars/forsale'
    readonly usedCarsSearchForm: Locator = this.page.locator('[data-cg-ft="used-cars-search-form"]')
    readonly usedCarsBodyStyleSearchForm : Locator = this.page.locator('[data-cg-ft="used-cars-body-style-search-form"]')

    public async expectLoaded(message = 'Expected Buy page to be loaded'): Promise<void> {
        await expect(this.usedCarsSearchForm, message).toBeVisible()
        await expect(this.usedCarsBodyStyleSearchForm, message).toBeVisible()
    }

    public async checkUsedCarsSearchFormIsVisible(): Promise<boolean> {
        return await this.usedCarsSearchForm.isVisible()
    }

}