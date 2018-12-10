import Character from './Character';

export default class Warrior extends Character {
    defence: number;
    constructor(hp: number, atkSpeed: number, atkPower: number, defence: number) {
        super(hp, atkSpeed, atkPower);
        this.defence = defence;
    }
    getHit(power: number) {
        this.hp -= power * (1 - this.defence);
        this.alive = this.hp > 0;
    }
}