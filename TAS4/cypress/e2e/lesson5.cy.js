

describe ("lekcia5", ()=>{

    beforeEach(()=>{
        
        cy.intercept("GET", "**featureName=UmbrellaPlacesQuery**")
        .as("placepickerResults")
      
        cy.intercept("POST","**featureName=SearchReturnItinerariesQuery**",)
        .as("searchResults")
      //toto je moj custom command ktory je ulozeny v support/commands.js
        cy.setCookiesContext()
        cy.setBookingFalse()
      
      cy.log("visit the page")
        cy.visit("https://www.kiwi.com/en/")

    })

    it("working with cookies",()=>{
        
                const destination = "Tokyo"
                cy.log("Overime ze Cookies sa naozaj odklikli")
                //aby sme nemuseli stale klikat na button accept cookies ma Cypress metodu cy.setcookie() najelpsie je to robit PRED cy.visit
                //name COokie si najdeme cez F12 - Aplikacie-Cookies - rozkliknut a najst kwc v tomto pripade
               //overime si ci naozaj su Cookies accepted aj ked v UI neuvidime okno
               cy.getCookie("__kwc_agreed").should("exist").and("have.a.property","value","true")
               cy.getCookie("__kwc_settings").should("exist").and("have.a.property","value","%7B%22marketing%22%3Atrue%2C%22analytics%22%3Atrue%7D")

              //INA MOZNOST ako dekodovat tu divnu value - tu dekoded hodnotu najdem v F12-Cookies-Aplikacie a musim zakliknut Show URL decoded
               cy.log("Decode Cookies value")
               cy.getCookie("__kwc_settings").should("exist").then((cookie) => {
                const cookieValue = cookie.value
                const decodedValue = decodeURIComponent(cookieValue)
                expect(decodedValue).to.eq('{"marketing":true,"analytics":true}')             
            })
            cy.log("Checkneme ci je v Local Storage Booking Button vypnuty")
              cy.getAllLocalStorage().then(() => {
                const bookingExtensionButton = localStorage.getItem("bookingcom_extension_default")
                expect(bookingExtensionButton).to.eq("false")
              })
              
            })
        })
