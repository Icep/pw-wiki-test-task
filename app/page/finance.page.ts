import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class FinancePage extends AppPage {
    public pagePath = '/Cars/finance'
    readonly calloutLauncherBtn: Locator = this.page.locator('[data-cg-ft="financing-launcher-callout-welcome-hero"]')

    public async expectLoaded(message = 'Expected Finance page to be loaded'): Promise<void> {
        await expect(this.calloutLauncherBtn, message).toBeVisible()
    }

    public async checkCalloutLauncherBtnIsVisible(): Promise<boolean> {
        return await this.calloutLauncherBtn.isVisible()
    }
}
