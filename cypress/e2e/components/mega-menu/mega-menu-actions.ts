import { MegaMenuItemListItem } from "./utils";

export class MegaMenuActions {
  constructor(
    public megaMenuSelector: string,
    public megaMenuToggleSelector: string
  ) {}

  hoverOnMegaMenuItem({
    MegaMenuToggleSelector,
    MegaMenuSelector,
  }: {
    MegaMenuToggleSelector: string;
    MegaMenuSelector: string;
  }) {
    cy.getBySel(MegaMenuToggleSelector).trigger("mouseover");
    cy.getBySel(MegaMenuSelector).should("be.visible");
    return this;
  }

  navigateToPageByMegaMenuItem({
    megaMenuItemSelector,
    pageHeadingSelector,
  }: {
    megaMenuItemSelector: string;
    pageHeadingSelector: string;
  }) {
    this.hoverOnMegaMenuItem({
      MegaMenuSelector: this.megaMenuSelector,
      MegaMenuToggleSelector: this.megaMenuToggleSelector,
    });

    cy.getBySel(megaMenuItemSelector).should("be.visible").click();
    cy.waitForProgressBar();
    cy.getBySel(pageHeadingSelector).should("be.visible");
    return this;
  }

  navigateTo({
    itemSelector,
    pageHeadingSelector,
  }: {
    itemSelector: string;
    pageHeadingSelector: string;
  }) {
    cy.getBySel(itemSelector).filter(":visible").click();
    cy.waitForProgressBar();
    cy.getBySel(pageHeadingSelector).should("be.visible");
    return this;
  }

  navigateToPageByMegaMenuItemList(list: MegaMenuItemListItem[]) {
    list.map((item) => {
      this.navigateToPageByMegaMenuItem({
        megaMenuItemSelector: item.megaMenuItemSelector,
        pageHeadingSelector: item.pageHeadingSelector,
      });
    });
    return this;
  }
}
