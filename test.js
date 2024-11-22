const puppeteer = require('puppeteer');

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

(async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--disable-notifications',
                '--no-sandbox'
            ]
        });

        const page = await browser.newPage();
        
        // Navigate to the login page
        await page.goto('https://bloom.labthree.org');
        
        // Wait for email and password input fields
        await page.waitForSelector('#email', { visible: true });
        await page.waitForSelector('#password', { visible: true });
        
        // Type credentials
        await page.type('#email', 'ep@labthree.org', { delay: 100 });
        await page.type('#password', '123456', { delay: 100 });

        // Click login and wait for navigation
        await Promise.all([
            page.evaluate(() => {
                const buttons = Array.from(document.querySelectorAll('button'));
                const loginButton = buttons.find(button => 
                    button.textContent.toLowerCase().includes('login') || 
                    button.textContent.toLowerCase().includes('sign in')
                );
                if (loginButton) loginButton.click();
            }),
            page.waitForNavigation({ waitUntil: 'networkidle2' })
        ]);

        // Wait a moment for the password dialog to appear
        await delay(2000);
        console.log("")
        // Press Enter to dismiss the dialog
        await page.keyboard.press('Enter');
        
        // Additional delay after dismissing dialog
        await delay(1500);

        // Now try to click the target button
        try {
            await page.evaluate(() => {
                const dayContent = document.querySelector('[id^="radix-"][id$="-content-day"]');
                if (dayContent) {
                    const buttons = Array.from(dayContent.querySelectorAll('button'));
                    const targetButton = buttons.find(button => 
                        button.classList.contains('bg-primary') && 
                        !button.classList.contains('disabled')
                    );
                    if (targetButton) {
                        targetButton.click();
                        return true;
                    }
                }
                return false;
            });
            
            console.log("Successfully clicked the button after navigation");
        } catch (clickError) {
            console.error('Failed to click button:', clickError);
            await page.screenshot({ path: 'page-state.png', fullPage: true });
            console.log('Screenshot saved as page-state.png');
        }

        // Keep the browser open
        await new Promise(() => {});
        
    } catch (error) {
        console.error('An error occurred:', error);
        try {
            await page.screenshot({ path: 'error-screenshot.png' });
            console.log('Error screenshot saved as error-screenshot.png');
        } catch (screenshotError) {
            console.error('Failed to save error screenshot:', screenshotError);
        }
    }
})();