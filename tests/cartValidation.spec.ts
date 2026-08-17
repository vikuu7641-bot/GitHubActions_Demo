import { test } from '../pages/fixture/fixture';
import * as testData from '../TestData/testData.json';
import * as commanData from '../TestData/commanData.json';

let getProductPrice: string;

test('Amazon Cart Quantity and Remove Validation', async ({ page, genericMethod, homePageObj, searchResultPageObj, productPageObj, cartPageObj, commanPageObj }) => {
    
    // Navigate to login page and sign in
    await genericMethod.hitURL("https://www.amazon.com/");
    await page.waitForLoadState('networkidle');
    await commanPageObj.enterEmail(commanData.Authentication.email);
    await commanPageObj.clickOnContinue();
    await page.waitForTimeout(2000);
    await commanPageObj.enterPassword(commanData.Authentication.password);
    await commanPageObj.clickOnSignInButton();
    await page.waitForTimeout(3000);

    // Navigate to home page and search
    await genericMethod.hitURL("https://www.amazon.com/");
    await homePageObj.searchProduct(testData.productDetail.productName);  
    await searchResultPageObj.selectProductFromSearchResult();
    await productPageObj.addToCart();
    getProductPrice = await productPageObj.getProductPrice();
    await cartPageObj.validateProductPrice(getProductPrice);
    
    await cartPageObj.removeProductFromCart();
    await cartPageObj.validateCartIsEmpty();
    
});