import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class ArticlePage extends AppPage {
    public pagePath = '/wiki/'
    readonly title: Locator = this.page.locator('#firstHeading')
    readonly content: Locator = this.page.locator('#mw-content-text .mw-parser-output')
    readonly references: Locator = this.page.locator('#References')
    readonly infoBox: Locator = this.page.locator('.infobox')
    readonly categories: Locator = this.page.locator('#mw-normal-catlinks ul li')
    readonly externalLinks: Locator = this.page.locator('span#External_links ~ ul li')
    readonly seeAlsoSections: Locator = this.page.locator('span#See_also ~ ul li')

    async open(url: string): Promise<void> {
        await this.page.goto(url)
    }

    public async expectLoaded(message = 'Expected Article to be loaded'): Promise<void> {
        await expect(this.title, message).toBeVisible()
        await expect(this.content, message).toBeVisible()
        await expect(this.references, message).toBeVisible()
    }

    //Section for checking visibility of elements
    async expectTitleToBeVisible(): Promise<void> {
        await expect(this.title).toBeVisible()
    }

    async expectContentToBeVisible(): Promise<void> {
        await expect(this.content).toBeVisible()
    }

    async expectReferencesToBeVisible(): Promise<void> {
        await expect(this.references).toBeVisible()
    }

    async expectInfoBoxToBeVisible(): Promise<void> {
        await expect(this.infoBox).toBeVisible()
    }

    //Section for getting elements text content
    async getTitleText(): Promise<string> {
        return (await this.title.textContent()) ?? ''
    }

    async getContentText(): Promise<string> {
        return (await this.content.textContent()) ?? ''
    }

    async getInfoBoxText(): Promise<string> {
        return (await this.infoBox.textContent()) ?? ''
    }

    //Section for getting elements count
    async getCategoriesCount(): Promise<number> {
        return await this.categories.count()
    }

    async getExternalLinksCount(): Promise<number> {
        return await this.externalLinks.count()
    }

    async getSeeAlsoSectionsCount(): Promise<number> {
        return await this.seeAlsoSections.count()
    }

    //Section for checking elements visibility and content
    async checkArticleElementsVisibility(): Promise<void> {
        await this.expectTitleToBeVisible()
        await this.expectContentToBeVisible()
        await this.expectReferencesToBeVisible()
    }

    async checkArticleTextContentNotEmpty(): Promise<void> {
        expect(await this.getTitleText()).not.toBe('')
        expect(await this.getContentText()).not.toBe('')
        expect(await this.getInfoBoxText()).not.toBe('')
    }
}
