import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
let Logs = class Logs {
    id;
    alias;
    timestamp;
    ipAddress;
    deviceName;
    geoLocation;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Logs.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Logs.prototype, "alias", void 0);
__decorate([
    Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Logs.prototype, "timestamp", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Logs.prototype, "ipAddress", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Logs.prototype, "deviceName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Logs.prototype, "geoLocation", void 0);
Logs = __decorate([
    Entity()
], Logs);
export { Logs };
