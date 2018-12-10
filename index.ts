class Character {
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

class Warrior extends Character {
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

class Mage extends Character {
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

class Summoner extends Character {
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

const defence: number = 0.5;
const fireBallSpeed: number = 2;
const zombieAtkPower: number = 10;
const zombieSpeed = 2.5; 

const fight = (defence, fireBallSpeed, zombieAtkPower, zombieSpeed, p1Class, p2Class) => {
    const hp = 500;
    const atkSpeed = 0.5;
    const atkPower = 30;

    const fireBallPower = 100;

    const zombieMaxHp: number = 50;
    const zombeieAtkSpeed: number = 0.5;
    
    const tick: number = 0.1;
    let time: number = 0;
    const createCharacter = (type) => {
        switch(type) {
            case "warrior": return new Warrior(hp, atkSpeed, atkPower, defence);
            case "mage": return new Mage(hp, atkSpeed, atkPower, fireBallSpeed, fireBallPower);
            case "summoner": return new Summoner(hp, atkSpeed, atkPower, zombieSpeed, zombieMaxHp, zombieAtkPower, zombeieAtkSpeed);
        }
    };
    const p1 = createCharacter(p1Class);
    const p2 = createCharacter(p2Class);
    while (p1.alive && p2.alive) {
        p1.wait(tick);
        p2.wait(tick);
        p1.attack(p2);
        p2.attack(p1);
        time += tick;
    }

}
