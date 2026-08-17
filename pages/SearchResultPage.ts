import { Locator, Page } from '@playwright/test';
import { genericMethod } from './BasePage';

export class SearchResultPage extends genericMethod {
    private productCard: Locator;

    constructor(page: Page) {
        super(page);
        this.productCard = page.locator('div[data-component-type="s-search-result"] h2 a, div[data-component-type="s-search-result"] a[href*="/dp/"]');
    }

    async clickOnFirstProduct() {
        const firstProduct = this.productCard.first();
        await firstProduct.waitFor({ state: 'visible', timeout: 20000 });
        await firstProduct.click();
    }

    async selectProductFromSearchResult() {
        await this.clickOnFirstProduct();
    }
}