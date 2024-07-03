import { Locator, Page, expect } from '@playwright/test'
import { AppPage } from '../abstractClasses'
import { step } from '../../misc/reporters/step'

export class MainPage extends AppPage {
    public pagePath = '/'
    readonly featuredArticleTitle: Locator = this.page.locator('.MainPageBG #mp-tfa-h2')
    readonly featuredArticleContent: Locator = this.page.locator('.MainPageBG #mp-tfa')
    readonly inTheNewsTitle: Locator = this.page.locator('#In_the_news')
    readonly inTheNewsContent: Locator = this.page.locator('#mp-itn')
    readonly didYouKnowTitle: Locator = this.page.locator('#mp-dyk-h2')
    readonly didYouKnowContent: Locator = this.page.locator('#mp-dyk')
    readonly featuredPictureTitle: Locator = this.page.locator('#mp-tfp-h2')
    readonly featuredPictureContent: Locator = this.page.locator('#mp-tfp')
    readonly onThisDayTitle: Locator = this.page.locator('#On_this_day')
    readonly onThisDayContent: Locator = this.page.locator('#mp-right #mp-otd')
    readonly noArticleText: Locator = this.page.locator('#noarticletext')
    readonly mediaWikiLink: Locator = this.page.locator('[title="mw:"]')

    public async expectLoaded(message = 'Expected Main page to be loaded'): Promise<void> {
        await expect(this.featuredArticleTitle, message).toBeVisible()
        await expect(this.featuredArticleContent, message).toBeVisible()
        await expect(this.inTheNewsTitle, message).toBeVisible()
        await expect(this.inTheNewsContent, message).toBeVisible()
        await expect(this.didYouKnowTitle, message).toBeVisible()
        await expect(this.didYouKnowContent, message).toBeVisible()
        await expect(this.featuredPictureTitle, message).toBeVisible()
        await expect(this.featuredPictureContent, message).toBeVisible()
        await expect(this.onThisDayTitle, message).toBeVisible()
        await expect(this.onThisDayContent, message).toBeVisible()
    }

    public async open(url: string): Promise<void> {
        await this.page.goto(url)
    }

    //Section for clicking elements
    @step()
    public async clickRandomInternalLink(): Promise<void> {
        let randomInternalLink = this.page.locator('p a[href*="wiki"]').nth(Math.floor(Math.random() * 10))
        await randomInternalLink.click()
    }

    @step()
    public async clickOpenFullFeaturedArticle(): Promise<void> {
        await this.featuredArticleContent.locator('a').filter({ hasText: `Full article...` }).click()
    }

    @step()
    public async clickMediaWikiLink(): Promise<void> {
        await this.mediaWikiLink.click()
    }

    //Section for getting elements text content
    public async getInTheNewsText(): Promise<string> {
        return (await this.inTheNewsContent.textContent()) ?? ''
    }

    public async getFeaturedArticleText(): Promise<string> {
        return (await this.featuredArticleContent.textContent()) ?? ''
    }

    public async getDidYouKnowText(): Promise<string> {
        return (await this.didYouKnowContent.textContent()) ?? ''
    }

    public async getFeaturedPictureText(): Promise<string> {
        return (await this.featuredPictureTitle.textContent()) ?? ''
    }

    public async getOnThisDayText(): Promise<string> {
        return (await this.onThisDayContent.textContent()) ?? ''
    }

    //Section for checking visibility of elements
    public async isOnThisDayTitleVisible(): Promise<boolean> {
        return await this.onThisDayTitle.isVisible()
    }

    public async isFeaturedArticleTitleVisible(): Promise<boolean> {
        return await this.featuredArticleTitle.isVisible()
    }

    public async isDidYouKnowTitleVisible(): Promise<boolean> {
        return await this.didYouKnowTitle.isVisible()
    }

    public async isFeaturedArticleVisible(): Promise<boolean> {
        return await this.featuredArticleContent.isVisible()
    }

    public async isInTheNewsTitleVisible(): Promise<boolean> {
        return await this.inTheNewsTitle.isVisible()
    }

    public async isInTheNewsVisible(): Promise<boolean> {
        return await this.inTheNewsContent.isVisible()
    }

    public async isDidYouKnowVisible(): Promise<boolean> {
        return await this.didYouKnowContent.isVisible()
    }

    public async isFeaturedPictureVisible(): Promise<boolean> {
        return await this.featuredPictureTitle.isVisible()
    }

    public async isOnThisDayVisible(): Promise<boolean> {
        return await this.onThisDayContent.isVisible()
    }

    public async isNoArticleTextVisible(): Promise<boolean> {
        return await this.noArticleText.isVisible()
    }

    //Section for assertions and checks
    @step()
    public async checkMainPageElementsVisibility(): Promise<void> {
        await expect(await this.isFeaturedArticleTitleVisible()).toBeTruthy()
        await expect(await this.isFeaturedArticleVisible()).toBeTruthy()
        await expect(await this.isInTheNewsTitleVisible()).toBeTruthy()
        await expect(await this.isInTheNewsVisible()).toBeTruthy()
        await expect(await this.isDidYouKnowTitleVisible()).toBeTruthy()
        await expect(await this.isDidYouKnowVisible()).toBeTruthy()
        await expect(await this.isFeaturedPictureVisible()).toBeTruthy()
        await expect(await this.isOnThisDayTitleVisible()).toBeTruthy()
        await expect(await this.isOnThisDayVisible()).toBeTruthy()
    }

    @step()
    public async checkElementsTextNotEmpty(): Promise<void> {
        await expect(await this.getFeaturedArticleText()).not.toBe('')
        await expect(await this.getInTheNewsText()).not.toBe('')
        await expect(await this.getDidYouKnowText()).not.toBe('')
        await expect(await this.getFeaturedPictureText()).not.toBe('')
        await expect(await this.getOnThisDayText()).not.toBe('')
    }

    @step()
    public async checkNoArticleTextIsVisible(): Promise<void> {
        await expect(await this.isNoArticleTextVisible()).toBeTruthy()
    }

    @step()
    public async checkDidYouKnowSectionVisibility(): Promise<void> {
        await expect(await this.isDidYouKnowTitleVisible()).toBeTruthy()
        await expect(await this.isDidYouKnowVisible()).toBeTruthy()
    }

    @step()
    public async checkDidYouKnowSectionTextNotEmpty(): Promise<void> {
        await expect(await this.getDidYouKnowText()).not.toBe('')
    }
}
