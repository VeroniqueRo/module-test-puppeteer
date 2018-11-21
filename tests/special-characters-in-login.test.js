const timeout = 15000
const connectUrl = 'http://localhost:8000/' //http://polr.campus-grenoble.fr

// test d'un raccourcisseur d'URL
describe("Special characters in login", () => {
    let page

    // vérification d'une inscription avec login ayant un caractère spécial
    test('register with special login', async () => {
        await page.goto(connectUrl)
        await page.waitForSelector('#navbar li a')
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '#navbar li a' ) )
                .filter( el => el.textContent === 'Sign Up' )[0].click();
        });
        // on attent que l'élément ".content-div" soit chargé
        await page.waitForSelector('.content-div')
        // on saisit les données dans le formulaire Register
        await page.type('form[action="/signup"] input[name="username"]',"Vero1%")
        await page.type('form[action="/signup"] input[name="password"]',"test")
        await page.type('form[action="/signup"] input[name="email"]',"test@orange1.fr")
        await page.screenshot({ path: './tests/img/special-characters-in-login/sign-up-input1.png' });
        // on clique sur le bouton pour s'enregistrer
        await page.$eval('.btn-default', el => el.click());
        await page.screenshot({ path: './tests/img/special-characters-in-login/sign-up-input2.png' });
        // await page.goto('http://polr.campus-grenoble.fr/admin#admin')
        // //on tape un texte dans la barre de recherche avec un delai de réponse
        // await page.type('#admin_users_table_filter input[type = "search"]', "Vero1%", {delay:50})
        // const btndelete = await page.$eval('#admin_users_table tr td a.btn-danger', e => e.innerHTML)
        // // on vérifie qu'il contient la bonne chaîne de caractères
        // expect(btndelete).toContain("Delete")
        //on clique sur le bouton
        //await page.$eval('#admin_users_table tr td a.btn-danger', el => el.click());    }, timeout)
        // on attent que l'élément ".form-control" soit chargé
        await page.waitForSelector('.content-div')
        // on saisit les données dans le formulaire Register
        await page.type('form[action="login"] input[name="username"]',"Vero1%")
        await page.type('form[action="login"] input[name="password"]',"test")
        // on clique sur le bouton pour s'enregistrer
        await page.$eval('.form-control', el => el.click());
        await page.screenshot({ path: './tests/img/special-characters-in-login/sign-in-input3.png' });
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body',{delay:50})
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML)
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/special-characters-in-login/basic-home.png'});
        expect(html).toContain("Polr dev")

    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
