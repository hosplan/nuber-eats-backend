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
exports.RestaurantsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const role_decorator_1 = require("../auth/role.decorator");
const user_entity_1 = require("../users/entities/user.entity");
const create_restaurant_dto_1 = require("./dtos/create-restaurant.dto");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const restaurants_service_1 = require("./entities/restaurants.service");
let RestaurantsResolver = class RestaurantsResolver {
    constructor(retaurantService) {
        this.retaurantService = retaurantService;
    }
    async createRestaurant(authUser, createRestaurantInput) {
        return this.retaurantService.createRestaurant(authUser, createRestaurantInput);
    }
};
__decorate([
    graphql_1.Mutation(returns => create_restaurant_dto_1.CreateRestaurantOutput),
    role_decorator_1.Role(['Owner']),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_restaurant_dto_1.CreateRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurantsResolver.prototype, "createRestaurant", null);
RestaurantsResolver = __decorate([
    graphql_1.Resolver(of => restaurant_entity_1.Restaurant),
    __metadata("design:paramtypes", [restaurants_service_1.RestaurantService])
], RestaurantsResolver);
exports.RestaurantsResolver = RestaurantsResolver;
//# sourceMappingURL=restaurants.resolver.js.map