const timeout = 15000

// Customiser une adresse
describe("Link option anonymous", () => {
    let page

    // Vérifier que le bouton <Link Option> affiche une page d'options
    test('Link option anonymous open', async () => {

        // on se connecte sur le site
        await page.goto('http://polr.campus-grenoble.fr')
        // on attend que le bouton <Link Option> soit chargé
        await page.waitForSelector('#show-link-options')
        // on clique sur le bouton <Link Option>
        await page.$eval('#show-link-options', el => el.click());
        // on attend que l'accordéon des options soit chargé + time pour l'animation accordéon
        await page.waitForSelector('#options', {visible: true} )
        await page.waitFor(2000)
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/link-option-test/link-options-open.png' })
        // on récupere la valeur du champs "h2"
        const html = await page.$eval('#options h2', e => e.innerHTML)
        // on vérifier que dans cet élément on trouve "Customize link"
        expect(html).toContain("polr.campus-grenoble.fr/")
               
    }, timeout)

    // vérification que le message "available" s'affiche
    test('Link option anonymous close', async () => {

        // on se connecte sur le site et on ouvre les options
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click());
        await page.waitForSelector('#options')
        await page.waitFor(2000)
        // on saisi une extention dans le champs
        await page.type('.custom-link-text input[name=custom-ending]', 'VERO');
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/link-option-test/link-options-vero.png' })
        // on clique sur le bouton <check-link-availability>
        await page.$eval('#check-link-availability', el => el.click());
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/link-option-test/link-options-vero1.png' })
        // on récupere la valeur du champs "span"
        const html = await page.$eval('#options span', e => e.innerHTML)
        // on verifie que le texte est bien "available"
        expect(html).toContain('Available')

    }, timeout)

    // vérification que l'adresse est bien customisée
    test('Link option anonymous close', async () => {

        // on se connecte sur le site et on ouvre les options
        await page.goto('http://polr.campus-grenoble.fr')
        // on rentre une adresse longue
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://zxing.org/w/decode.jspx');
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click());
        await page.waitForSelector('#options')
        await page.waitFor(2000)
        // on saisi une extention dans le champs
        await page.type('.custom-link-text input[name=custom-ending]', 'VERO6');
        await page.$eval('#shorten', el => el.click());
        // on prend une capture d'écran
        await page.screenshot({ path: './tests/img/link-option-test/link-options-shorten1.png' })
        const val = await page.$eval('#short_url', el => el.value)
        // on vérifie que l'adresse courte contient l'extension VERO3
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/\VERO6/)

    }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})

