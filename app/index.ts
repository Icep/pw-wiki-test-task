import { PageHolder } from './abstractClasses'
import { NavBar } from './component/navbar.component'
import { mainMenuComponent } from './component/main-menu.component'
import { MainPage } from './page/main.page'
import { LoginPage } from './page/login.page'
import { SearchResultPage } from './page/search-result.page'
import { BuyPage } from './page/buy.page'
import { SellPage } from './page/sell.page'
import { FinancePage } from './page/finance.page'
import { ResearchPage } from './page/research.page'
import { LoginSteps } from './steps/login.steps'
import { NotFound } from './page/not-found.page'
import { Page } from '@playwright/test'

export class Application extends PageHolder {
    public navbar: NavBar = new NavBar(this.page)
    public mainPage: MainPage = new MainPage(this.page)
    public mainMenu: mainMenuComponent = new mainMenuComponent(this.page)
    public buyPage: BuyPage = new BuyPage(this.page)
    public sellPage: SellPage = new SellPage(this.page)
    public financePage: FinancePage = new FinancePage(this.page)
    public researchPage: ResearchPage = new ResearchPage(this.page)
    public searchResultPage: SearchResultPage = new SearchResultPage(this.page)
    public loginPage: LoginPage = new LoginPage(this.page)
    public notFoundPage: NotFound = new NotFound(this.page)

    public loginSteps: LoginSteps = new LoginSteps(this.page, this)
}
