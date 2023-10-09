describe("4th lesson - Kiwi.com", ()=>{
    it("clicking and validation trough homepage", ()=>{

        const destination = "Tokyo"

        cy.intercept("GET", "**featureName=UmbrellaPlacesQuery**")
          .as("placepickerResults")
        
        cy.intercept("POST","**featureName=SearchReturnItinerariesQuery**",)
          .as("searchResults")

        cy.log("visit the page")
          cy.visit("https://www.kiwi.com/en/")
        
        
        cy.log("accept cookies")
          cy.get("[data-test=CookiesPopup-Accept]").click()
          cy.get("[data-test=CookiesPopup]").should("not.exist")

        cy.log("Validate Explore button")
          cy.get("[data-test=LandingSearchButton]")
            .should("have.text","Explore").and("have.attr","href").and("include","tiles")

        cy.log("Uncheck checkbox")
          cy.get('input[type="checkbox"]').uncheck({force:true})

        cy.log("type Tokyo")
          cy.get("[data-test=PlacePickerInput-destination]").type(destination)
          cy.contains("[data-test=PlacePickerRow-wrapper]", destination).click()
          cy.wait("@placepickerResults")
           
        cy.log("destination is one and only")
          cy.get("[data-test=PlacePickerInput-destination] [data-test=PlacePickerInputPlace]")
            .should("have.length",1)
            .and("be.visible")
            .and("contain.text", destination)

        cy.log("check URL")
          cy.url().should("include","?destination=tokyo-japan")
      
        cy.log("click on Search")   
          cy.get("[data-test=LandingSearchButton]").click()

        /*Domaca uloha:
        pokracujte v teste zo stvrtej hodiny
        overte, ze URL sa zmenila po kliknuti na Search button na /search/results/
        pockajte na nacitanie spravneho GraphQL “SearchReturnItinerariesQuery”, 
        nezabudnite aj spravne zadefinovat metodu (GET?POST?) v intercepte
        overte, ze vysledky su viditelne pre klienta*/
        cy.log("URL changed to Search Results ")
          cy.url().should("include","/en/search/results/").and("include","/tokyo-japan")
        cy.log("API POST correct results")
          cy.wait("@searchResults")
        cy.log("SearchResult List visible for user")
          cy.get("[data-test=ResultList-results]").should("be.visible")
    })
})