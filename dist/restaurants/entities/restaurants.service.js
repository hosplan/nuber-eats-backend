"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./category.entity");
const restaurant_entity_1 = require("./restaurant.entity");
let RestaurantService = class RestaurantService {
    constructor(restaurants, categories) {
        this.restaurants = restaurants;
        this.categories = categories;
    }
    async createRestaurant(owner, createRestaurantInput) {
        try {
            const newRestaurant = this.restaurants.create(createRestaurantInput);
            newRestaurant.owner = owner;
            const categoryName = createRestaurantInput.categoryName.trim().toLowerCase();
            const categorySlug = categoryName.replace(/ /g, "-");
            let category = await this.categories.findOne({ slug: categorySlug });
            if (!category) {
                category = await this.categories.save(this.categories.create({ slug: categorySlug, name: categoryName }));
            }
            await this.restaurants.save(newRestaurant);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Could not create restaurant',
            };
        }
    }
};
RestaurantService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(restaurant_entity_1.Restaurant)),
    __param(1, typeorm_1.InjectRepository(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurants.service.js.map