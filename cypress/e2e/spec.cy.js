describe('Saucedemo - Testes de Login e Carrinho', () => {

  // CT01 — Login válido
  it('deve fazer login com credenciais válidas', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('include', '/inventory')
  })

  // CT02 — Login inválido
  it('deve mostrar erro com credenciais inválidas', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('usuario_errado')
    cy.get('#password').type('senha_errada')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('be.visible')
  })

  // CT03 — Login com campos vazios
  it('deve mostrar erro com campos vazios', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('contain', 'Username is required')
  })

  // CT04 — Validar página de produtos após login
  it('deve exibir produtos após login', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.inventory_list').should('be.visible')
    cy.get('.inventory_item').should('have.length', 6)
  })

  // CT05 — Adicionar produto ao carrinho
  it('deve adicionar produto ao carrinho', () => {
    cy.visit('https://www.saucedemo.com')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('.inventory_item').first().find('button').click()
    cy.get('.shopping_cart_badge').should('contain', '1')
  })

})