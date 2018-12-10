import Character from './Character';

export default class Summoner extends Character {
    zombieSpeed: number;
    zombieMaxHp: number;
    zombieAtkPower: number;
    zombieAtkSpeed: number;
    zombieCooldown: number;
    zombieAtkCooldown: number;
    zombieHp: number;
    zombieReady: boolean;
    zombieAtkReady: boolean;
    zombieAlive: boolean;
    
    constructor(hp: number, atkSpeed: number, atkPower: number, zombieSpeed: number, zombieMaxHp: number, zombieAtkPower: number, zombieAtkSpeed: number) {
        super(hp, atkSpeed, atkPower);
        this.zombieSpeed = zombieSpeed;
        this.zombieMaxHp = zombieMaxHp;
        this.zombieAtkPower = zombieAtkPower;
        this.zombieAtkSpeed = zombieAtkSpeed;
        this.zombieCooldown = zombieSpeed;
        this.zombieAtkCooldown = zombieAtkSpeed;
        this.zombieReady = false;
        this.zombieAlive = false;
        this.zombieHp = 0;
    }
    attack(target: Character) {
        if (this.zombieReady &&this.alive) {
            this.zombieCooldown = this.zombieSpeed;
            this.zombieHp = this.zombieMaxHp
            this.zombieAtkCooldown = this.zombieAtkSpeed
            this.zombieAlive = true
            this.zombieAtkReady = false
            this.zombieReady = false
            this.atkCooldown = this.atkSpeed;
            this.atkReady = false;
        }
        else {
            super.attack(target);
            if (this.zombieAlive && this.zombieAtkReady) {
                target.getHit(this.zombieAtkPower);
            }
        }
    }
    getHit(power: number) {
        if (this.zombieAlive) {
            this.zombieHp -= power;
            this.zombieAlive = this.zombieHp > 0;
        }
        else {
            super.getHit(power)
        }
    }
    wait(time: number) {
        super.wait(time);
        this.zombieCooldown = this.preciseSub(this.zombieCooldown, time);
        this.zombieAtkCooldown = this.preciseSub(this.zombieAtkCooldown, time);
        this.zombieReady = this.zombieCooldown <= 0 && ! this.zombieAlive
        this.zombieAtkReady = this.zombieAtkCooldown <= 0 && this.zombieAlive
    }
}