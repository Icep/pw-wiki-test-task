import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class SearchResultPage extends AppPage {
    public pagePath = '/w/index.php?search'
    readonly contentContainer: Locator = this.page.locator('.mw-content-container')
    readonly title: Locator = this.contentContainer.locator('#firstHeading')
    readonly noResultsMessage: Locator = this.contentContainer.locator('.mw-search-nonefound')
    readonly searchInput: Locator = this.contentContainer.locator('#searchText')
    readonly searchButton: Locator = this.contentContainer.locator('[type="submit"]')
    readonly searchResultsContainer: Locator = this.contentContainer.locator('.mw-search-results')
    readonly searchResultsItem: Locator = this.contentContainer.locator('.mw-search-result')
    readonly searchResultsItemTitle: Locator = this.contentContainer.locator('.mw-search-result-heading')
    readonly searchResultsItemBody: Locator = this.contentContainer.locator('.searchresult')
    readonly noneFoundResults: Locator = this.contentContainer.locator('.mw-search-nonefound')

    @step()
    public async expectLoaded(message = 'Expected Search results page to be loaded'): Promise<void> {
        await expect(this.title, message).toBeVisible()
        await expect(this.searchInput, message).toBeVisible()
        await expect(this.searchButton, message).toBeVisible()
    }

    public async open(url: string): Promise<void> {
        await this.page.goto(url)
    }

    @step()
    public async checkSearchResultsElementsVisibility(): Promise<void> {
        await expect(this.searchInput).toBeVisible()
        await expect(this.searchButton).toBeVisible()
        await expect(this.searchResultsContainer).toBeVisible()
        await this.checkSearchResultsTextContentNotEmpty()
    }

    @step()
    public async checkSearchResultsTextContentNotEmpty(): Promise<void> {
        let searchResultsItemCount = await this.searchResultsItem.count()
        await expect(searchResultsItemCount).toBeGreaterThan(0)
        await expect(this.searchResultsItemTitle.first().textContent()).not.toBe('')
        await expect(this.searchResultsItemBody.first().textContent()).not.toBe('')
    }

    @step()
    public async checkSearchResultsContainText(text: string): Promise<void> {
        await expect(this.searchResultsItemTitle.first().filter({ hasText: text })).toBeVisible()
    }
}
