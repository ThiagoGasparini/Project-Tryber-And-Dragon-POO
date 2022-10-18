import SimpleFighter from './Fighter/SimpleFighter';
import Race, { Elf } from './Races';
import Energy from './Energy';
import Archetype, { Mage } from './Archetypes';
import getRandomInt from './utils';

export default class Character implements SimpleFighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number; 
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;
  private _name: string;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
    this._name = name;
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return ({
      type_: this._energy.type_,
      amount: this._energy.amount,
    });
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage > 0) this._lifePoints -= damage;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    const incAttributes = getRandomInt(1, 10);
    if (this._lifePoints + incAttributes < this._race.maxLifePoints) {
      this._maxLifePoints += incAttributes;
    } else {
      this._maxLifePoints = this.race.maxLifePoints;
    } 
    this._energy.amount = 10;
    this._strength += incAttributes;
    this._dexterity += incAttributes;
    this._defense += incAttributes;
    this._lifePoints = this._maxLifePoints;
  }
}