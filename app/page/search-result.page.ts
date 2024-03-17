import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class SearchResultPage extends AppPage {
    public pagePath = '/w/index.php?search'
    readonly page: Page
    readonly contentContainer: Locator
    readonly title: Locator
    readonly noResultsMessage: Locator
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly searchResultsContainer: Locator
    readonly searchResultsItem: Locator
    readonly searchResultsItemTitle: Locator
    readonly searchResultsItemBody: Locator
    readonly noneFoundResults: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.contentContainer = page.locator('.mw-content-container')
        this.title = this.contentContainer.locator('#firstHeading')
        this.noResultsMessage = this.contentContainer.locator('.mw-search-nonefound')
        this.searchInput = this.contentContainer.locator('#searchText')
        this.searchButton = this.contentContainer.locator('[type="submit"]')
        this.searchResultsContainer = this.contentContainer.locator('.mw-search-results')
        this.searchResultsItem = this.contentContainer.locator('.mw-search-result')
        this.searchResultsItemTitle = this.searchResultsItem.locator('.mw-search-result-heading')
        this.searchResultsItemBody = this.searchResultsItem.locator('.searchresult')
        this.noneFoundResults = this.contentContainer.locator('.mw-search-nonefound')
    }

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
