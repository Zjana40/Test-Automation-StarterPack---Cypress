describe("Check SavingsCalculator", ()=>{
    
    beforeEach(()=>{
        cy.log("Loadujem Savings Calculator")
        cy.visit("https://furbo.sk/waw/gosslingator.php")
    })

it.only("Homework Lesson2",()=>{
    /*Zautomatizuje tieto scenáre
-Vymazanie inputov po vytvorení nového requestu
   - vytvor nový request
   - over že po vytvorení sú vstupné polia prázdne
*/
    cy.log("select the fund")
    cy.get("#fundSelect").select("Batman's Cave Development")
    cy.log("type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type("30000")
    cy.log("type period in years and calculate")
    cy.get("#yearsInput").type("5")
    cy.get("button[data-test=calculate]").click()
    cy.get("div.result").should("be.visible")
    cy.log("insert email and apply for savings")
    cy.get("[id=emailInput]").type("fakemail@email.com")
    cy.get("button[data-test=apply-for-saving]").click() 
    cy.get("ul.saving-list div:eq(0)").should("be.visible")
    cy.log("click on detail and validate email")
    cy.get("div.buttons button:eq(0)").click()
    cy.contains("div","Saving request").should("be.visible")
    cy.get("div[class*=modal-result]").find("p").eq(2).should("contain.text","fakemail@email.com").and("be.visible")
    cy.log("Close popup window")
    cy.get("button").contains("Close").click()
    cy.contains("div","Saving request").should('not.exist')
    //aby mi presiel test tak mam fundSelect should not be disabled ale je to bug, pretoze podla zadania by mal byt disabled, pretoze podla mna aj vyber z dropdownu je input od usera
    //cy.get("#fundSelect").should("not.be.disabled")
    //cy.get("#fundSelect").find("option").eq(0).should("have.text","Select your fund").and("be.visible") - preco mi to preslo ked to nie je visible?
    //cy.get('option[value=""][disabled="disabled"]').contains('Select your fund').should("be.visible") -stale nerozumime preco mi to prechadza ked to nie je visible
    //cy.get('#fundSelect').contains('Select your fund').should('not.be.hidden');
    //cy.get("#fundSelect").find("option").eq(0).should('have.css', 'display', 'none');
    //cy.get("#fundSelect").find("option").eq(0).should("have.text","Select your fund").and("be.visible")
    cy.get('#fundSelect').invoke('val').then((defaultValue) => {
        // Log or assert the default value
        cy.log('Default value:', defaultValue);})
    cy.pause()
    cy.get("[id=oneTimeInvestmentInput]").should("be.empty")
    cy.get("#yearsInput").should("have.value","")
    cy.get('input[type="email"]').should('have.value', '')
    cy.log("Spravime druhu investiciu")
    cy.log("select the fund")
    cy.get("#fundSelect").select("Handelsbanken Aktiv 100")
    cy.log("type amount of money")
    cy.get("[id=oneTimeInvestmentInput]").type("40000")
    cy.log("type period in years and calculate")
    cy.get("#yearsInput").type("50")
    cy.get("button[data-test=calculate]").click()
    cy.get("div.result").should("be.visible")
    cy.log("insert email and apply for savings")
    cy.get("[id=emailInput]").type("fakemail2@email.com")
    cy.get("button[data-test=apply-for-saving]").click() 
    cy.get("ul.saving-list div:eq(0)").should("be.visible")
    cy.log("click on detail and validate email")
    cy.get("div.buttons button:eq(0)").click()
    cy.contains("div","Saving request").should("be.visible")
    cy.get("div[class*=modal-result]").find("p").eq(2).should("contain.text","fakemail2@email.com").and("be.visible")
    cy.log("Close popup window")
    cy.get("button").contains("Close").click()
    cy.contains("div","Saving request").should('not.exist')

})

    it("lesson2",()=>{
        cy.log("Vyberam investicny fond")
        cy.get("#fundSelect").select("Batman's Cave Development")
        /*takto by sa dalo overit ci pod cislom 4 je naozaj McDuck safe text
        cy.get("#fundSelect").select("4").should("have.text","McDuck's safe")*/
        cy.log("Vpisem sumu investicie")
        cy.get("[id=oneTimeInvestmentInput]").type("30000")
        cy.log("Vyberiem pocet rokov investicie")
        cy.get("#yearsInput").type("5")
        cy.log("Zadam email")
        cy.get("[id=emailInput]").type("fakemail@email.com")
        cy.log("Click na Calculate button")
        cy.get("button[data-test=calculate]").click()
        cy.log("Overim currency vo vysledku")
        //vyberam si z pola div elementov prvy element cize ma index 0
        cy.get("div.result div").eq(0).find("p").should("contain.text","kr").and("be.visible")
        //alternativny zapis cy.get("div.result").find("div").eq(0)
        //alternativny kratsi zapis cy.get("div.result div:eq(0) p").should("contain.text","kr").and("be.visible")
        //alternativny este kratsi zapis cy.get("div.result p:eq(0)").should("contain.text","kr").and("be.visible")
        //alternativa cez siblings cy.contains("span","Total income").siblings("p").should("contain.text","kr").and("be.visible")
            })
    it("Validate email in details",()=>{
        cy.log("select the fund")
        cy.get("#fundSelect").select("Batman's Cave Development")
        cy.log("type amount of money")
        cy.get("[id=oneTimeInvestmentInput]").type("30000")
        cy.log("type period in years and calculate")
        cy.get("#yearsInput").type("5")
        cy.get("button[data-test=calculate]").click()
        cy.get("div.result").should("be.visible")
        cy.log("insert email and apply for savings")
        cy.get("[id=emailInput]").type("fakemail@email.com")
        cy.get("button[data-test=apply-for-saving]").click() 
        cy.get("div.saving-detail").should("be.visible")
        cy.log("click on detail and validate email")
        cy.get("div.buttons button:eq(0)").click()
        cy.contains("div","Saving request").should("be.visible")
        cy.get("div[class*=modal-result]").find("p").eq(2).should("contain.text","fakemail@email.com").and("be.visible")
        
    })
})

