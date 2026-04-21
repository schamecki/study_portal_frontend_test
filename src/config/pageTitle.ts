interface PageTitles {
    [key: string]: {
        name: string;
        title: string | ((...args: string[]) => string);
    }
}

export const PAGE_TITLES: PageTitles = {
    "/": {name: 'accueil', title: "Accueil - Mon Application"},
    "/profile": {name: 'profil', title: "Profile - Mon Application"},
    "/avi": {name: 'Obtenir mon A.V.I', title: "Obtenir mon A.V.I - Boaz Study"},
    "/avi/:id": {name: 'Obtenir mon A.V.I', title: (id: string) => `Étape ${id} - A.V.I - Boaz Study`},
}