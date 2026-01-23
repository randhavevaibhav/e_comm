import "cypress-mochawesome-reporter/register";

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add("getBySelLike", (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

Cypress.Commands.add(
  "waitForOptionalRequest",
  (alias: string, timeout = 5000) => {
    // Ensure the alias starts with @
    const aliasName = alias.startsWith("@") ? alias : `@${alias}`;

    // Access the history of interceptions for this alias
    cy.get(`${aliasName}.all`).then((interceptions) => {
      if (interceptions.length > 0) {
        cy.log(`**${aliasName}** detected: Waiting for completion.`);
        cy.wait(aliasName, { timeout });
      } else {
        cy.log(`**${aliasName}** was not triggered: Skipping wait.`);
      }
    });
  }
);

cy.intercept("**/api/**", (req) => {
  req.on("response", (res) => {
    if (res.statusCode >= 400) {
      throw new Error(
        `API ${req.method} ${req.url} failed with ${
          res.statusCode
        }\n${JSON.stringify(res.body)}`
      );
    }
  });
});

Cypress.Commands.add("waitForProgressBar", (wait = 10000) => {
  cy.get(".test-progress-bar", {
    timeout: wait,
  }).should("not.exist");
});
