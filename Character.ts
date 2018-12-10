export default class Character {
    hp: number;
    atkSpeed: number;
    atkPower: number;
    atkCooldown: number;
    atkReady: boolean;
    alive: boolean;
    constructor(hp: number, atkSpeed: number, atkPower: number) {
        this.hp = hp;
        this.atkSpeed = atkSpeed;
        this.atkPower = atkPower;
        this.atkCooldown = this.atkSpeed;
        this.atkReady = false;
        this.alive = true;
    }
    preciseSub(a: number, b: number): number {
        return parseFloat((a-b).toFixed(2))
    }
    attack(target: Character) {
        if (this.atkReady && this.alive) {
            target.getHit(this.atkPower); 
            this.atkReady = false
            this.atkCooldown = this.atkSpeed
        }
    }
    getHit(power: number) {
        this.hp -= power;
        this.alive = this.hp > 0;
    }
    wait(time: number) {
        this.atkCooldown = this.preciseSub(this.atkCooldown, time);
        this.atkReady = this.atkCooldown <= 0;
    }
}