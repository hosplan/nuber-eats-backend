import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Category } from "./category.entity";
export declare class Restaurant extends CoreEntity {
    name: string;
    coverImage: string;
    address: string;
    category: Category;
    owner: User;
}
