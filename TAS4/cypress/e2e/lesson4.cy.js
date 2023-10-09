describe("4th lesson - Kiwi.com", ()=>{
    it("clicking and validation trough homepage", ()=>{

        const destination = "Tokyo"

        cy.intercept("GET", "**featureName=UmbrellaPlacesQuery**")
        .as("placepickerResults")

        cy.log("visit the page")
        cy.visit("https://www.kiwi.com/en/")
        //ak zadam kompletnu url tak neberie do uvahy base url co mam zadefinovanu v configu
        
        cy.log("accept cookies")
        cy.get("[data-test=CookiesPopup-Accept]").click()
        cy.get("[data-test=CookiesPopup]").should("not.exist")

        cy.log("Validate Explore button")
        /// overenie presneho stringu v href atribute
        /*cy.get("[data-test=LandingSearchButton]")
        .should("have.text","Explore")
        .and("have.attr","href","/en/search/tiles/budapest-hungary/anywhere")*/
        //a toto nam skontroluje cast hrefu textu
        cy.get("[data-test=LandingSearchButton]")
        .should("have.text","Explore").and("have.attr","href").and("include","tiles")

        //odklikneme checkbox 
        cy.log("Uncheck checkbox")
        //cy.get(["data-test=bookingCheckbox"]).click()
        //aby som mohla uncheck element musim sa vnorit k inputu nestaci byt len v div ktory ma data-test
        //cy.get(["data-test=bookingCheckbox input"]).uncheck({force:true})
        cy.get('input[type="checkbox"]').uncheck({force:true})

        
        cy.log("type Tokyo")
        //v tomto pripade si najdem data-test pre parent element, lebo input elementov s rovnakou data-test hodnotou je viacej
        cy.get("[data-test=PlacePickerInput-destination]").type(destination)
        cy.contains("[data-test=PlacePickerRow-wrapper]", destination).click()
        cy.wait("@placepickerResults")
        
        //cy.intercept je vhodne definovat  pred cy.visit a sluyi na volanie requesto GET,POST,.... a pomenovat ich aliasom
        //cy.wait(5000) - ak mam pomalu siet a musim pockat kym sa mi nacita nejaky element, toto je najhorsie riesenie...lebo ak to spravim v kazdom teste tak pri 500testoch je to 500x5s
        //timeout flag..napr. pri clicku to moze vyzerat takto .click({timeout:10000})
        //tretim riesenim je cakanie na intercept GET request 
        /*cy.intercept({
            metho: 'GET',
            url: ""
        }).as("aliasName")
          */      
        cy.log("destination is one and only")
        cy.get("[data-test=PlacePickerInput-destination] [data-test=PlacePickerInputPlace]")
        .should("have.length",1)
        .and("be.visible")
        .and("contain.text", destination)

        cy.log("check URL")
        //treba checkovat URL ako sa zmenia po vykonani nejakej akcie
        cy.url().should("include","?destination=tokyo-japan")
        // toto obsahuje len substring ktory vznikne pri vybere destinacie
        cy.url().should("eq","https://www.kiwi.com/en/?destination=tokyo-japan")

        cy.log("click on Search")   
        cy.get("[data-test=LandingSearchButton]").click()
    })
})