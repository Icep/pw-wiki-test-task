import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class ResearchPage extends AppPage {
    public pagePath = '/research'
    readonly mainTitle: Locator = this.page.locator('section h1').first()

    public async expectLoaded(message = 'Expected Research page to be loaded'): Promise<void> {
        await expect(this.mainTitle, message).toBeVisible()
    }

    public async checkMainTitleToContainText(text: string): Promise<void> {
        await expect(this.mainTitle).toContainText(text)
    }

}