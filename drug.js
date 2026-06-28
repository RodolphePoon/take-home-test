export const DRUG_NAME = {
  MAGIC_PILL: "Magic Pill",
  HERBAL_TEA: "Herbal Tea",
  FERVEX: "Fervex",
  DAFALGAN: "Dafalgan",
};

class Drug {
  static MAX_BENEFIT = 50;
  static MIN_BENEFIT = 0;
  static BENEFIT_RATE = 1;

  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateExpiredIn() {
    this.expiresIn -= 1;
  }

  update() {
    this.updateExpiredIn();

    if (this.expiresIn < 0) {
      this.benefit = Math.max(
        Drug.MIN_BENEFIT,
        this.benefit - 2 * Drug.BENEFIT_RATE,
      );
    } else {
      this.benefit = Math.max(
        Drug.MIN_BENEFIT,
        this.benefit - Drug.BENEFIT_RATE,
      );
    }

    return this;
  }
}

class MagicPill extends Drug {
  constructor(expiresIn, benefit) {
    super(DRUG_NAME.MAGIC_PILL, expiresIn, benefit);
  }
  update() {
    return this;
  }
}

class HerbalTea extends Drug {
  constructor(expiresIn, benefit) {
    super(DRUG_NAME.HERBAL_TEA, expiresIn, benefit);
  }

  update() {
    super.updateExpiredIn();

    if (this.expiresIn < 0) {
      this.benefit = Math.min(
        Drug.MAX_BENEFIT,
        this.benefit + 2 * Drug.BENEFIT_RATE,
      );
    } else {
      this.benefit = Math.min(
        Drug.MAX_BENEFIT,
        this.benefit + Drug.BENEFIT_RATE,
      );
    }

    return this;
  }
}

class Dafalgan extends Drug {
  constructor(expiresIn, benefit) {
    super(DRUG_NAME.DAFALGAN, expiresIn, benefit);
  }

  update() {
    this.updateExpiredIn();

    this.benefit = Math.max(
      Drug.MIN_BENEFIT,
      this.benefit - 2 * Drug.BENEFIT_RATE,
    );

    return this;
  }
}
class Fervex extends Drug {
  constructor(expiresIn, benefit) {
    super(DRUG_NAME.FERVEX, expiresIn, benefit);
  }

  update() {
    super.updateExpiredIn();

    let benefit = Drug.BENEFIT_RATE;

    if (this.expiresIn < 10) {
      benefit += Drug.BENEFIT_RATE;
    }

    if (this.expiresIn < 5) {
      benefit += Drug.BENEFIT_RATE;
    }

    this.benefit = Math.min(Drug.MAX_BENEFIT, this.benefit + benefit);

    if (this.expiresIn < 0) {
      this.benefit = Drug.MIN_BENEFIT;
    }
    return this;
  }
}
export const DrugFactory = (name, expiresIn, benefit) => {
  switch (name) {
    case DRUG_NAME.MAGIC_PILL:
      return new MagicPill(expiresIn, benefit);
    case DRUG_NAME.HERBAL_TEA:
      return new HerbalTea(expiresIn, benefit);
    case DRUG_NAME.FERVEX:
      return new Fervex(expiresIn, benefit);
    case DRUG_NAME.DAFALGAN:
      return new Dafalgan(expiresIn, benefit);
    default:
      return new Drug(name, expiresIn, benefit);
  }
};
