import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
let GuestUser = class GuestUser {
    id;
    deviceName;
    ipAddress;
    geoLocation;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GuestUser.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], GuestUser.prototype, "deviceName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], GuestUser.prototype, "ipAddress", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], GuestUser.prototype, "geoLocation", void 0);
GuestUser = __decorate([
    Entity()
], GuestUser);
export { GuestUser };
