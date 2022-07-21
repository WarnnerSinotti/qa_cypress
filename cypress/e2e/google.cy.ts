//This is spec file, inside your google-search.spec.ts
import { GoogleSearch } from '../page-objects/google-search.page';
const search = new GoogleSearch();

describe('ReadFile', () => {
    it.only('readFile',() => {
        const teste = cy.exec('node test.tsx')
        teste
        cy.log(teste)
        
    });

    it('Init Studies - Google Search',() => {
        cy.visit('https://www.google.com');

        search.googleSearch().type('Something');
        search.googleSearchBtn().click({ force: true });
        search.searchResults().should('be.visible');
    });
});
