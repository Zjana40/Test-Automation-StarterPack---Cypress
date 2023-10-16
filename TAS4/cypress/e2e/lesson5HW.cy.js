/*
Overenie ulozenia cookie - Currency
- Otvorim stranku Kiwi.com
- Kliknem na vyber jazyka a meny v pravom hornom rohu
- vyberiem a potvrdim menu - Novozelandsky dolar
- Potvrdim vyber
- Overim ze cookie sa mi uložila */
describe("Change cookie - currency",()=> {

           
        it("working with cookies",()=>{
            cy.setCookiesContext()
            cy.currencyNewZellandDollar()
                      
          cy.log("visit the page")
            cy.visit("https://www.kiwi.com/en/")
                    
                    cy.log("Overime ze Cookies currency je naozaj NZD")
                    cy.getCookie("preferred_currency").should("exist").and("have.a.property","value","nzd")
          
                  
                })
        it("checking cookies2",()=>{
            cy.setCookiesContext()
            cy.log("visit the page")
            cy.visit("https://www.kiwi.com/en/")
            cy.log("Changin currency")
            cy.get("[data-test=TopNav-RegionalSettingsButton]").click()
            cy.log("Selecting NZD currency")
            cy.get("[data-test=CurrencySelect]").select("nzd")
            cy.get("[data-test=CurrencySelect]").find("option:selected").should("have.text","New Zealand dollar - NZD")
            cy.log("Confirming change of currency")
            cy.get("[data-test=SubmitRegionalSettingsButton]").click()
            cy.log("Checking change in Cookies")
            cy.getCookie("preferred_currency").should("exist").and("have.a.property","value","nzd")


        })
})
