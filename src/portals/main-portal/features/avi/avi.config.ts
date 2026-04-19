// ============================================================
// AVI Steps & Pages Configuration
// ============================================================

export interface StepConfig {
  id: number;        // 1–10 global step identifier
  title: string;
  description: string;
}

export interface PageConfig {
  id: number;        // 1–4 page identifier (used in /ave/:id)
  steps: StepConfig[];
}

// All 10 steps
export const ALL_STEPS: StepConfig[] = [
  { id: 1,  title: 'Informations Personnelles',            description: 'Ici, veuillez remplir vos informations personnelles' },
  { id: 2,  title: 'Détails de la Formation',              description: 'Saisissez les détails concernant votre formation' },
  { id: 3,  title: 'Informations Financières et Autres Détails', description: 'Complétez vos informations financières et autres détails' },
  { id: 4,  title: 'Principe de paiement',                 description: 'Prenez connaissance de nos principes de paiement' },
  { id: 5,  title: 'Mode de paiement',                     description: 'Choisissez votre mode de paiement' },
  { id: 6,  title: 'Etablissement bancaire',               description: 'Renseignez votre établissement bancaire' },
  { id: 7,  title: 'Coordonnées bancaires',                description: 'Saisissez vos coordonnées bancaires' },
  { id: 8,  title: 'Proforma',                             description: 'Consultez et validez votre proforma' },
  { id: 9,  title: 'Mon contrat',                          description: 'Signez votre contrat' },
  { id: 10, title: 'Dépôt de preuve',                      description: 'Déposez vos documents justificatifs' },
];

// Pages grouping steps (used in /ave/:id routes)
export const PAGES: PageConfig[] = [
  {
    id: 1,
    steps: [ALL_STEPS[0], ALL_STEPS[1], ALL_STEPS[2]],  // Steps 1, 2, 3
  },
  {
    id: 2,
    steps: [ALL_STEPS[3], ALL_STEPS[4], ALL_STEPS[5]],  // Steps 4, 5, 6
  },
  {
    id: 3,
    steps: [ALL_STEPS[6], ALL_STEPS[7], ALL_STEPS[8]],  // Steps 7, 8, 9
  },
  {
    id: 4,
    steps: [ALL_STEPS[9]],                                // Step 10
  },
];

/**
 * Returns the page config that contains the given global step ID.
 */
export const getPageForStep = (stepId: number): PageConfig | undefined => {
  return PAGES.find((page) => page.steps.some((s) => s.id === stepId));
};

/**
 * Returns the page config by page ID.
 */
export const getPageById = (pageId: number): PageConfig | undefined => {
  return PAGES.find((page) => page.id === pageId);
};

/**
 * Returns the next page after the given page ID, or undefined if last.
 */
export const getNextPage = (pageId: number): PageConfig | undefined => {
  const idx = PAGES.findIndex((p) => p.id === pageId);
  return idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : undefined;
};

/**
 * Returns the first incomplete step ID based on completed steps.
 */
export const getFirstIncompleteStep = (completedSteps: number[]): number => {
  for (const step of ALL_STEPS) {
    if (!completedSteps.includes(step.id)) return step.id;
  }
  return ALL_STEPS[ALL_STEPS.length - 1].id;
};
