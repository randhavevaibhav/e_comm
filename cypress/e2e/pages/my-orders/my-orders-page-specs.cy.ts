import { MyOrdersPageActions } from "./my-orders-page-actions"
import { myOrdersPageSelectors } from "./utils";

const myOrdersPageActions = new MyOrdersPageActions()

const {myOrdersPageLink} = myOrdersPageSelectors;

describe("My orders page tests.",()=>{

    beforeEach(()=>{
        myOrdersPageActions.visit();
    });
    
    it("Should able to see my orders page nav link",()=>{
        cy.getBySel(myOrdersPageLink)
    })

})