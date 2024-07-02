import { PageHolder } from './abstractClasses'
import { NavBar } from './component/navbar.component'
import { mainMenuComponent } from './component/main-menu.component'
import { MainPage } from './page/main.page'
import { ArticlePage } from './page/article.page'
import { SearchResultPage } from './page/search-result.page'
import { LoginPage } from './page/login-page.page'
import { LoginSteps } from './steps/login.steps'
import { Page } from '@playwright/test'

export class Application extends PageHolder {
    public navbar: NavBar = new NavBar(this.page)
    public mainPage: MainPage = new MainPage(this.page)
    public mainMenu: mainMenuComponent = new mainMenuComponent(this.page)
    public articlePage: ArticlePage = new ArticlePage(this.page)
    public searchResultPage: SearchResultPage = new SearchResultPage(this.page)
    public loginPage: LoginPage = new LoginPage(this.page)

    public loginSteps: LoginSteps = new LoginSteps(this.page, this)
}
