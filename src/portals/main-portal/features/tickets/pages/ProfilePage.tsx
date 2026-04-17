import { useState } from 'react';
import { Button } from '../../../../../components/shared/Button';
import { Input } from '../../../../../components/shared/Input';
import { useAuthStore } from '../../../../../store/auth.store';
import userProfil from "../../../../../assets/images/user.png";
import ProfileTabContent from "../components/ProfileTabContent.tsx";
import cadenas from "../../../../../assets/icons/cadenas.svg"


type Tab = 'infos' | 'securite' | 'notifications' | 'partenaire';

const tabs: { id: Tab; label: string, icon: string }[] = [
  { id: 'infos', label: 'Mes informations', icon: cadenas},
  { id: 'securite', label: 'Sécurité', icon: cadenas},
  { id: 'notifications', label: 'Notifications', icon: cadenas },
  { id: 'partenaire', label: 'Identification e-Student Partner', icon:  cadenas},
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('infos');
  const user = useAuthStore((s) => s.authUser);

  return (
    <div>
      {/* Tabs — matching Figma profile tabs */}
      <div className="flex flex-wrap gap-1 border-b border-light mb-8">
        {tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
              px-4 py-3 text-sm font-medium transition-colors relative cursor-pointer
              ${activeTab === tab.id
                    ? 'text-boaz-blue-light'
                    : 'text-muted hover:text-secondary'
                }
            `}
            >
              <span className="flex items-center gap-1">
                <img src={tab.icon} alt="icon" className="text-boaz-blue-light" />
                {tab.label}
              </span>
              {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-boaz-blue-light rounded-full"/>
              )}
            </button>
        ))}
      </div>

      {/* Tab content with smooth transitions */}
      <div className="overflow-hidden">
        <ProfileTabContent active={activeTab === 'infos'}>
          <div className="max-w-2xl mx-auto">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3">
                {/*{user?.preferred_username?.charAt(0).toUpperCase() || 'U'}*/}
                <img
                    src={/*`https://i.pravatar.cc/40?u=${user?.preferred_username}`*/userProfil}
                    alt={user?.preferred_username}
                    className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button className="text-sm text-boaz-blue-light hover:underline cursor-pointer">
                Modifier la Photo
              </button>
            </div>

            {/* Form — matching Figma profile form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                  label="Nom"
                  placeholder="Nom"
                  defaultValue={user?.last_name ?? ''}
              />
              <Input
                  label="Prénom"
                  placeholder="Prénom"
                  defaultValue={user?.first_name ?? ''}
              />
              <Input
                  label="Email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email || 'john.doe@boaz-study.com'}
              />
              <Input
                  label="Numéro de téléphone"
                  type="tel"
                  placeholder="Numéro de téléphone"
                  defaultValue="546-933-2711"
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="ghost" size="md">Annuler</Button>
              <Button variant="primary" size="md">Enregistrer</Button>
            </div>
          </div>
        </ProfileTabContent>
        <ProfileTabContent active={activeTab === 'securite'}>
          <div className="max-w-lg mx-auto flex flex-col gap-5">
            <Input
                label="Mot de passe actuel"
                type="password"
                placeholder="Entrez votre mot de passe actuel"
                defaultValue="••••••••••"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                }
            />
            <Input
                label="Nouveau mot de passe"
                type="password"
                placeholder="Minimum 8 caractères"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                }
            />
            <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="Confirmez votre nouveau mot de passe"
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                }
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" size="md">Annuler</Button>
              <Button variant="primary" size="md">Enregistrer</Button>
            </div>
          </div>
        </ProfileTabContent>
        <ProfileTabContent active={activeTab === 'notifications'}>
          <div className="max-w-lg mx-auto">
            <p className="text-muted text-sm">Gestion des préférences de notifications.</p>
            <div className="mt-6 flex flex-col gap-4">
              {['Notifications par email', 'Notifications push', 'Résumé hebdomadaire'].map((label) => (
                  <label key={label}
                         className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="text-sm text-primary">{label}</span>
                    <input type="checkbox" defaultChecked
                           className="w-5 h-5 rounded text-boaz-blue-light focus:ring-boaz-blue-light cursor-pointer"/>
                  </label>
              ))}
            </div>
          </div>
        </ProfileTabContent>
        <ProfileTabContent active={activeTab === 'partenaire'}>
          <div className="max-w-lg mx-auto text-center py-12">
            <p className="text-muted text-sm">Identification e-Student Partner — fonctionnalité à venir.</p>
          </div>
        </ProfileTabContent>
      </div>
    </div>
  );
};
