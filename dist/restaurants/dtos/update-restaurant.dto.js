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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRestarantDto = exports.UpdateRestarantInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_restaurant_dto_1 = require("./create-restaurant.dto");
let UpdateRestarantInputType = class UpdateRestarantInputType extends graphql_1.PartialType(create_restaurant_dto_1.CreateRestaurantDto) {
};
UpdateRestarantInputType = __decorate([
    graphql_1.InputType()
], UpdateRestarantInputType);
exports.UpdateRestarantInputType = UpdateRestarantInputType;
let UpdateRestarantDto = class UpdateRestarantDto {
};
__decorate([
    graphql_1.Field(type => Number),
    __metadata("design:type", Number)
], UpdateRestarantDto.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => UpdateRestarantInputType),
    __metadata("design:type", UpdateRestarantInputType)
], UpdateRestarantDto.prototype, "data", void 0);
UpdateRestarantDto = __decorate([
    graphql_1.ArgsType()
], UpdateRestarantDto);
exports.UpdateRestarantDto = UpdateRestarantDto;
//# sourceMappingURL=update-restaurant.dto.js.map