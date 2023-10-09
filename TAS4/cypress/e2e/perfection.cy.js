var randomEmail = require('random-email')

const fund = "Hoggwart's Fund"
const moneyAmount = 2000
const investmentYears = 6
const email = "natalFatal@hoh.com"

//vytvorime si pole const do ktoreho dame tie moje const a musi to mat strukturu ako json

const savingInfo = {
     fund:"Hoggwart's Fund",
     moneyAmount:2000,
     investmentYears:6,
     email:randomEmail({domain:"finportal.sk"})
}

//konstanty mozu byt pred desribe blockom alebo tesne pod nazvom describe bloku
//mimo describe bloku nie je best practice zadefinovat "let" premenne ale ak to potrebujem tak si viem pomoct s beforeEach hookom
/*nad describe blok si dam let email a potom do beforeEach zadefinujem defaultnu hodnotu ktora sa pred kazdym it blokom spusti */
describe("Check Total income flow", () => {
   
    beforeEach(() => {
      cy.visit("savingscalculator.php")
    })
  
    it("check everything is working - kr, clicking, typing", () => {
        
        //takto si zavolam const y mojho pola..:)
    fillInForm(savingInfo.fund,savingInfo.investmentYears,savingInfo.moneyAmount)

         
      cy.get("[data-test=calculate]").click()
      
      cy.get("div.result div").eq(0).find("p").as("incomeMoney")
      
      cy.get("@incomeMoney").should("contain.text", "kr").and("be.visible")
    
      cy.get("div.result p:eq(0)").should("contain.text", "kr").and("be.visible")
   
      cy.contains("span", "Total income")
        .siblings("p")
        .should("contain.text", "kr")
        .and("be.visible")
    })
  
    it("Validate email in details", () => {
//dolezite je PORADIE PREMNNYCH
    fillInForm(savingInfo.fund,savingInfo.investmentYears,savingInfo.moneyAmount,savingInfo.email)

      cy.get("[data-test=apply-for-saving]").click()
  
      
      cy.get("ul.saving-list").find("li").eq(0).should("be.visible")
   
      cy.get(".saving-list li:eq(0)").should("be.visible")
  
      cy.log("click on detail and validate")
      cy.contains("button", "detail").click()
  
     
      cy.get("div.modal-container").should("be.visible")
  
      cy.contains("p", "Contact")
        .find("span")
        .should("have.text", email)
  
      cy.contains("p", "Contact")
        .children("span")
        .should("have.text", email)
    })
  })

  // vytvorim si funkciu na vyplnenie formulara - dolezite je aby som zadefinovala premenne ktore do nej budu vstupovat
  function fillInForm (fund, moneyAmount,investmentYears,email= null){
    // ak zadefinujem defaultnu hodnotu pre niektoru premennu vo funkcii je fajn pridat k tomu aj if podmienku
    cy.log("select the fund")
    cy.get("#fundSelect").select(fund)

    cy.log("Type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type(moneyAmount)

    cy.log("Type period in years & calculate")
    cy.get("#yearsInput").type(investmentYears)

    // ak nechcme vo formulari vyplnat email,tak aby mi to nepadalo zadefinujem si ze ak to nie je NULL, tak mi tam nieco napis, ak je to null tak do toho polcika ani nechod
    if (email != null){
    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").type(email)
    }
}