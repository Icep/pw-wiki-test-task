import { PageHolder } from './abstractClasses'
import { NavBar } from './component/navbar.component'
import { mainMenuComponent } from './component/main-menu.component'
import { MainPage } from './page/main.page'
import { ArticlePage } from './page/article.page'
import { SearchResultPage } from './page/search-result.page'
import { LoginPage } from './page/login-page.page'

export class Application extends PageHolder {
    public navbar = new NavBar(this.page)
    public mainPage = new MainPage(this.page)
    public mainMenu = new mainMenuComponent(this.page)
    public articlePage = new ArticlePage(this.page)
    public searchResultPage = new SearchResultPage(this.page)
    public loginPage = new LoginPage(this.page)
}
