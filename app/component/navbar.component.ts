import { expect, Locator, Page } from '@playwright/test'
import { Component } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class NavBar extends Component {
    readonly mainMenuBtn: Locator
    readonly logo: Locator
    readonly searchField: Locator
    readonly searchBtn: Locator
    readonly searchResultsModal: Locator
    readonly searchResultsItem: Locator
    readonly searchModalFooter: Locator
    readonly createAccountLnk: Locator
    readonly loginLnk: Locator

    constructor(page: Page) {
        super(page)
        this.mainMenuBtn = page.locator('[aria-label="Main menu"]')
        this.logo = page.locator('.mw-logo')
        this.searchField = page.locator('[aria-label="Search Wikipedia"]')
        this.searchBtn = page.locator('.cdx-search-input__end-button')
        this.searchResultsModal = page.locator('.cdx-menu')
        this.searchResultsItem = this.searchResultsModal.locator('.cdx-search-result-title')
        this.searchModalFooter = page.locator('.cdx-typeahead-search__search-footer__text')
        this.createAccountLnk = page.locator('#pt-createaccount-2')
        this.loginLnk = page.locator('#pt-login-2')
    }
    public async expectLoaded(message = 'Expected NavBar to be loaded'): Promise<void> {
        await expect(this.mainMenuBtn, message).toBeVisible()
        await expect(this.logo, message).toBeVisible()
        await expect(this.searchField, message).toBeVisible()
        await expect(this.searchBtn, message).toBeVisible()
        await expect(this.createAccountLnk, message).toBeVisible()
        await expect(this.loginLnk, message).toBeVisible()
    }

    @step()
    public async openMainMenu() {
        await this.expectLoaded()
        await this.mainMenuBtn.click()
    }

    @step()
    public async search(text: string) {
        await this.expectLoaded()
        await this.searchField.fill(text)
        await this.searchBtn.click()
    }

    @step()
    public async searchForAllPagesContaining(text: string) {
        await this.expectLoaded()
        await this.searchField.fill(text)
        await this.searchModalFooter.click()
    }

    @step()
    public async fillSearchField(text: string): Promise<void> {
        await this.searchField.fill(text)
    }

    //Section for checking visibility of elements
    public async isMainMenuVisible(): Promise<boolean> {
        return await this.mainMenuBtn.isVisible()
    }

    public async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible()
    }

    public async isSearchFieldVisible(): Promise<boolean> {
        return await this.searchField.isVisible()
    }

    public async isCreateAccountLinkVisible(): Promise<boolean> {
        return await this.createAccountLnk.isVisible()
    }

    public async isLoginLinkVisible(): Promise<boolean> {
        return await this.loginLnk.isVisible()
    }

    //Section for clicking elements

    public async clickMainMenu(): Promise<void> {
        await this.mainMenuBtn.click()
    }

    public async clickLogo(): Promise<void> {
        await this.logo.click()
    }

    public async clickSearchButton(): Promise<void> {
        await this.searchBtn.click()
    }

    public async clickCreateAccountLink(): Promise<void> {
        await this.createAccountLnk.click()
    }

    public async clickLoginLink(): Promise<void> {
        await this.loginLnk.click()
    }

    public async clickSearchResultWithText(text: string): Promise<void> {
        await this.searchResultsItem.filter({ hasText: text }).click()
    }

    //Section for functions checking visibility of elements on page
    public async checkNavbarElementsVisibility(): Promise<void> {
        await expect(await this.isMainMenuVisible()).toBeTruthy()
        await expect(await this.isLogoVisible()).toBeTruthy()
        await expect(await this.isSearchFieldVisible()).toBeTruthy()
        await expect(await this.isCreateAccountLinkVisible()).toBeTruthy()
        await expect(await this.isLoginLinkVisible()).toBeTruthy()
    }

    public async expectSearchResultsModalVisible(): Promise<void> {
        await expect(this.searchResultsModal).toBeVisible()
    }

    public async expectSearchResultsItemVisible(text: string): Promise<void> {
        await expect(this.searchResultsItem.nth(1)).toHaveText(text)
    }
}
