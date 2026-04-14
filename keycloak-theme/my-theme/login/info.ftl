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
          <h2>Information</h2>
          <p>Consultez le message ci-dessous.</p>
        </div>

        <div class="decorative-circle circle-1"></div>
        <div class="decorative-circle circle-2"></div>
      </div>
    </div>

    <!-- Right side: Info Message -->
    <div class="login-form-container">
      <div class="form-wrapper">
        <div class="mobile-logo">
          <h1>BOAZ Study</h1>
        </div>

        <div class="form-card">
          <h1 class="form-title">Information</h1>

          <#if message??>
            <div class="alert alert-success">
              <svg class="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>${message.summary}</span>
            </div>
          </#if>

          <#if requiredActions??>
            <p class="form-subtitle" style="margin-top: 1.5rem;">
              Les actions suivantes sont requises :
            </p>

            <ul style="margin-left: 1.5rem; margin-bottom: 2rem;">
              <#list requiredActions as action>
                <li style="margin-bottom: 0.5rem; color: var(--color-text-secondary);">
                  ${action}
                </li>
              </#list>
            </ul>
          </#if>

          <a href="${url.loginUrl}" class="btn btn-primary btn-lg btn-fullwidth">
            Continuer vers la connexion
          </a>
        </div>
      </div>
    </div>
  </div>
</@layout.registrationLayout>
