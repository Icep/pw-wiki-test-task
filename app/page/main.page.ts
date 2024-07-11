import { Locator, Page, expect } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class MainPage extends AppPage {
    public pagePath = '/'
    readonly homePage: Locator = this.page.locator('.homepage').first()
    readonly searchWrapModalAlt: Locator = this.page.locator('[data-testid="hero-search-form-buy"]')
    readonly searchWrapModal: Locator = this.page.locator('#heroSearch')
    readonly searchWrapModalInput: Locator = this.page.locator('#heroSearch-tab-content-0')
    readonly bannerModal: Locator = this.page.locator('.ddC2DBanner')
    readonly recommendedCarsScrollBox: Locator = this.page.locator('#recommended_for_you_scroll_box')
    readonly priceDropScrollBox: Locator = this.page.locator('#recent_price_drops_scroll_box')
    readonly recentTestDriveList: Locator = this.page.locator('#test_drives')
    readonly recentPreviewsList: Locator = this.page.locator('[aria-label="Recent previews"]')
    readonly popularCarsList: Locator = this.page.locator('#popularEntities')

    public async expectLoaded(message = 'Expected Main page to be loaded'): Promise<void> {
        let searchModalState: boolean = false
        if (await this.searchWrapModalAlt.isVisible() || await this.searchWrapModal.isVisible()) {
            searchModalState = true
        }
        await expect(searchModalState).toBeTruthy()
    }

    //Section for clicking elements


    //Section for assertions and checks


}
