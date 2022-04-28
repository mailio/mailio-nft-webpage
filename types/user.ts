export interface User {
    email: string;
    // other potential key, value fields 
    [key: string]: any;
}

export const AUTH_TOKEN = "mailio_jwt_token";

export interface UserCredentials {
    token: string;
}