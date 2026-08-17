import { Locator, Page } from '@playwright/test';
import { genericMethod } from './BasePage';

export class HomePage extends genericMethod {
    private searchBox: Locator;
    private searchButton: Locator;
    private suggestionList: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = page.locator('input[name="field-keywords"], input[id="twotabsearchtextbox"], input[role="combobox"]');
        this.searchButton = page.locator('input[value="Go"], input[id="nav-search-submit-button"]');
        this.suggestionList = page.locator('[role="option"], .s-suggestion');
    }

    async openHomePage() {
        await this.hitURL('https://www.amazon.com/');
        await this.page.waitForLoadState('domcontentloaded');
    }

    async enterProductName(product: string) {
        await this.Fill(this.searchBox, product);
    }

    async clickSearchButton() {
        await this.Click(this.searchButton);
    }

    async selectSuggestionByText(text: string) {
        const option = this.suggestionList.filter({ hasText: new RegExp(text, 'i') }).first();
        await option.waitFor({ state: 'visible', timeout: 15000 }).catch(() => undefined);
        const count = await option.count();
        if (count > 0) {
            await option.click();
            return;
        }
        await this.page.keyboard.press('Enter');
    }

    async searchProduct(productName: string) {
        await this.enterProductName(productName);
        await this.clickSearchButton();
    }
}