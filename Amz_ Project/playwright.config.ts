import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    timeout: 90_000,
    expect: {
        timeout: 15_000,
    },
    reporter: [
        ['list'],
        ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ],
    use: {
        baseURL: 'https://www.amazon.com/',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 15_000,
        navigationTimeout: 30_000,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 800 },
        locale: 'en-IN',
        timezoneId: 'Asia/Kolkata',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
});