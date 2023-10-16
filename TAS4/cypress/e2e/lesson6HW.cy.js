/*DU1
1. otvorím stránku Kiwi.com
2. do inputu destination napíšem Tokyo
3. odpoveď zo servera nahradím súborom places.json z fixtures foldera
4. overím destináciu v modal okne*/
describe("Homework_task1",()=>{
   
    it("Tokyo results replacement",()=>{
        cy.setCookie('__kwc_agreed', 'true')
        //window.localStorage.setItem('bookingcom_extension_default', 'false')
        cy.intercept("**/graphql?featureName=UmbrellaPlacesQuery**", { fixture: "places.json" })
        cy.visit("")
        cy.get("[type=checkbox]").uncheck({force:true})
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get("[data-test=PlacePickerRow-wrapper]").should("contain","Nitra")
               
    })
   /*DU2
1. otvorím stránku Kiwi.com
2. kliknem na prihlásenie
3. zvolím prihlásenie pomocou emailu
4. zadám username testaccount@furbo.sk
5. odpoveď zo servera nahradím statickou, v ktorej definujem exists=false
6. overím, že mi vyskočí okno: Verify your email 
*/ 
    it.only("Static response",()=>{
        const staticResponse = {
            "exists": false,
            "passwordless": false,
            "verified": false,
            "social": {
                "facebook": false,
                "google": false
            }
        }                     
        
        cy.intercept('POST', 'https://auth.skypicker.com/v1/user.exists',staticResponse)
        cy.setCookie('__kwc_agreed', 'true')
        //window.localStorage.setItem('bookingcom_extension_default', 'false')
        cy.visit("")
        cy.get("[type=checkbox]").uncheck({force:true})
        cy.get("[data-test=TopNav-SingInButton]").click()
        cy.get("[data-test=MagicLogin-Intro]").should("exist")
        cy.get("[data-test=MagicLogin-LoginViaEmail]").click()
        cy.get("[data-test=MagicLogin-Email]").type("testaccount@furbo.sk")
        cy.get("[data-test=MagicLogin-Continue]").click()
        //cy.get("#1-108").should("contain","Verify your email")

    })
})


