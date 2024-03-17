import { expect, Locator, Page } from '@playwright/test'
import { Component } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class mainMenuComponent extends Component {
    readonly page: Page
    readonly mainMenuBtn: Locator
    readonly mainMenuModal: Locator
    readonly mainMenuMoveToSidebar: Locator
    readonly mainMenuItem: Locator

    constructor(page: Page) {
        super(page)
        this.page = page
        this.mainMenuBtn = this.page.locator('[aria-label="Main menu"]')
        this.mainMenuModal = this.page.locator('#vector-main-menu')
        this.mainMenuMoveToSidebar = this.mainMenuModal.locator('.vector-pinnable-header-pin-button')
        this.mainMenuItem = this.mainMenuModal.locator('.mw-list-item')
    }

    public async openMainMenu() {
        await this.mainMenuBtn.click()
    }

    public async expectLoaded(message = 'Expected Header to be loaded'): Promise<void> {
        await expect(this.mainMenuBtn, message).toBeVisible()
    }

    @step()
    public async navigateToMainMenuItem(item: string) {
        await this.expectLoaded()
        await this.openMainMenu()
        await this.mainMenuItem.locator(`text=${item}`).click()
    }
}
