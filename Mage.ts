import Character from './Character';

export default class Mage extends Character {
    fireBallSpeed: number;
    fireBallPower: number;
    fireBallCooldown: number;
    fireballReady: boolean;
    constructor(hp: number, atkSpeed: number, atkPower: number, fireBallSpeed: number, fireBallPower: number) {
        super(hp, atkSpeed, atkPower);
        this.fireBallSpeed = fireBallSpeed;
        this.fireBallPower = fireBallPower;
        this.fireBallCooldown = fireBallSpeed;
        this.fireballReady = false;
    }
    attack(target: Character) {
        if (this.fireballReady &&this.alive) {
            target.getHit(this.fireBallPower);
            this.fireballReady = false;
            this.fireBallCooldown = this.fireBallSpeed;
            this.atkCooldown = this.atkSpeed;
            this.atkReady = false;
        }
        else {
            super.attack(target);
        }
    }
    wait(time: number) {
        super.wait(time);
        this.fireBallCooldown = this.preciseSub(this.fireBallCooldown, time);
        this.fireballReady = this.fireBallCooldown <= 0;
    }
}