export interface CreateUser {
    readonly userName: string;
    readonly role: string;
    readonly password: string;
    readonly confirmPassword?: boolean;
    readonly email: string;
}
