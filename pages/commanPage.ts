import type { Locator, Page } from "playwright";
import { genericMethod } from './BasePage';

export class commanPage extends genericMethod {
    signIn: Locator;
    email: Locator;
    continueButton: Locator;
    password: Locator;
    signInButton: Locator;
    addToCart: Locator;

    constructor(page: Page) {
        super(page);

        this.signIn = page.locator('a[href*="/gp/css/homepage.html"]').first();
        this.email = page.locator('#ap_email_login, input[name="email"]');
        this.continueButton = page.locator('#continue');
        this.password = page.locator('#ap_password, input[name="password"]');
        this.signInButton = page.locator('#signInSubmit');
        this.addToCart = page.locator('#nav-cart-count-container, a[href*="/gp/cart"]');
    }

    async clickOnSignIn() {
        await this.Click(this.signIn);
    }

    async enterEmail(emailValue: string) {
        await this.Fill(this.email, emailValue);
    }

    async clickOnContinue() {
        await this.Click(this.continueButton);
    }

    async enterPassword(passwordValue: string) {
        await this.Fill(this.password, passwordValue);
    }

    async clickOnSignInButton() {
        await this.Click(this.signInButton);
    }

    async clickOnAddToCart() {
        await this.Click(this.addToCart);
    }
}