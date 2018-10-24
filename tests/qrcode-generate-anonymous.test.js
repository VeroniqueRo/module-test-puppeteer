const timeout = 15000

// test de la génération d'un qr code
describe("QR code generate", () => {
    let page

    // Vérification de la présence d'une image quand on crée un QR Code
    test('basic qrcode generate', async () => {

        // Génération d'une url courte
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://www.google.com/search?source=hp&ei=QQbPW52GC9CRlwSHw46oAg&q=puppeteer+jest&oq=puppeteer+jest&gs_l=psy-ab.3...2441.6095.0.6926.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.psy-ab..0.0.0....0.qKd5wLlrTYk');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('#short_url')
        await page.screenshot({ path: './tests/img/shorturl-for-qrcode.png' });
        // on attend que le bouton "Générate QR Code" soit affiché
        await page.waitForSelector('#generate-qr-code')
        await page.$eval('#generate-qr-code', el => el.click());
        // on attent que l'élément ".qr-code-container" soit chargé
        await page.waitForSelector('.qr-code-container')
        // on récupère le code HTML
        const html = await page.$eval('.qr-code-container', e => e.innerHTML)
        // fait une capture d'écran de la page contenant le QR Code
        await page.screenshot({ path: './tests/img/img.png' });
        // on vérifie qu'il contient une image
        expect(html).toContain('img')

    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
