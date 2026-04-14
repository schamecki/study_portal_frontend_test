interface PageTitles {
    [key: string]: {
        name: string;
        title: string | ((...args: string[]) => string);
    }
}

export const PAGE_TITLES: PageTitles = {
    "/": {name: 'accueil', title: "Accueil - Mon Application"},
    "/profil": {name: 'profile', title: "Profile - Mon Application"},
};