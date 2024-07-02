import { Page } from '@playwright/test'
import { Application } from '../../app'

export class LoginSteps {
    readonly page: Page
    readonly app: Application

    constructor(page: Page, app: Application) {
        this.page = page
        this.app = app
    }
    
    public async login(username: string, password: string): Promise<void> {
        await this.app.loginPage.fillUsernameField(username)
        await this.app.loginPage.fillPasswordField(password)
        await this.app.loginPage.clickLoginButton()
    }
}
