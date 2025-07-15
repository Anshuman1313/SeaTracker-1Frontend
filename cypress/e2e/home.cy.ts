
describe('Home Page', () => {
  it('loads successfully', () => {
    cy.visit('/');
    cy.contains('Welcome'); // Change this to any text on your home page
  });
});
describe('Dropdown logic in Home component', () => {
  it('loads reports based on selected jurisdiction', () => {
    cy.visit('/');

    // Select "Punjab" (id = 1)
    cy.get('[data-cy=jurisdiction-dropdown]').select('1');

    // Assert reports
    cy.get('[data-cy=report-dropdown]')
      .should('contain', 'Report A')
      .and('contain', 'Report B');


  });

  it('loads reports based on selected jurisdiction',() =>{
    cy.visit('/');
    cy.get('[data-cy=jurisdiction-dropdown]').select('2');

    cy.get('[data-cy=report-dropdown]')
    .get('id=')
  })
});


