import { CoreOutput } from "src/common/dtos/output.dto";
import { User } from "../entities/user.entity";
export declare class EditProfileOutput extends CoreOutput {
}
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<Pick<User, "email" | "password" | "role" | "verified" | "restaurants" | "hashPassword" | "id" | "createdAt" | "updatedAt" | "checkPassword">>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export {};
