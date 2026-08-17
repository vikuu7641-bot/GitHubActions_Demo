import type {
    Download,
    FileChooser,
    Frame,
    FrameLocator,
    Locator,
    Page,
} from "playwright";

export class genericMethod {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async hitURL(URL: string) {
        await this.page.goto(URL, { waitUntil: 'domcontentloaded' });
    }

    async Title(): Promise<string> {
        return await this.page.title();
    }

    URL(): string {
        return this.page.url();
    }

    async Back() {
        await this.page.goBack();
    }

    async Forward() {
        await this.page.goForward();
    }

    async Reload() {
        await this.page.reload();
    }

    async Close() {
        await this.page.close();
    }

    async Click(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.click();
    }

    async Fill(element: Locator, value: string) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.fill(value);
    }

    async Type(element: Locator, value: string) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.pressSequentially(value);
    }

    async Clear(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.clear();
    }

    async Check(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.check();
    }

    async Uncheck(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.uncheck();
    }

    async Hover(element: Locator) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.hover();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollToElement(element: Locator): Promise<void> {
        await element.scrollIntoViewIfNeeded();
    }

    async press(element: Locator, keyword: string) {
        await element.press(keyword);
    }

    async pressEnter(element: Locator) {
        await element.press('Enter');
    }

    async pressTab(element: Locator) {
        await element.press('Tab');
    }

    async Count(element: Locator): Promise<number> {
        return await element.count();
    }

    async getAttribute(element: Locator, attributeName: string): Promise<string | null> {
        return await element.getAttribute(attributeName);
    }

    async InnerText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    async TextContent(element: Locator): Promise<string | null> {
        return await element.textContent();
    }

    async InputValue(element: Locator): Promise<string> {
        return await element.inputValue();
    }

    async dropdownSelectByLabel(element: Locator, option: string) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.selectOption({ label: option });
    }

    async dropdownSelectByIndex(element: Locator, dropdownIndex: number) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.selectOption({ index: dropdownIndex });
    }

    async dropdownSelectByValue(element: Locator, optionValue: string) {
        await element.waitFor({ state: 'visible', timeout: 15000 });
        await element.selectOption({ value: optionValue });
    }

    async getAllElementFromDropdown(element: Locator): Promise<string[]> {
        return await element.allTextContents();
    }

    async FirstIndex(element: Locator): Promise<Locator> {
        return element.first();
    }

    async LastIndex(element: Locator): Promise<Locator> {
        return element.last();
    }

    async NTH(element: Locator, index: number): Promise<Locator> {
        return element.nth(index);
    }

    async takeElementScreenshot(element: Locator, path: string) {
        await element.screenshot({ path: path });
    }

    async fullPageScreenshot(path: string) {
        await this.page.screenshot({ path: path, fullPage: true });
    }

    async switchToNewWindowByIndex(index: number): Promise<Page> {
        const pages: Page[] = this.page.context().pages();
        const nextPage: Page = pages[index]!;
        return nextPage;
    }

    async switchToWindowByURL(URL_Parts: string): Promise<Page> {
        const pages: Page[] = this.page.context().pages();
        for (const p of pages) {
            if (p.url().includes(URL_Parts)) {
                await p.bringToFront();
                return p;
            }
        }
        throw new Error('Page not found');
    }

    async switchToWindowByTitle(Title_Parts: string): Promise<Page> {
        const allPages: Page[] = this.page.context().pages();
        for (const p of allPages) {
            if (p.title().includes(Title_Parts)) {
                await p.bringToFront();
                return p;
            }
        }
        throw new Error('Page not found');
    }

    async switchToWindowByText(Text_Parts: string): Promise<Page> {
        const allPages: Page[] = this.page.context().pages();
        for (const p of allPages) {
            if ((await p.locator('body').innerText()).includes(Text_Parts)) {
                await p.bringToFront();
                return p;
            }
        }
        throw new Error('Page not found');
    }

    async getFrameLocator(page: Page, frame: string): Promise<FrameLocator> {
        return page.frameLocator(frame);
    }

    async getFrameByName(page: Page, frameName: string): Promise<Frame | null> {
        return page.frame({ name: frameName });
    }

    async uploadFile(element: Locator, filePath: string) {
        await element.setInputFiles(filePath);
    }

    async uploadMultipleFiles(element: Locator, filePath: string[]) {
        await element.setInputFiles(filePath);
    }

    async removeUploadFile(element: Locator, filePath: string) {
        await element.setInputFiles(filePath);
    }

    async clickAndUpload(element: Locator, filePath: string) {
        const fileChooserPromise: Promise<FileChooser> = this.page.waitForEvent('filechooser');
        await element.click();
        const fileChooser: FileChooser = await fileChooserPromise;
        await fileChooser.setFiles(filePath);
    }

    async clickAndSave(element: Locator, filePath: string) {
        const fileChooserPromise: Promise<Download> = this.page.waitForEvent('download');
        await element.click();
        const fileChooser: Download = await fileChooserPromise;
        await fileChooser.saveAs(filePath);
    }
}