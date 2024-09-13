// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

require('cypress-xpath')

import 'cypress-mailhog';

Cypress.Commands.add('SearchAndAddItems', (keyword,searchbox,selector) => {
    cy.get(searchbox).clear()
    cy.get(searchbox).type(`${keyword}{enter}`)
    cy.get(selector).click()
})

Cypress.Commands.add('login', (username, password) => {
    
    cy.get('#Email').type(username)
    cy.get('#Password').type(password)
    cy.get('form > .buttons > .button-1').click()
})


import { authenticator } from 'otplib'

Cypress.Commands.add('generateOTP', (secret) => {
  return authenticator.generate(secret)
})

//compare screenshot by two lines
// const compareSnapshotCommand = require('cypress-image-diff-js/command');
// compareSnapshotCommand();

//compare screenshot by a single line
require('cypress-image-diff-js/command')();
