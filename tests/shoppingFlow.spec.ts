import { test } from '../pages/fixture/fixture';
import * as testData from '../TestData/testData.json';
import * as commanData from '../TestData/commanData.json';

let getProductPrice: string;

test("Scenario 1 : testCase", async ({ page, genericMethod, searchResultPageObj, homePageObj, cartPageObj, commanPageObj, productPageObj, checkoutPageObj }) => {
    
    // Navigate to login page and sign in
    await genericMethod.hitURL("https://www.amazon.com/");
    await page.waitForLoadState('networkidle');
    await commanPageObj.enterEmail(commanData.Authentication.email);
    await commanPageObj.clickOnContinue();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    await commanPageObj.enterPassword(commanData.Authentication.password);
    await commanPageObj.clickOnSignInButton();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Navigate to home page and search
    await genericMethod.hitURL("https://www.amazon.com/");
    await homePageObj.searchProduct(testData.productDetail.productName);
    await searchResultPageObj.selectProductFromSearchResult();
    getProductPrice = await productPageObj.getProductPrice();
    await productPageObj.addToCart();
    await cartPageObj.validateProductPrice(getProductPrice);
    await cartPageObj.validateProductQuantity(testData.productDetail.productQuantity);
});