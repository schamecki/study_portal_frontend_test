<#import "template.ftl" as layout>
<@layout.registrationLayout>
  <div class="login-container">
    <!-- Left side: Branding -->
    <div class="login-branding">
      <div class="branding-content">
        <div class="logo-wrapper">
          <h1 class="brand-title">BOAZ Study</h1>
        </div>

        <div class="branding-text">
          <h2>Authentification à deux facteurs</h2>
          <p>Sécurisez votre accès à votre espace BOAZ Study.</p>
        </div>

        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
      </div>
    </div>

    <!-- Right side: OTP Form -->
    <div class="login-form-container">
      <div class="form-wrapper">
        <div class="mobile-logo">
          <h1>BOAZ Study</h1>
        </div>

        <div class="form-card">
          <h1 class="form-title">Vérification</h1>
          <p class="form-subtitle">Entrez le code de vérification à 6 chiffres</p>

          <#if message?has_content && (message.type)! == "error">
            <div class="alert alert-error">
              <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4v2m0 0v2m0-6v-2m0 0V7a2 2 0 012-2h.5a2 2 0 011.6.8l.9 1.2a2 2 0 001.6.8H19a2 2 0 012 2v1m-2-10a2 2 0 00-2-2h-.5a2 2 0 00-1.6.8l-.9 1.2a2 2 0 01-1.6.8H5a2 2 0 00-2 2v1m0 0v1a2 2 0 002 2h14a2 2 0 002-2v-1m0 0V7a2 2 0 00-2-2h-.5a2 2 0 00-1.6.8l-.9 1.2a2 2 0 01-1.6.8H5a2 2 0 00-2 2v1" />
              </svg>
              <span>${message.summary}</span>
            </div>
          </#if>

          <form id="kc-otp-login-form" class="form" action="${url.loginAction}" method="post">
            <div class="form-group">
              <label for="otp" class="form-label">Code de vérification</label>
              <input
                type="text"
                id="otp"
                name="otp"
                class="form-input"
                placeholder="000000"
                inputmode="numeric"
                maxlength="6"
                pattern="\d{6}"
                required
                autofocus
              />
              <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.5rem;">
                Consultez votre authentificateur ou SMS
              </p>
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-fullwidth">
              Vérifier le code
            </button>
          </form>

          <div class="form-footer">
            <a href="${url.loginUrl}" class="link">Revenir à la connexion</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</@layout.registrationLayout>
