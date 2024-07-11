import { Locator, Page, expect } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class NotFound extends AppPage {
    public pagePath = '/'
    readonly page404Text: Locator = this.page.locator('#page404')

    public async expectLoaded(message = 'Expected Main page to be loaded'): Promise<void> {
        await expect(this.page404Text, message).toBeVisible()
    }

    //Section for clicking elements


    //Section for check visibility
    @step()
    public async is404PageVisible(): Promise<boolean> {
        return await this.page404Text.isVisible()
    }

    //Section for assertions and checks

    @step()
    public async check404PageIsVisible(): Promise<void> {
        await expect(await this.is404PageVisible()).toBeTruthy()
    }
}
