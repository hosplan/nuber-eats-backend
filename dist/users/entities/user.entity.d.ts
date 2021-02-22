import { CoreEntity } from "src/common/entities/core.entity";
declare enum UserRole {
    Client = 0,
    Ownder = 1,
    Delivery = 2
}
export declare class User extends CoreEntity {
    email: string;
    password: string;
    role: UserRole;
    hashPassword(): Promise<void>;
    checkPassword(aPassword: string): Promise<boolean>;
}
export {};
