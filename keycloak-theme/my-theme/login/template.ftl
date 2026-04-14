<#macro registrationLayout bodyClass="" displayInfo=false displayWhen=true displayRequiredFields=true>
<!DOCTYPE html>
<html<#if realm.internationalizationEnabled?? && realm.internationalizationEnabled && locale??> lang="${locale.currentLanguageTag}"<#else> lang="fr"</#if>>
<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="BOAZ Study Portal Login">
    <title><#if realm.displayNameHtml??>${realm.displayNameHtml}<#else>BOAZ Study</#if></title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.svg" type="image/svg+xml">
    <link href="${url.resourcesPath}/css/styles.css" rel="stylesheet">
</head>
<body class="login-page <#if bodyClass??>${bodyClass}</#if>">
    <#if displayWhen>
        <div class="kc-container">
            <#nested>
        </div>
    </#if>
    
    <script src="${url.resourcesPath}/js/form-handler.js"></script>
</body>
</html>
</#macro>
