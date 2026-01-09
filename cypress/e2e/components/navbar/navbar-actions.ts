import { MegaMenuActions } from "../mega-menu/mega-menu-actions";
import { navbarSelectors } from "./utils";
const { toggleThemeBtn } = navbarSelectors;

export class NavbarActions extends MegaMenuActions {
  visit() {
    cy.visit("/");
    cy.waitForProgressBar();
    return this;
  }

  clickThemeToggle() {
    cy.getBySel(toggleThemeBtn).click();
  }

  checkThemeIsDark() {
    cy.get("body").should("have.class", "dark");
    return this;
  }
  checkThemeIsLight() {
    cy.get("body").should("have.class", "light");
    return this;
  }

  changeThemeToDark() {
    this.clickThemeToggle();
    cy.wait(1500);
    this.checkThemeIsDark();
    return this;
  }

  changeThemeToLight() {
    this.clickThemeToggle();
    cy.wait(1500);
    this.checkThemeIsLight();
    return this;
  }

  togglePersistTheme() {
    cy.wait(1000);
    cy.get("body").then(($el) => {
      const isThemeDark = $el.hasClass("dark");
      cy.log("element has dark class?", isThemeDark);
      if (isThemeDark) {
        this.changeThemeToLight();
        cy.wait(1500);
        cy.reload();
        cy.wait(1500);
        this.checkThemeIsLight();
        this.changeThemeToDark();
        cy.wait(1500);
        cy.reload();
        cy.wait(1500);
        this.checkThemeIsDark();
      } else {
        this.changeThemeToDark();
        cy.wait(1500);
        cy.reload();
        cy.wait(1500);
        this.checkThemeIsDark();
        this.changeThemeToLight();
        cy.wait(1500);
        cy.reload();
        cy.wait(1500);
        this.checkThemeIsLight();
      }
    });
    return this;
  }
}
