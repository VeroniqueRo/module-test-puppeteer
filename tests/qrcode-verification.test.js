const timeout = 15000

// test de la génération d'un qr code
describe("QR code verification", () => {
    let page

    // Vérification de la présence d'une image quand on crée un QR Code
    test('QR code generate', async () => {

        // Génération d'une url courte
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://zxing.org/w/decode.jspx');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('#short_url')
        await page.screenshot({ path: './tests/img/shorturl-for-qrcode.png' });
        // Récupere la valeur du champs "short url"
        const valurl = await page.$eval('#short_url', el => el.value)
        // on attend que le bouton "Générate QR Code" soit affiché
        await page.waitForSelector('#generate-qr-code')
        await page.$eval('#generate-qr-code', el => el.click());
        // on attent que l'élément ".qr-code-container" soit chargé
        await page.waitForSelector('.qr-code-container')
        // on récupère la source de l'image générée
        const imgs = await page.$$eval('img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.goto('https://zxing.org/w/decode.jspx')
        await page.waitForSelector('#upload')
        //await page.type('input[type="text"]', imgs);
        await page.type('input[name="u"]', imgs);
        await page.screenshot({ path: './tests/img/test.png' });
        await page.$eval('#upload tr:first-child input[type=submit]', el => el.click());
        await page.waitForSelector('#result');
        const button = await page.$('form[method="get"] > input [type="submit"]');
        await button.click();
        await page.waitFor(20000);
        await page.screenshot({
            path: './tests/img/test2.png',
            fullPage: true});
      
                
        

    }, timeout)

        // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
