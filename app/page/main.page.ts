import { Locator, Page, expect } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class MainPage extends AppPage {
    public pagePath = '/'
    readonly page404Text: Locator = this.page.locator('#page404')
    readonly searchWrapModal: Locator = this.page.locator('.hero .searchWrap')
    readonly recommendedCarsScrollBox: Locator = this.page.locator('#recommended_for_you_scroll_box')
    readonly priceDropScrollBox: Locator = this.page.locator('#recent_price_drops_scroll_box')

    readonly recentPreviewsList: Locator = this.page.locator('[aria-label="Recent previews"]')

    public async expectLoaded(message = 'Expected Main page to be loaded'): Promise<void> {
        await expect(this.searchWrapModal, message).toBeVisible()
        // await expect(this.recommendedCarsScrollBox, message).toBeVisible()
        // await expect(this.priceDropScrollBox, message).toBeVisible()
        // await expect(this.recentPreviewsList, message).toBeVisible()
    }

    //Section for clicking elements



    @step()
    public async is404PageVisible(): Promise<boolean> {
        return await this.page404Text.isVisible()
    }

    //Section for assertions and checks

    @step()
    public async check404PageIsVisible(): Promise<void> {
        await expect(await this.is404PageVisible()).toBeTruthy()
    }
}
