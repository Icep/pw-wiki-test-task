import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class LoginPage extends AppPage {
    public pagePath = '/Cars/authentication/renderRegisterLoginForm.action?redirectUrl=%2F'
    readonly userLoginForm: Locator = this.page.locator('.panelBody')
    readonly usernameInput: Locator = this.userLoginForm.locator('#registerEmail')
    readonly nextButton: Locator = this.userLoginForm.locator(`[data-cg-ft='login-next-button']`)
    readonly passwordInput: Locator = this.userLoginForm.locator('#loginPassword')
    readonly loginButton: Locator = this.userLoginForm.locator(`[data-cg-ft='login-sign-in-button']`)
    readonly loginErrorMessage: Locator = this.userLoginForm.locator('#errorMessageBox')
    readonly loginSuccessMessage: Locator = this.userLoginForm.locator('.cdx-message--success') //need to update locator after account creation

    public async expectLoaded(message = 'Expected Login page to be loaded'): Promise<void> {
        await expect(this.userLoginForm, message).toBeVisible()
        await expect(this.usernameInput, message).toBeVisible()
        await expect(this.nextButton, message).toBeVisible()
    }

    public async open(url: string): Promise<void> {
        await this.page.goto(url)
    }

    public async fillUsernameField(username: string): Promise<void> {
        await this.expectLoaded()
        await this.usernameInput.fill(username)
    }

    public async fillPasswordField(password: string): Promise<void> {
        await this.expectLoaded()
        await this.passwordInput.fill(password)
    }

    public async clickNextButton(): Promise<void> {
        await this.nextButton.click()
    }

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }

    public async expectErrorMessageToBeVisible(): Promise<void> {
        await expect(this.loginErrorMessage).toBeVisible()
    }

    public async expectErrorMessageTextToBe(text: string): Promise<void> {
        await expect(this.loginErrorMessage).toHaveText(text)
    }

    public async expectSuccessMessageToBeVisible(): Promise<void> {
        await expect(this.loginSuccessMessage).toBeVisible()
    }

    public async expectSuccessMessageTextToBe(text: string): Promise<void> {
        await expect(this.loginSuccessMessage).toHaveText(text)
    }
}
