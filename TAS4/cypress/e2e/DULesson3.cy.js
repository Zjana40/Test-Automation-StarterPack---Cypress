function addRyan(numClicks){
    for (let i=0; i=numClicks; i++){
    cy.get("#addRyan").click()
    cy.log("Mam na obrazovke "+ (i+1) + "Ryanov")}
    }

describe ("Homework lesson 3", ()=>{
   beforeEach (()=>{
        cy.log("Navstivime Gosslingatora")
        cy.visit("/gosslingator.php")
    })
    /*
    Domaca uloha:
Vytvorte metódu addRyan, ktorá klikne na tlačidlo pridať Ryana
Upravte metódu tak aby príjmala vstupný parameter, číslo.
Vstupný paramater definuje, koľko ryanov sa pridá na stránku
    */

it("Vyklikame n Ryanov",()=>{
 
    const numClicks = 10
   addRyan(numClicks)
})

it("Vyklikame n Ryanov po druhe",()=>{
    // rekurzivna funkcia za pomoci chatGPT
const addRyan2 = (iterations) => {
    if (iterations > 0) {
      cy.get("#addRyan").should("be.visible").click()
      addRyan2(iterations - 1)
    }
  }
  addRyan2(10)
  cy.get("img").its("length").should("eq",10)
  
 })
})