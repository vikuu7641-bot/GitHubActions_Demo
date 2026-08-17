import { Locator, Page } from '@playwright/test';
import { genericMethod } from './BasePage';

export class CheckoutPage extends genericMethod {
    private addAddressLink: Locator;
    private fullName: Locator;
    private phoneNumber: Locator;
    private streetAddress: Locator;
    private city: Locator;
    private state: Locator;
    private zipCode: Locator;
    private country: Locator;

    constructor(page: Page) {
        super(page);
        this.addAddressLink = page.locator('a:has-text("Add a new delivery address"), a:has-text("Add a new address")');
        this.fullName = page.locator('#address-ui-widgets-enterAddressFullName');
        this.phoneNumber = page.locator('#address-ui-widgets-enterAddressPhoneNumber');
        this.streetAddress = page.locator('#address-ui-widgets-enterAddressLine1');
        this.city = page.locator('#address-ui-widgets-enterAddressCity');
        this.state = page.locator('#address-ui-widgets-enterAddressStateOrRegion');
        this.zipCode = page.locator('#address-ui-widgets-enterAddressPostalCode');
        this.country = page.locator('select[name="address-ui-widgets-countryCode"]');
    }

    async clickOnAddNewDeliveryAddress() {
        const link = this.addAddressLink.first();
        if (await link.count()) {
            await this.Click(link);
        }
    }

    async selectCountry(countryName: string) {
        if (await this.country.count()) {
            await this.dropdownSelectByLabel(this.country, countryName);
        }
    }

    async enterName(name: string) {
        if (await this.fullName.count()) {
            await this.Fill(this.fullName, name);
        }
    }

    async enterPhoneNumber(number: string) {
        if (await this.phoneNumber.count()) {
            await this.Fill(this.phoneNumber, number);
        }
    }

    async enterStreetAddress(street: string) {
        if (await this.streetAddress.count()) {
            await this.Fill(this.streetAddress, street);
        }
    }

    async enterCity(cityName: string) {
        if (await this.city.count()) {
            await this.Fill(this.city, cityName);
        }
    }

    async enterState(stateName: string) {
        if (await this.state.count()) {
            await this.Fill(this.state, stateName);
        }
    }

    async enterZIPCode(zipCode: string) {
        if (await this.zipCode.count()) {
            await this.Fill(this.zipCode, zipCode);
        }
    }

    async ensureFinalReviewReached() {
        const targetSignals = [
            this.page.getByText(/order review|review your order|confirm your order/i),
            this.page.getByText(/shipping address|delivery address/i),
            this.page.getByText(/verify your order/i),
        ];

        for (const signal of targetSignals) {
            const visible = await signal.isVisible().catch(() => false);
            if (visible) {
                return;
            }
        }

        const securityPromptVisible = await this.page.getByText(/captcha|verify it\'s you|sign in|continue shopping/i).first().isVisible().catch(() => false);
        if (securityPromptVisible) {
            throw new Error('Amazon security prompt encountered before final review step. Test stopped to avoid bypassing CAPTCHA or OTP.');
        }
    }
}