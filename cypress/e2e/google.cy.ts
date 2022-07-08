//This is spec file, inside your google-search.spec.ts
import { GoogleSearch } from '../page-objects/google-search.page';
const search = new GoogleSearch();

const project = {
    name: 'zeh',
    description: `faker.random.words(5)`
  }
describe('Google Navigation', () => {
    it.only('readFile',() => {
        cy.readFile('/home/warnner/Documentos/Estudos/QA/qa_cypress/cypress/downloads/qgames.log').should('contain', `${project.name}`)

       
        //cy.readFile('/home/warnner/Documentos/Estudos/QA/qa_cypress/cypress/downloads/qgames.log').should('eq', 'zeh');
    });

    it('Google Search',() => {
        cy.visit('https://www.google.com');

        search.googleSearch().type('Something');
        search.googleSearchBtn().click({ force: true });
        search.searchResults().should('be.visible');
    });
});
