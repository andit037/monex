class AccountPages{

    launchUrl(){
        cy.visit('https://parabank.parasoft.com/parabank/index.htm')
    }

    loginData({username, password}){
        cy.get(':nth-child(2) > .input').type(username)
        cy.get(':nth-child(2) > .input').should('have.value', username)

        cy.get(':nth-child(4) > .input').type(password)
        cy.get(':nth-child(4) > .input').should('have.value', password)

        cy.get(':nth-child(5) > .button').click()
    }

    verifyTotalBalance() {
        cy.get('#leftPanel > ul > :nth-child(2) > a').click();
    
        let totalBalance = 0;
        let lengthRow;
        cy.get("#accountTable > tbody")
            .find("tr")
            .then((rows) => {
                lengthRow = rows.length
                for (let i = 1; i <= rows.length - 1; i++) {
                    cy.get(`tbody > :nth-child(${i}) > :nth-child(2)`)
                        .invoke('text')
                        .then((text) => {
                            let numberTxt = Number(text.replace('$', ''));
                            totalBalance += numberTxt;
                        });
                }
            })
            .then(() => {
                let strTotalBalance = '$'.concat(totalBalance.toFixed(2))
                let index = lengthRow - 1
                cy.get(`:nth-child(${index}) > b`).should('have.text', strTotalBalance)
            });
    }
    
}

export default new AccountPages