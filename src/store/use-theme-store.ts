import { create } from "zustand";
import { persist } from "zustand/middleware";

type UseThemeStoreType = {
  currentTheme: "dark" | "light";
  changeThemeToDark: () => void;
  changeThemeToLight: () => void;
  getLocalTheme:()=>"dark"|"light";
};

const useThemeStore = create<UseThemeStoreType>()(
  persist(
    (set, get) => ({
      currentTheme: "dark",
      
      changeThemeToDark: () => {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        set({
          currentTheme: "dark",
        });
      },
      changeThemeToLight: () => {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        set({
          currentTheme: "light",
        });
      },
      getLocalTheme:()=>{
        const {currentTheme}=get();
        return currentTheme;
      }
    }),
    {
      name: "theme-storage",
    }
  )
);

export const useThemeStoreSelectors = () => {
  return {
    currentTheme:useThemeStore((state) => state.currentTheme),
    changeThemeToDark: useThemeStore((state) => state.changeThemeToDark),
    changeThemeToLight: useThemeStore((state) => state.changeThemeToLight),
    getLocalTheme:useThemeStore((state) => state.getLocalTheme)
  };
};
