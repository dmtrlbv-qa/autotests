import * as main_page from '../locators/main_page.json'
import * as recovery from '../locators/recovery_password_page.json'
import * as result_page from '../locators/result_page.json'
import * as data from '../helpers/default_data.json'

describe('Домашние проверки', function () {

    beforeEach('Начало теста', function () {
          cy.visit('/');
     });
 
    afterEach('Конец теста', function () {
          cy.get(result_page.close).should('be.visible');
     });
 
    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
     })

     it('Восстановление пароля', function () {
          cy.get(main_page.fogot_pass_btn).click();
          cy.get(recovery.email).type(data.login);
          cy.get(recovery.send_button).click();
          cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
     })

     it('Верный логин, неправильный пароль', function () {
          cy.get(main_page.email).type(data.login);
          cy.get(main_page.password).type('1234german');
          cy.get(main_page.login_button).click();
          cy.get(result_page.title).contains('Такого логина или пароля нет');
     })

     it('Неправильный логин, верный пароль', function () {
          cy.get(main_page.email).type('dmitry.lobov@yandex.ru');
          cy.get(main_page.password).type(data.password);
          cy.get(main_page.login_button).click();
          cy.get(result_page.title).contains('Такого логина или пароля нет');
     })

     it('Ошибка валидации', function () {
          cy.get(main_page.email).type('germandolnikov.ru');
          cy.get(main_page.password).type(data.password);
          cy.get(main_page.login_button).click();
          cy.get(result_page.title).contains('Нужно исправить проблему валидации');
     })

     it('Проверка нижнего регистра', function () {
          cy.get(main_page.email).type('GERmaN@doLNikov.ru');
          cy.get(main_page.password).type(data.password);
          cy.get(main_page.login_button).click();
          cy.get(result_page.title).contains('Авторизация прошла успешно');
     })
})