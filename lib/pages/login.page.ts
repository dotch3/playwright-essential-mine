// import
import { Locator, Page } from "@playwright/test"

// export class
export class LoginPage{  
  //attributes
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  
  // constructor
  constructor(page:Page){
    this.page= page
    this.emailInput = page.getByTestId('email')
    this.passwordInput = page.getByTestId('password')
    this.loginButton = page.getByTestId('login-submit')
  }
}
  
  //actions

