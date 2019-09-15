/// <reference types="Cypress" />

describe('Register testing', () => {
    beforeEach(() => {
        cy.visit('/register')
    });

    it('check empty fields', () => {
        cy.get('input[name=name]').type("Jemika")
        cy.get('form button').click()
        cy.get('#email').children().should('have.length', 3)
        cy.get('#email').should(($email) => {
            if ($email.find('.error')) {
                expect($email.find('.error')).to.contain('Email');
            }
        })
    })
})