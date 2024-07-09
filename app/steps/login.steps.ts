import { Page } from '@playwright/test'
import { Application } from '../../app'
import { step } from '../../misc/reporters/step'
export class LoginSteps {
    readonly page: Page
    readonly app: Application

    constructor(page: Page, app: Application) {
        this.page = page
        this.app = app
    }
    
    @step()
    public async login(username: string, password: string): Promise<void> {
        await this.app.loginPage.fillUsernameField(username)
        await this.app.loginPage.clickNextButton()
        
        await this.app.loginPage.fillPasswordField(password)
        await this.app.loginPage.clickLoginButton()
    }
}
