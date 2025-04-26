# NgmTurnstile


Este proyecto es una implementación en [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9. Para incorporar el uso de Cloudflare turnstile . Se incluye la invocación de un backend en [Node.js](https://github.com/jorge-alvarado-revata/ex-captcha-turnstile-validate) para realizar la validación de token de respuesta una vez que se carga el widget. La validación se realiza usando la llave privada.

Incluye unas adaptaciones propias de angular para realizar la carga de la función callback de turnstile.

Si el captcha no es valido, no se habilita el boton de submit. Este proyecto es util para evitar reintentos automaticos de registro. De acuerdo a la selección de la versión de registro de la clave publica se mostrara el respectivo challenge de captcha.


Agradecimientos
----------------

Este proyecto utiliza alguna de las ideas de [ngx-turnstile](https://github.com/verto-health/ngx-turnstile), que ha sido de gran utilidad. Para lograr la interación entre Angular y Javascript. Puedes utilizar el componente ngx-turnstile si quieres evitar las configuraciones y llamadas directas de javascript.

Documentación de Cloudflare Turnstile
--------------------------------------

Puedes revisar la documentación de Cloudflare Turnstile en [get started](https://developers.cloudflare.com/turnstile/get-started/)