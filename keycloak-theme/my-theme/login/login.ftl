<#import "template.ftl" as layout>
<@layout.registrationLayout>
  <div class="login-container">
    <!-- Left side: Branding -->
    <div class="login-branding">
      <div class="branding-content">
        <div class="logo-wrapper">
          <#if realm.displayNameHtml??>
            ${realm.displayNameHtml}
          <#else>
            <h1 class="brand-title">BOAZ Study</h1>
          </#if>
        </div>

        <div class="branding-text">
          <h2>Bienvenue sur StudyPortal</h2>
          <p>Votre portail de gestion des services et souscriptions BOAZ Study.</p>
        </div>

        <!-- Decorative circles -->
        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
      </div>
    </div>

    <!-- Right side: Login Form -->
    <div class="login-form-container">
      <div class="form-wrapper">
        <!-- Logo mobile -->
        <div class="mobile-logo">
          <h1>BOAZ Study</h1>
        </div>

        <!-- Form card -->
        <div class="form-card">
          <h1 class="form-title">Connexion</h1>
          <p class="form-subtitle">Accédez à votre espace BOAZ Study</p>

          <!-- Error messages -->
          <#if message?has_content && (message.type)! == "error">
            <div class="alert alert-error">
              <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h.5a2 2 0 011.6.8l.9 1.2a2 2 0 001.6.8H19a2 2 0 012 2v1m-2-10a2 2 0 00-2-2h-.5a2 2 0 00-1.6.8l-.9 1.2a2 2 0 01-1.6.8H5a2 2 0 00-2 2v1m0 0v1a2 2 0 002 2h14a2 2 0 002-2v-1m0 0V7a2 2 0 00-2-2h-.5a2 2 0 00-1.6.8l-.9 1.2a2 2 0 01-1.6.8H5a2 2 0 00-2 2v1" />
              </svg>
              <span>${message.summary}</span>
            </div>
          </#if>

          <#if message?has_content && (message.type)! == "success">
            <div class="alert alert-success">
              <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>${message.summary}</span>
            </div>
          </#if>

          <!-- Login form -->
          <form id="kc-form-login" class="form" action="${url.loginAction}" method="post">
            <!-- Username field -->
            <div class="form-group">
              <label for="username" class="form-label">
                <#if !realm.loginWithEmailAllowed>Utilisateur<#elseif !realm.registrationEmailAsUsername>Adresse email ou nom d'utilisateur<#else>Adresse email</#if>
              </label>
              <input
                tabindex="1"
                id="username"
                class="form-input"
                name="username"
                value="${login.username!''}"
                type="text"
                autofocus
                autocomplete="off"
                placeholder="Entrez votre identifiant"
                required
              />
            </div>

            <!-- Password field -->
            <div class="form-group">
              <label for="password" class="form-label">Mot de passe</label>
              <div class="password-wrapper">
                <input
                  tabindex="2"
                  id="password"
                  class="form-input"
                  name="password"
                  type="password"
                  autocomplete="off"
                  placeholder="Entrez votre mot de passe"
                  required
                />
                <button
                  type="button"
                  class="password-toggle"
                  id="kc-password-toggle"
                  onclick="togglePassword()"
                  aria-label="Afficher/masquer le mot de passe"
                >
                  <svg class="eye-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember me & Forgot password -->
            <#if realm.rememberMe && !usernameEditDisabled??>
              <div class="form-row-remember">
                <div class="checkbox-wrapper">
                  <input
                    tabindex="3"
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    <#if login.rememberMe??>checked</#if>
                  />
                  <label for="rememberMe" class="checkbox-label">Se souvenir de moi</label>
                </div>
              </div>
            </#if>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary btn-lg btn-fullwidth" tabindex="4">
              Se connecter
            </button>
          </form>

          <!-- Links -->
          <div class="form-footer">
            <#if realm.resetPasswordAllowed>
              <a href="${url.loginResetCredentialsUrl}" class="link">Mot de passe oublié ?</a>
            </#if>
            <#if realm.registrationAllowed && !usernameEditDisabled??>
              <a href="${url.registrationUrl}" class="link">S'inscrire</a>
            </#if>
          </div>
        </div>

        <!-- Social providers -->
        <#if social.providers??>
          <div class="social-login">
            <p class="social-label">Ou connectez-vous avec</p>
            <div class="social-buttons">
              <#list social.providers as p>
                <a href="${p.loginUrl}" class="social-btn social-btn-${p.providerId}" title="Connexion via ${p.displayName}">
                  <span>${p.displayName}</span>
                </a>
              </#list>
            </div>
          </div>
        </#if>
      </div>
    </div>
  </div>

</@layout.registrationLayout>
