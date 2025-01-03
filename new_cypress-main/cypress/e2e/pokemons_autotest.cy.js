import * as data from '../helpers/pokemons_default_data.json'
import * as card from '../helpers/pokemons_card.json'

describe('Pokemons Premium Avatar', function () {

     it('Авторизация', function () {
          cy.visit('https://pokemonbattle.ru/');
          cy.get(':nth-child(1) > .auth__input').type(data.login);
          cy.get('#password').type(data.password);
          cy.get('.auth__button').click();
          cy.wait(2000);

          cy.get('.header__container > .header__id').click({force: true});
          cy.get('[href="/shop"]').click({force: true});
          cy.get('.available > button').first().click({force: true});

          cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type(card.card);
          cy.get(':nth-child(1) > .pay_base-input-v2').type(card.date);
          cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type(card.cvv);
          cy.get('.pay__input-box-last-of > .pay_base-input-v2').type(card.name);
          cy.get('.pay-btn').click();

          cy.get('#cardnumber').type(card.code);
          cy.get('.payment__submit-button').click();
          cy.contains('Покупка прошла успешно').should('be.visible');
     })
})