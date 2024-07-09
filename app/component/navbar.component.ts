import { expect, Locator, Page } from '@playwright/test'
import { Component } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class NavBar extends Component {
    readonly logo: Locator = this.page.locator('.cargurusLogo')
    readonly buyBtn: Locator = this.page.locator('#wai_snm_cnl_buy')
    readonly sellBtn: Locator = this.page.locator('#wai_snm_cnl_sell')
    readonly financeBtn: Locator = this.page.locator('#wai_snm_cnl_finance')
    readonly researchBtn: Locator = this.page.locator('#wai_snm_cnl_research')
    readonly notificationIcon: Locator = this.page.locator('#notification-menu-control')
    readonly savedCarsAndSearchesBtn: Locator = this.page.locator('.fa-heart')
    readonly loginLnk: Locator = this.page.locator('#sign-in-prominent')

    public async expectLoaded(message = 'Expected NavBar to be loaded'): Promise<void> {
        await expect(this.logo, message).toBeVisible()
        await expect(this.buyBtn, message).toBeVisible()
        await expect(this.sellBtn, message).toBeVisible()
        await expect(this.financeBtn, message).toBeVisible()
        await expect(this.researchBtn, message).toBeVisible()
        await expect(this.notificationIcon, message).toBeVisible()
        await expect(this.savedCarsAndSearchesBtn, message).toBeVisible()
        await expect(this.loginLnk, message).toBeVisible()
    }

    //Section for checking visibility of elements
    public async isLogoVisible(): Promise<boolean> {
        return await this.logo.isVisible()
    }

    public async isBuyButtonVisible(): Promise<boolean> {
        return await this.buyBtn.isVisible()
    }

    public async isSellButtonVisible(): Promise<boolean> {
        return await this.sellBtn.isVisible()
    }

    public async isFinanceButtonVisible(): Promise<boolean> {
        return await this.financeBtn.isVisible()
    }

    public async isResearchButtonVisible(): Promise<boolean> {
        return await this.researchBtn.isVisible()
    }

    public async isNotificationIconVisible(): Promise<boolean> {
        return await this.notificationIcon.isVisible()
    }

    public async isSavedCarsAndSearchesButtonVisible(): Promise<boolean> {
        return await this.savedCarsAndSearchesBtn.isVisible()
    }

    public async isLoginLinkVisible(): Promise<boolean> {
        return await this.loginLnk.isVisible()
    }

    //Section for clicking elements

    public async clickLogo(): Promise<void> {
        await this.logo.click()
    }

    public async openBuySection(): Promise<void> {
        await this.buyBtn.click()
    }

    public async openBuyNavbarMenu(): Promise<void> {
        await this.buyBtn.hover()
    }

    public async openSellSection(): Promise<void> {
        await this.sellBtn.click()
    }

    public async openSellNavbarMenu(): Promise<void> {
        await this.sellBtn.hover()
    }

    public async openFinanceSection(): Promise<void> {
        await this.financeBtn.click()
    }

    public async openFinanceNavbarMenu(): Promise<void> {
        await this.financeBtn.hover()
    }

    public async openResearchSection(): Promise<void> {
        await this.researchBtn.click()
    }

    public async openResearchNavbarMenu(): Promise<void> {
        await this.researchBtn.hover()
    }

    public async clickLoginLink(): Promise<void> {
        await this.loginLnk.click()
    }

    //Section for functions checking visibility of elements on page
    public async checkNavbarElementsVisibility(): Promise<void> {
        await expect(await this.isLogoVisible()).toBeTruthy()
        await expect(await this.isBuyButtonVisible()).toBeTruthy()
        await expect(await this.isSellButtonVisible()).toBeTruthy()
        await expect(await this.isFinanceButtonVisible()).toBeTruthy()
        await expect(await this.isResearchButtonVisible()).toBeTruthy()
        await expect(await this.isNotificationIconVisible()).toBeTruthy()
        await expect(await this.isSavedCarsAndSearchesButtonVisible()).toBeTruthy()
        await expect(await this.isLoginLinkVisible()).toBeTruthy()
    }
}
