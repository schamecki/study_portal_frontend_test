import React, { useState } from 'react';
import { Button } from '../../../../../components/shared';
import { Input } from '../../../../../components/shared';
import { useAuthStore } from '../../../../../store/auth.store';
import defaultUserProfil from "../../../../../assets/images/user.png";
import ProfileTabContent from "../components/ProfileTabContent.tsx";
import cadenas from "../../../../../assets/icons/cadenas.svg"
import {formatPhoneNumber, unFormatPhoneNumber} from "../../../../../useful/str.ts";
import {
  getCurrenUser,
  updateUserAvatar,
  updateUserPassword,
  updateUserProfile
} from "../../../../../services/api/user.api.ts";
import type {AuthUser, UserPasswordRequest, UserProfileRequest} from "../../../../../contracts/api-contracts.ts";
import {ProfilePhotoUploader} from "../../../../../components/shared/ProfilePhotoUploader.tsx";
import PasswordInput from "../../../../../components/shared/PasswordInput.tsx";

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
  const setUser = useAuthStore((s) => s.setAuthUser)
  const [loading, setLoading] = useState<boolean>(false)

  const handleProfileTabSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target);

    const data: UserProfileRequest = {
      email: formData.get('email') as string,
      lastName: formData.get('lastname') as string,
      firstName: formData.get('firstname') as string,
      attributes: {
        phone: [unFormatPhoneNumber(formData.get('phone') as string)]
      },
    }

    if (hasImageChange && data.attributes) data.attributes.profile = [userProfil]

    await updateUserProfile(data)

    const currentUser = await getCurrenUser()

    const newUser = {email: currentUser.email, last_name: currentUser.lastName, first_name: currentUser.firstName, profile: null as string|null, phone_number: null as string|null }
    if (currentUser.attributes?.profile) newUser.profile = currentUser.attributes.profile[0]
    if (currentUser.attributes?.phone) newUser.phone_number = currentUser.attributes.phone[0]

    setUser({...user, ...newUser} as AuthUser)

    setLoading(false)
  }

  const handleSecurityTabSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.target);

    const data: UserPasswordRequest = {
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmation: formData.get('confirmation') as string
    }

    await updateUserPassword(data)

    setLoading(false)
  }

  const handleProfileTabReset = async (event: React.SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      const currentUser = await getCurrenUser()

      console.log(currentUser, 'as current user')
  }

  const [userProfil, setUserProfil] = useState<string>(user?.profile || defaultUserProfil);
  const [error, setError] = useState<string | null>(null);
  const [hasImageChange, setHasImageChange] = useState<boolean>(false);

  const handlePhotoUpload = async (file: File): Promise<string> => {
    // Ton API call
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await updateUserAvatar(formData)

    setUserProfil(response.profile);
    setHasImageChange(true)
    return response.profile;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = formatPhoneNumber(event.target.value);
  }
  const handleError = (error: { type: string; message: string }) => {
    setError(error.message);
    setTimeout(() => setError(null), 3000);
  };

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
          <form className="max-w-2xl mx-auto" onSubmit={handleProfileTabSubmit} onReset={handleProfileTabReset}>
            {/* Avatar */}
            <div>
              <ProfilePhotoUploader
                  currentPhotoUrl={userProfil}
                  username={user?.preferred_username}
                  onPhotoUpload={handlePhotoUpload}
                  onError={handleError}
                  maxSizeMB={2}
                  acceptedFormats={['image/jpeg', 'image/png', 'image/webp']}
              />

              {error && (
                  <div className="text-red-500 text-sm text-center mt-2">
                    {error}
                  </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                  label="Nom"
                  placeholder="Nom"
                  defaultValue={user?.last_name ?? ''}
                  name='lastname'
                  disabled={loading}
              />
              <Input
                  label="Prénom"
                  placeholder="Prénom"
                  defaultValue={user?.first_name ?? ''}
                  name='firstname'
              />
              <Input
                  label="Email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email || 'john.doe@boaz-study.com'}
                  name='email'
                  disabled={loading}
              />
              <Input
                  label="Numéro de téléphone"
                  type="tel"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  defaultValue={formatPhoneNumber(user?.phone_number || '')}
                  onChange={handlePhoneChange}
                  disabled={loading}
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="ghost" size="md" type="reset">Annuler</Button>
              <Button variant="primary" size="md" type="submit" loading={loading}>Enregistrer</Button>
            </div>
          </form>
        </ProfileTabContent>
        <ProfileTabContent active={activeTab === 'securite'}>
          <form className="max-w-lg mx-auto flex flex-col gap-5" onSubmit={handleSecurityTabSubmit}>
            <PasswordInput
                label="Mot de passe actuel"
                placeholder="Entrez votre mot de passe actuel"
                defaultValue="••••••••••"
                name="currentPassword"
            />
            <PasswordInput
                label="Nouveau mot de passe"
                placeholder="Minimum 8 caractères"
                name="newPassword"
            />
            <PasswordInput
                label="Confirmer le mot de passe"
                placeholder="Confirmez votre nouveau mot de passe"
                name="confirmation"
            />

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="ghost" size="md" type="reset">Annuler</Button>
              <Button variant="primary" size="md" type="submit">Enregistrer</Button>
            </div>
          </form>
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
