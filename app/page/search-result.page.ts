import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class SearchResultPage extends AppPage {
    public pagePath = '/w/index.php?search'
    readonly listingSearchContainer: Locator = this.page.locator('#cargurus-listing-search')
    readonly searchResultsItemTitle: Locator = this.page.locator('[data-cg-ft="srp-header-title"]')
    readonly carTile: Locator = this.page.locator('[data-cg-ft="car-blade"]')


    @step()
    public async expectLoaded(message = 'Expected Search results page to be loaded'): Promise<void> {
        await expect(this.listingSearchContainer, message).toBeVisible()
    }

    @step()
    public async checkSearchResultsElementsVisibility(): Promise<void> {
        await expect(this.searchResultsItemTitle).toBeVisible()
        await expect(this.carTile).toBeVisible()
        await this.checkSearchResultsContentNotEmpty()
    }

    @step()
    public async checkSearchResultsContentNotEmpty(): Promise<void> {
        let searchResultsItemCount = await this.carTile.count()
        await expect(searchResultsItemCount).toBeGreaterThan(0)
    }

    @step()
    public async checkSearchResultsTitleContainText(text: string): Promise<void> {
        await expect(this.searchResultsItemTitle.first().filter({ hasText: text })).toBeVisible()
    }
}
