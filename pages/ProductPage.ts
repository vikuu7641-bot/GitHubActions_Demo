import { Locator, Page } from '@playwright/test';
import { genericMethod } from './BasePage';

export class ProductPage extends genericMethod {
    private addToCartButton: Locator;
    private productPrice: Locator;
    private productTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.addToCartButton = page.locator('#add-to-cart-button, input[name="submit.add-to-cart"]');
        this.productPrice = page.locator('#corePriceDisplay_desktop_feature_div .a-price .a-offscreen, #corePrice_feature_div .a-price .a-offscreen, .a-price .a-offscreen').first();
        this.productTitle = page.locator('#productTitle');
    }

    async addProductToCart() {
        await this.Click(this.addToCartButton);
    }

    async addToCart() {
        await this.addProductToCart();
    }

    async getProductTitle(): Promise<string> {
        return (await this.productTitle.first().innerText()).trim();
    }

    async getProductPrice(): Promise<string> {
        return (await this.productPrice.innerText()).trim();
    }
}