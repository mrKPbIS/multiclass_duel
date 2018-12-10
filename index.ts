import Warrior from './Warrior';
import Mage from './Mage';
import Summoner from './Summoner';

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
    return {
        player1: {
            hp: p1.hp,
            alive: p1.alive
        },
        player2: {
            hp: p2.hp,
            alive: p2.hp
        },
        time
    }

}

fight(defence, fireBallSpeed, zombieAtkPower, zombieSpeed, 'warrior', 'summoner');