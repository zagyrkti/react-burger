describe('service is available', function () {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", { fixture: "burger-ingredients.json" });
  })

  it('call to actions exist', () => {
    cy.contains('Соберите бургер')
    cy.contains('Перетащите булку по вкусу');
    cy.contains('Накидайте начинки')
    cy.contains('Оформить заказ')
  })

  it('ingredients exist and data rendered', () => {
    cy.get('[data-test="ingredient-card"]').as('ingredients');
    cy.get('@ingredients').should('have.length.at.least', 15);
    cy.get('@ingredients').each(($ingredient) => {
      cy.wrap($ingredient)
          .find('img')
          .should('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
      cy.wrap($ingredient)
          .find('p')
          .invoke('text')
          .then((text) => {
            expect(text.length).least(5);
          })
      cy.wrap($ingredient)
          .find('span')
          .invoke('text')
          .then((text) => {
            expect(text.length).least(2);
          })
    })
  })

  it('ingredients area is scrollable', () => {
    cy.get('[data-test="ingredient-card"]').last().scrollIntoView().should('be.visible');
    cy.get('[data-test="ingredient-card"]').first().scrollIntoView().should('be.visible');
  })

  describe('ingredient modal', () => {
    it('modal opens', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible');
    })

    it('path changes', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.location('pathname').should('contain', 'ingredients/');
    })

    it('overlay visible', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.get('[data-test="modal-overlay"]').should('be.visible');
    })

    it('can be closed by click on button', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible');
      cy.get('[data-test="modal_close-button"]').click();
      cy.get('[data-test="modal"]').should('not.exist');
    })

    it('can be closed by click on overlay', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible');
      cy.get('[data-test="modal-overlay"]').click('topRight');
      cy.get('[data-test="modal"]').should('not.exist');
    })

    it('can be closed by ESC', () => {
      cy.get('[data-test="ingredient-card"]').first().click();
      cy.get('[data-test="modal"]').should('be.visible')
      cy.get('body').type('{esc}');
      cy.get('[data-test="modal"]').should('not.exist');
    })

    it('data rendered and match clicked ingredient data', () => {
      cy.get('[data-test="ingredient-card"]')
          .first()
          .find('p')
          .invoke('text')
          .then((text) => {
            cy.get('[data-test="ingredient-card"]').first().click();
            cy.get('[data-test="modal"]').should('be.visible')
            cy.get('[data-test="modal"]')
                .find('p')
                .should('contain.text', text)
          })
      cy.get('[data-test="modal"]')
          .find('img')
          .should('have.prop', 'naturalWidth')
          .should('be.greaterThan', 0);
    })

    it('ingredient modal data changes', () => {
      cy.get('[data-test="ingredient-card"]')
          .first()
          .find('p')
          .invoke('text')
          .then((text) => {
            cy.get('[data-test="ingredient-card"]').first().click();
            cy.get('[data-test="modal"]').should('be.visible')
            cy.get('[data-test="modal"]')
                .find('p')
                .should('contain.text', text)
                .get('[data-test="modal_close-button"]').click();
          })
      cy.get('[data-test="ingredient-card"]')
          .last()
          .find('p')
          .invoke('text')
          .then((text) => {
            cy.get('[data-test="ingredient-card"]').last().click();
            cy.get('[data-test="modal"]').should('be.visible')
            cy.get('[data-test="modal"]')
                .find('p')
                .should('contain.text', text)
                .get('[data-test="modal_close-button"]').click();
          })
    })
  })

  it('drag and drop works', () => {
    cy.get('[data-test="burger-constructor_drop-target"]')
        .find('.constructor-element')
        .should('have.length', 0)

    cy.get('[data-test="ingredient-card"]').first().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').eq(4).trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').last().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="burger-constructor_drop-target"]')
        .find('.constructor-element')
        .should('have.length', 4)
  })


  it('price is correct', () => {
    cy.get('[data-test="ingredient-card"]').first().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').eq(4).trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').last().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="burger-constructor_total"]')
        .invoke('text')
        .then((text) => {
          let total = 0
          cy.get('[data-test="burger-constructor_drop-target"]')
              .find('.constructor-element')
              .each((ingredient) => {
                cy.wrap(ingredient)
                    .find('.constructor-element__price')
                    .invoke('text')
                    .then((text) => {
                      total += parseInt(text);
                    })
              })
              .then(() => {
                expect(parseInt(text)).equal(total)
              })
        })
  })

  it('order can be done', () => {
    cy.intercept("POST", "api/orders").as('orderRequest');

    cy.get('[data-test="ingredient-card"]').first().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').eq(4).trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.get('[data-test="ingredient-card"]').last().trigger('dragstart')
    cy.get('[data-test="burger-constructor_drop-target"]').trigger('drop')

    cy.contains('Оформить заказ').first().click();
    cy.location('pathname').should('equal', '/login');
    cy.get("input[name=email]").type("debugger01@gmail.com");
    cy.get("input[name=password]").type("debugger");
    cy.contains('Войти').first().click();
    cy.location('pathname').should('equal', '/');
    cy.contains('Оформить заказ').first().click();
    /* eslint-disable */
    cy.wait('@orderRequest').its('response.body')
        .then((response) => {
          expect(response.success).equal(true)
        })
    cy.contains('Ваш заказ начали готовить')
  })

});
