import { KeycloakService } from 'keycloak-angular';

//Archivo para inicializar Keycloak al arrancar la app
export function initializeKeycloak(keycloak: KeycloakService): () => Promise<any> {
    return (): Promise<any> =>
        keycloak.init({
            config: {
                url: 'http://localhost:8180',
                realm: 'eviden-components',
                clientId: 'myclient'
            },
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: false,
            },
        });
}