import { expect, Locator, Page } from '@playwright/test'
import { AppPage } from '../abstractClasses'

export class LoginPage extends AppPage {
    public pagePath = '/w/index.php?search'
    readonly userLoginForm: Locator = this.page.locator('#userloginForm')
    readonly usernameInput: Locator = this.userLoginForm.locator('#wpName1')
    readonly passwordInput: Locator = this.userLoginForm.locator('#wpPassword1')
    readonly loginButton: Locator = this.userLoginForm.locator('#wpLoginAttempt')
    readonly loginErrorMessage: Locator = this.userLoginForm.locator('.cdx-message--error')
    readonly loginSuccessMessage: Locator = this.userLoginForm.locator('.cdx-message--success') //need to update locator after account creation

    public async expectLoaded(message = 'Expected Login page to be loaded'): Promise<void> {
        await expect(this.userLoginForm, message).toBeVisible()
        await expect(this.usernameInput, message).toBeVisible()
        await expect(this.passwordInput, message).toBeVisible()
        await expect(this.loginButton, message).toBeVisible()
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

    public async clickLoginButton(): Promise<void> {
        await this.loginButton.click()
    }

    public async login(username: string, password: string): Promise<void> {
        await this.fillUsernameField(username)
        await this.fillPasswordField(password)
        await this.clickLoginButton()
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
