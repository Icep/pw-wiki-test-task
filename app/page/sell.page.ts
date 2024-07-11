import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class SellPage extends AppPage {
    public pagePath = '/sell-car/?pid=SellMyCarDesktopHeader'
    readonly vinPlateModal: Locator = this.page.locator('[name="vin-plate"]')

    public async expectLoaded(message = 'Expected Sell page to be loaded'): Promise<void> {
        await expect(this.vinPlateModal, message).toBeVisible()
    }

    public async checkVinPlateModalIsVisible(): Promise<boolean> {
        return await this.vinPlateModal.isVisible()
    }

}