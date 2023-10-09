describe ("Testujeme Grosslingator stranku",()=>{
    /*before(() => {
        cy.log("Pustim sa len raz")
    })*/
    beforeEach(() => {
        cy.log("Pustim sa vzdy")
        cy.log("Navstivime stranku Gosslingator")
        cy.visit("/gosslingator.php")
        // v cypress.config.js som nastavila base url a preto nie je nutne sem pisat celu adresu,ale len specificku unikatnu cast
    })

    it("Overime default values", () => {

        //it bloky by mali byt na sebe nezavisle,ako testCases
     //pomocou it.only si pustime iba dany it blok a nie vsteky v celej describe suite alebo cez it.skip sa dany test preskoci
        
        cy.log("Obrazok je iba jeden")
        cy.get("#ryanCounter").should("have.visible").and("have.text","0")
        cy.get("h3").should("be.visible").and("contain.text","ryan")
    
    })
    it("Pridame jedneho Ryana", () => {
    //cy.log("Navstivime stranku Gosslingator")
    //cy.visit("https://furbo.sk/waw/gosslingator.php")
    //tieto dva sa spustia s prikazom beforeEach
    
    /* idem najst class konkretneho elementu lebo nemam ine selektory */
    
    cy.log("Counter je viditelny")
    cy.get('.ryan-counter').should("be.visible")
    /*bodka znamena class element
    cy.get("[class='ryan-counter']") - alternativny zapis pre class element
    cy.get("[class*='counter']")  -vsetko co obsahuje slovo counter
    cy.get("#ryanCounter")*/
    
    
    cy.log("Click na addRyan button")
    /*  napisaeme si co nasledujuci priakz ma spravit*/
    cy.get("#addRyan").should("be.visible").click()
    /*hashtag predstavuje symbol ID elementu
    prikaz click() automaticky obsahuje assertion should be visible
    ale v pripade nutnosti existuje aj moznost .click({force:true}) 
    teda ze nezalezi ci je visible alebo nie
    alebo mozeme do chainu prikazov napisat should("be.visible")*/
    
    cy.log("Obrazok je iba jeden")
    cy.get("#ryanCounter").should("have.visible").and("have.text","1")
    /* validacia ze string sa rovna 1 , musime si byt isty ze to je string a nie cislo*/
    cy.get("img").should("have.length", 1)
    /* lebo nemam iny identifikator tak hladam image a hladam pocet img = 1*/
    /* text sa da overit aj inym sposobom*/
    cy.get("h3").should("be.visible").and("contain.text","ryan")
    /* contain.text funguje ako wildcard teda hocico co obsahuje cast slova ryan*/
    cy.contains("h3","ryan").should("be.visible")
    /* toto funguje ak viem ze je to element h3 a je len jeden na stranke*/
    cy.contains("h3","RYan", { matchCase : false}).should("be.visible")
    /*  matchcase:false znamena ze bude cas insensitive*/
    })
    
    it.only("Domaca uloha lekcia 1", ()=> {
    // takto si vytvorim for cyklus
    let i
    for (i=0; i<=2; i++){
        cy.log("iterujem cislo"+ i)
        cy.get("#addRyan").click()
        
    }
    cy.get("img").should("have.length", i)
    cy.log("celkovo som naiteroval" + i)
cy.pause()
/* 
Domáca úloha:
- Overte 2 ryanov
- Overte hlavný titulok stránky
- Overte že button remove ryan má správny text
- Overte že button add ryan má správny text
- Overte, že po otvorení stránky je button remove ryan zablokovaný (disabled)
*/

    cy.log("Remove Ryan btn disabled by default")
    cy.get("#removeRyan").should("be.disabled")
    
    cy.log("Check 2 Ryan's heads")
    cy.get("#addRyan").click()
    cy.get("img").should("have.length", 1)
    cy.get("#addRyan").click()
   /* takto si vytvorim funkciu na overenie toho ci je naozaj viditelny kazdy element zo zoznamu
    cy.get("img")
    .should("have.length", 2)
    .each(("$img") => {
        cy.wrap($img).should("be.visible")
    })
*/
    cy.get("img").should("have.length", 2)
/* takto checknem header ale ja som mala checknut title..:)
    cy.log("Check header text - Gosslingate me")
    cy.get(".ryan-title").should("have.text","Goslingate me")
*/
//takto overim hodnotu title - title nie je sucast DOM struktury preto pouzijem "eq" - teda musi sediet uplne presna value alebo "include" teda ze to len musi obsahovat danu value
    cy.title().should("eq","Gosslingate me!")

    cy.log("Remove Ryan button text is Ryan out!")
    cy.get("#removeRyan").contains("Ryan out!").should("be.visible")
// pri tychto buttonoch musim napisat aj should("be.visible"), lebo cy.contains necheckuje visibility
    cy.log("Add Ryan button has text Ryan!")
    cy.get("#addRyan").contains("Ryan!").should("be.visible")

    
    })
    
    

})

