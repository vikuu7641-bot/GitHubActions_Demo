import { test as base } from "playwright/test";
import { genericMethod } from '../BasePage';
import { SearchResultPage } from '../SearchResultPage';
import { HomePage } from '../HomePage';
import { CartPage } from '../CartPage';
import { commanPage } from '../commanPage';
import { ProductPage } from '../ProductPage';
import { CheckoutPage } from '../CheckoutPage';

type myFixture = {
    genericMethod: genericMethod;
    searchResultPageObj: SearchResultPage;
    homePageObj: HomePage;
    cartPageObj: CartPage;
    commanPageObj: commanPage;
    productPageObj: ProductPage;
    checkoutPageObj: CheckoutPage;
};

export const test = base.extend<myFixture>({
    genericMethod: async ({ page }, use) => {
        const gm = new genericMethod(page);
        await use(gm);
    },

    searchResultPageObj: async ({ page }, use) => {
        const srp = new SearchResultPage(page);
        await use(srp);
    },

    homePageObj: async ({ page }, use) => {
        const home = new HomePage(page);
        await use(home);
    },

    cartPageObj: async ({ page }, use) => {
        const cartpage = new CartPage(page);
        await use(cartpage);
    },

    commanPageObj: async ({ page }, use) => {
        const commonPage = new commanPage(page);
        await use(commonPage);
    },

    productPageObj: async ({ page }, use) => {
        const product = new ProductPage(page);
        await use(product);
    },

    checkoutPageObj: async ({ page }, use) => {
        const checkout = new CheckoutPage(page);
        await use(checkout);
    }
});

