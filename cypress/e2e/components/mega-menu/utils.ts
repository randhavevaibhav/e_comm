import {MegaMenuCategoryType} from "@/app/components/ui/mega-menu/types"

export type MegaMenuItemListItem = {
  megaMenuItemSelector: string;
  pageHeadingSelector: string;
  megaMenuItemBreadcrumbSelector:string;
};
export const  getFlatLinks=(categoriesList: MegaMenuCategoryType[]) =>{
  let megaMenuItemList: MegaMenuItemListItem[] = [];

  categoriesList.forEach((category) => {
    const hrefArr = category.href.split("/");
    const megaMenuItemSelector = hrefArr[hrefArr.length-1]+'-page-link';
     const pageHeadingSelector = hrefArr[hrefArr.length-1]+'-page-heading';
     const megaMenuItemBreadcrumbSelector = hrefArr[hrefArr.length-1]+'-breadcrumb-link';
    megaMenuItemList.push({
      megaMenuItemSelector,
      pageHeadingSelector,
      megaMenuItemBreadcrumbSelector
    });

    if (category.items && category.items.length > 0) {
      megaMenuItemList = megaMenuItemList.concat(getFlatLinks(category.items));
    }
  });
  return megaMenuItemList;
}


