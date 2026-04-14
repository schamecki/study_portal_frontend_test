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
          <h2>Erreur d'authentification</h2>
          <p>Une erreur est survenue lors de votre connexion.</p>
        </div>

        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
      </div>
    </div>

    <!-- Right side: Error Message -->
    <div class="login-form-container">
      <div class="form-wrapper">
        <div class="mobile-logo">
          <h1>BOAZ Study</h1>
        </div>

        <div class="form-card">
          <h1 class="form-title">Une erreur s'est produite</h1>

          <#if message??>
            <div class="alert alert-error">
              <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${message.summary}</span>
            </div>
          </#if>

          <p class="form-subtitle" style="margin-bottom: 2rem;">
            Nous nous excusons pour ce désagrément. Veuillez réessayer ou contacter le support.
          </p>

          <a href="${url.loginUrl}" class="btn btn-primary btn-lg btn-fullwidth">
            Retour à la page de connexion
          </a>

          <div class="form-footer">
            <a href="https://boaz-study.fr" class="link" target="_blank">Retour au site principal</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</@layout.registrationLayout>
