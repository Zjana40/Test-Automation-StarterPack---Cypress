describe('Wait for a response: Search & Result page', () => {
    it('TOGETHER: repeat waiting for response at search page destination modal', () => {
        cy.setCookie('__kwc_agreed', 'true')//odkliklnem nam suhlas  Cookies hned pri otvarani stranky
        cy.intercept("**/graphql?featureName=UmbrellaPlacesQuery**")//hviezdicky na konci znamenaju ze nasledovat moze whatever
          .as("locations")
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]')
            .type('Tokyo')
            //pockame na to kym na stranka vrati ponuku pre nas vyber mesta
            cy.wait("@locations")// to znamena ze zobrazilo vysledky pre zadane mesto
    })

    it('SELF_WORK: wait for a response on result page', () => {
        //TODO: doplnit intercept a cakanie na response pre zobrazenie vysledkov
        window.localStorage.setItem('bookingcom_extension_default', 'false')
        
        cy.setCookie('__kwc_agreed', 'true')
        cy.intercept("**/graphql?featureName=SearchReturnItinerariesQuery**").as("SearchResults")
        
        cy.visit('https://www.kiwi.com/en/')
        cy.get("[type=checkbox]").uncheck({force:true})
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        cy.wait("@SearchResults")//pockam kym sa mi zobrazia vysledky vyhladavania
        cy.get('[data-test="ResultCardWrapper"]').should('be.visible')
    })
})

describe('Replace a response and mock the state', () => {
    it('TOGETHER: return no results on result page', () => {
        window.localStorage.setItem('bookingcom_extension_default', 'false')
        cy.intercept("**/graphql?featureName=SearchReturnItinerariesQuery",[])
        //ked pride hocijaka odpoved, tak ju nahrad prazdnym polom [] cize ziadne lety "akoze" nenajde, mockujem situaciu
        /* ked mockujem data tak odrezavam backedn a testujem len cisto frontend so svojimi datami
        na mockovanie dat mozem pouzit realnu odpoved zo servera ale pomenim tam data podla toho ako chcem  F12 - Network a Reponse mojho GET requestu*/
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get("[type=checkbox]").uncheck({force:true})
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
            ////TODO: overte hlasku "Sorry we couldn't find your trip"
       /* cy.get("div[data-test=ResultList-results]")
        .children("[role=heading]")
        .should("be.visible",{ timeout: 10000 })
        .and("contain","Sorry, we couldn’t find your trip. Try different dates?") */
        
    });
    it.only('TOGETHER: return one place based on fake fixture', () => {
        cy.intercept("**featureName=SearchReturnItinerariesQuery", { fixture: "itineraries.json" })
        //window.localStorage.setItem('bookingcom_extension_default', 'false')
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get("[type=checkbox]").uncheck({force:true})
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        cy.get("div[data-test=ResultCardPrice]")
        //.find("div")
        .should("be.visible")
        .and("contains","10,700,000 €")
            //TODO: overte cenu letenky 10,700,000
        
    })
  

    it('SELF_WORK: return no places', () => {
        //TODO: doplnit intercept na vratenie prazdneho zoznamu miest
        cy.intercept("**/graphql?featureName=UmbrellaPlacesQuery**",[]) //nasledne mozeme overit hlasku ktoru frontend zakaznikovi ponukne
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        //TODO: ++doplnte overenie hlasky
    })

    it('SELF_WORK: return error 500', () => {
        //TODO: doplnit intercept na vratenie prazdneho zoznamu miest
        cy.intercept("**/graphql?featureName=UmbrellaPlacesQuery**",[{statusCode:500}]) //nasledne mozeme overit hlasku ktoru frontend zakaznikovi ponukne
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        //TODO: ++doplnte overenie hlasky
    })
})

describe('Check the network communication (request + response)', () => {
    it('TOGETHER: check outgoing request and response', () => {
        cy.intercept("https://auth.skypicker.com/v1/user.exists").as("userExist")
        const user = {
            name: 'testaccount@furbo.sk',
            password: 'starterpack4'
        }
        cy.intercept('https://auth.skypicker.com/v1/user.exists').as('userExists')
        cy.setCookie('__kwc_agreed', 'true')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="TopNav-SingInButton"]').click()
        cy.get('[data-test="MagicLogin-LoginViaEmail"]').click()
        cy.get('[data-test="MagicLogin-Email"]').type(user.name)
        cy.get('[data-test="MagicLogin-Continue"]').click()
         
        cy.wait('@userExists').then(interception => {
            expect(interception.request.body.email).to.eq(user.name)
        expect(interception.response.body.exists).to.be.true})

        cy.get('[data-test="MagicLogin-PasswordInput"]').type(user.password)
        cy.contains('button', 'Sign in').click()
    });
})