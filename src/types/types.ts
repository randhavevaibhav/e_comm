export type NavLinkListItemType = {
  name: string;
  href: string;
  children?: NavLinkListItemType[];
  icon?:React.ReactNode;
};