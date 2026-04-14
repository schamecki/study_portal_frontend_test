# Configuration du Thème Keycloak BOAZ Study

## 📋 Vue d'ensemble

Ce thème Keycloak personnalisé fournit une page de login moderne et ergonomique pour le portail BOAZ Study.

### Structure du projet

```
my-theme/
├── login/
│   ├── login.ftl          # Page de connexion
│   ├── error.ftl          # Page d'erreur
│   ├── info.ftl           # Page d'information
│   ├── login-otp.ftl      # Authentification à 2 facteurs
│   ├── template.ftl       # Template de base (CRUCIAL)
│   ├── theme.properties   # Configuration du thème
│   └── resources/
│       ├── css/
│       │   └── styles.css # Styles CSS personnalisés
│       ├── js/
│       │   └── form-handler.js # Interactivité
│       └── img/          # Images (si nécessaire)
└── theme.properties      # Config parent (optionnel)
```

## ✅ Fichiers corrigés

### 1. **template.ftl** (CRÉÉ - CRITIQUE)
- ✅ Macro `registrationLayout` qui enveloppe le contenu
- ✅ Inclusion du CSS et JS
- ✅ Structure HTML valide

### 2. **login.ftl** (COR RIGÉ)
- ✅ Imports simplifiés
- ✅ Script dupliqué supprimé (maintenant dans template.ftl)
- ✅ Paramètres du layout corrigés

### 3. **error.ftl** (VÉRIFIÉ)
- ✅ Structure correcte
- ✅ Affichage des messages d'erreur

### 4. **login-otp.ftl** (CORRIGÉ)
- ✅ Styles inline déplacés dans le CSS
- ✅ Script dupliqué supprimé

### 5. **theme.properties** (CORRIGÉ)
- ✅ CSS et JS séparés (avant ils étaient mélangés)
- ✅ Syntaxe valide

### 6. **styles.css** (AMÉLIORÉ)
- ✅ Style OTP input ajouté
- ✅ CSS complet et testé

## 🚀 Déploiement

### Avec Docker Compose

```bash
# À partir du dossier docker/
docker-compose up -d
```

Le thème sera monté automatiquement via le volume :
```yaml
volumes:
  - ../keycloak-theme/my-theme:/opt/keycloak/themes/my-theme
```

### Configuration du Realm

1. Ouvrez l'admin console : http://localhost:8080/admin
2. Identifiants : `admin` / `admin`
3. Allez dans votre Realm → Themes
4. Sélectionnez :
   - **Login Theme** : `my-theme`
   - **Account Theme** : `my-theme` (optionnel)
   - **Email Theme** : `my-theme` (optionnel)

## 🔍 Vérification

### Points clés à vérifier

✅ **Dans les Dev Tools (F12) :**
- Pas d'erreur 404 pour les ressources CSS/JS
- Pas d'erreur console JavaScript
- Les styles se chargent correctement

✅ **Visuellement :**
- Page de login affichée correctement
- Formulaire d'authentification visible
- Messages d'erreur formatés correctement
- Design responsive sur mobile

### Erreurs courantes et solutions

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Refused to apply style from... is not a supported stylesheet` | CSS et JS mélangés dans `theme.properties` | Séparé avec `styles=` et `scripts=` |
| `Fichier template.ftl not found` | Import FTL manquant | Template créé et importé |
| `Internal server error` | Macro FTL mal définie | Template.ftl corrigé |
| Images/CSS manquantes (404) | URLs incorrectes | Vérifier `${url.resourcesPath}` |

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `resources/css/styles.css` :

```css
:root {
  --color-boaz-blue: #2A4F87;
  --color-boaz-orange: #F18F01;
  /* etc... */
}
```

### Textes
Modifiez directement dans les fichiers `.ftl` :

```ftl
<h1 class="brand-title">BOAZ Study</h1>
<h2>Bienvenue sur StudyPortal</h2>
```

### Interactivité
Ajoutez des fonctionnalités dans `resources/js/form-handler.js`

## 📚 Ressources Keycloak

- [Documentation Thèmes Keycloak](https://www.keycloak.org/docs/latest/server_development/#_themes)
- [Variables FTL disponibles](https://www.keycloak.org/docs/latest/server_development/#_template_properties)
- [Exemples de thèmes](https://github.com/keycloak/keycloak/tree/main/themes)

## 🐛 Débogage

### Activer le mode de développement

Dans `docker-compose.yaml`, les thèmes ne sont pas en cache :
```yaml
command: start-dev --spi-theme-cache-themes=false --spi-theme-cache-templates=false
```

Cela permet de voir les modifications en temps réel.

### Vérifier la configuration du thème

1. SSH dans le conteneur : `docker exec -it keycloak bash`
2. Vérifiez les logs : `tail -f /opt/keycloak/data/keycloak.log`
3. Le thème doit être chargé depuis : `/opt/keycloak/themes/my-theme`

## ✨ Fonctionnalités de la page de login

✅ Deux colonnes (responsive)
✅ Affichage logo/branding côté gauche
✅ Formulaire côté droit
✅ Boutons sociaux (Google, Microsoft, etc.)
✅ Affichage/masquage du mot de passe
✅ "Se souvenir de moi"
✅ Récupération mot de passe
✅ Support de l'inscription
✅ OTP/2FA intégré
✅ Design responsive mobile/tablet/desktop
✅ Support du mode sombre
✅ Gestion des erreurs et messages de succès

## 🎯 Prochaines étapes

1. ✅ Tester la connexion
2. ✅ Vérifier les styles dans tous les navigateurs
3. ✅ Tester l'OTP si configuré
4. ✅ Personnaliser les couleurs/textes selon vos besoins
5. ✅ Déployer en production

---

**Dernière mise à jour** : 14 avril 2026
