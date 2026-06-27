export class Drug {

  static MAX_BENEFIT = 50;
  static MIN_BENEFIT = 0;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  update() {

    if (this.name === "Magic Pill") {
      return this;
    }

    this.expiresIn -= 1;

    switch (this.name) {
      case "Herbal Tea":
        this.updateHerbalTea();
        break;
      case "Fervex":
        this.updateFervex();
        break;
      case "Dafalgan":
        this.updateDafalgan();
        break;
      default:
        this.updateDefault();
        break;
    }

    return this;
  }

  updateDefault() {

    if (this.expiresIn < 0) {
      this.benefit = Math.max(Drug.MIN_BENEFIT, this.benefit - 2);
    } else {
      this.benefit = Math.max(Drug.MIN_BENEFIT, this.benefit - 1);
    }
  }

  updateHerbalTea() {
    if (this.expiresIn < 0) {
      this.benefit = Math.min(Drug.MAX_BENEFIT, this.benefit + 2);
    } else {
      this.benefit = Math.min(Drug.MAX_BENEFIT, this.benefit + 1);
    }
  }

  updateFervex() {
    let benefit = 1

    if (this.expiresIn < 10) {
      benefit += 1
    }

    if (this.expiresIn < 5) {
      benefit += 1
    }

    this.benefit = Math.min(Drug.MAX_BENEFIT, this.benefit + benefit);

    if (this.expiresIn < 0) {
      this.benefit = Drug.MIN_BENEFIT;
    }
  }

  updateDafalgan() {
    this.benefit = Math.max(Drug.MIN_BENEFIT, this.benefit - 2);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    return this.drugs.map(drug => drug.update());
  }
}
