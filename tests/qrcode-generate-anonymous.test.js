const timeout = 15000

// test de la page de génération d'un qr code
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

    // Vérification du retour vers la page d'accueil
    test('basic qrcode generate + home return', async () => {

        // Génération d'une url courte
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://www.google.com/search?source=hp&ei=QQbPW52GC9CRlwSHw46oAg&q=puppeteer+jest&oq=puppeteer+jest&gs_l=psy-ab.3...2441.6095.0.6926.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.psy-ab..0.0.0....0.qKd5wLlrTYk');
        await page.$eval('#shorten', el => el.click());
        await page.waitForSelector('#short_url')
        await page.screenshot({ path: './tests/img/shorturl-for-qrcode.png' });
        // on attend que le bouton "Générate QR Code" soit affiché
        await page.waitForSelector('#generate-qr-code')
        await page.$eval('#generate-qr-code', el => el.click());
        // on attent que l'élément ".qr-code-container" soit chargé
        await page.waitForSelector('.btn-info')
        // cliquer sur le bouton "Shorten nother"
        await page.$eval('.btn-info', el => el.click());
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body')
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML)
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({ path: './tests/img/basic-home-return.png' });
        expect(html).toContain("Polr du campus")

    }, timeout)

    // Vérification que le champs de saisie est bien vide
    test('basic qrcode generate + home return + blankfield', async () => {

        // Génération d'une url courte
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://www.google.com/search?source=hp&ei=QQbPW52GC9CRlwSHw46oAg&q=puppeteer+jest&oq=puppeteer+jest&gs_l=psy-ab.3...2441.6095.0.6926.0.0.0.0.0.0.0.0..0.0....0...1c.1.64.psy-ab..0.0.0....0.qKd5wLlrTYk');
        await page.$eval('#shorten', el => el.click());
        await page.waitForSelector('#short_url')
        await page.screenshot({ path: './tests/img/shorturl-for-qrcode.png' });
        // on attend que le bouton "Générate QR Code" soit affiché
        await page.waitForSelector('#generate-qr-code')
        await page.$eval('#generate-qr-code', el => el.click());
        // on attent que l'élément ".qr-code-container" soit chargé
        await page.waitForSelector('.btn-info')
        // cliquer sur le bouton "Shorten nother"
        await page.$eval('.btn-info', el => el.click());
        // On attend que l'élément <long-link-input> soit chargé
        await page.waitForSelector('.long-link-input')
        // On récupère le contenu de l'élément <long-link-input>
        const html = await page.$eval('.long-link-input', e => e.innerHTML)
        // On vérifie que le champs de saisie est vide
        await page.screenshot({ path: './tests/img/basic-home-return.png' });
        expect(html).value = "";

    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
