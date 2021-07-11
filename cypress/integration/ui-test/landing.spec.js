describe('example the scala pay ui cypress', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('displays two todo items by default', () => {
    const currencyLabel = cy.get("[data-testid=currency]");
    cy.get("[data-testid=\"currency\"]").should("exist")
  })
})
