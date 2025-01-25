import { __decorate, __metadata } from "tslib";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
let Url = class Url {
    id;
    url;
    alias;
    topic;
    createdDate;
    userEmail;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Url.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Url.prototype, "url", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Url.prototype, "alias", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Url.prototype, "topic", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Url.prototype, "createdDate", void 0);
__decorate([
    ManyToOne(() => User, user => user.urls),
    __metadata("design:type", String)
], Url.prototype, "userEmail", void 0);
Url = __decorate([
    Entity()
], Url);
export { Url };
