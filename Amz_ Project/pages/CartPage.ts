import { Locator, Page, expect } from '@playwright/test';
import { genericMethod } from './BasePage';

export class CartPage extends genericMethod {
    private proceedToCheckout: Locator;
    private productName: Locator;
    private productPrice: Locator;
    private quantityInput: Locator;
    private quantitySelect: Locator;
    private removeButton: Locator;
    private emptyCartMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.proceedToCheckout = page.locator('input[name="proceedToRetailCheckout"], input[name="proceedToCheckout"]');
        this.productName = page.locator('div.sc-list-item-content a[href*="/gp/product"], .sc-product-title a, .a-truncate-full a');
        this.productPrice = page.locator('.sc-price, .a-price .a-offscreen');
        this.quantityInput = page.locator('input[name="quantity"], input[type="number"][aria-label*="quantity"]');
        this.quantitySelect = page.locator('select[name="quantity"], select[title="Quantity"]');
        this.removeButton = page.locator('input[value="Delete"], span[data-action="delete"], button:has-text("Delete")');
        this.emptyCartMessage = page.locator('text=Your Amazon Cart is empty, text=Your cart is empty');
    }

    async openCart() {
        await this.page.goto('https://www.amazon.com/cart', { waitUntil: 'domcontentloaded' });
    }

    async clickOnProceedButton() {
        await this.Click(this.proceedToCheckout);
    }

    async proceedToCheckout() {
        await this.clickOnProceedButton();
    }

    async validateProductDisplayed(productName: string) {
        const title = await this.productName.first().innerText().catch(() => '');
        expect(title.toLowerCase()).toContain(productName.toLowerCase());
    }

    async validateProductPrice(expectedPrice: string) {
        const price = await this.productPrice.first().innerText().catch(() => '');
        expect(price).toContain(expectedPrice);
    }

    async setQuantity(quantity: number) {
        const quantityInput = this.quantityInput.first();
        const quantitySelect = this.quantitySelect.first();

        if (await quantityInput.count().catch(() => 0)) {
            await quantityInput.fill(String(quantity));
            await this.page.locator('input[type="submit"][value="Update"]').click().catch(() => undefined);
            return;
        }

        if (await quantitySelect.count().catch(() => 0)) {
            await quantitySelect.selectOption({ value: String(quantity) });
        }
    }

    async verifyQuantity(expectedQuantity: number) {
        const visibleText = await this.page.locator('body').innerText();
        expect(visibleText).toContain(String(expectedQuantity));
    }

    async removeProductFromCart() {
        const removeLocator = this.removeButton.first();
        if (await removeLocator.count()) {
            await removeLocator.click();
            return;
        }
        const row = this.page.locator('div.sc-list-item-content').first();
        await row.locator('text=Delete').click().catch(() => undefined);
    }

    async validateCartIsEmpty() {
        await expect(this.emptyCartMessage).toBeVisible({ timeout: 20000 }).catch(async () => {
            await expect(this.page.locator('.sc-empty-cart')).toBeVisible({ timeout: 20000 });
        });
    }
}