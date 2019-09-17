/// <reference types="Cypress" />

import { regFields } from '../../src/data/register';

describe('Register testing', () => {
    beforeEach(() => {
        cy.visit('/register')
    });

    it('check empty fields error', () => {
        cy.get('form button').click();
        regFields.forEach(field => {
            if (!field.optional) {
                cy.get(`#${field.bind}`).children().should('have.length', 3)
                cy.get(`#${field.bind}`).should(($input) => {
                    if ($input.find('.error')) {
                        expect($input.find('.error')).to.contain(`${field.label}`);
                    }
                })
            }
        })
    })

    it('check submit', () => {
        regFields.forEach(field => {
            cy.get(`input[name=${field.bind}]`).type("testing@tes.com");
        })
        cy.get('form button').click();
        cy.url().should('eq', 'http://localhost:3000/');
    })

})