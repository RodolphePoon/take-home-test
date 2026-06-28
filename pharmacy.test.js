import { Pharmacy } from "./pharmacy";
import { DrugFactory, DRUG_NAME } from "./drug";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([DrugFactory("test", 2, 3)]).updateBenefitValue(),
    ).toEqual([DrugFactory("test", 1, 2)]);
  });

  it("should decrease the benefit twice as fast when expired", () => {
    expect(
      new Pharmacy([DrugFactory("test", 0, 3)]).updateBenefitValue(),
    ).toEqual([DrugFactory("test", -1, 1)]);
  });

  it("should not decrease the benefit below 0", () => {
    expect(
      new Pharmacy([DrugFactory("test", 2, 0)]).updateBenefitValue(),
    ).toEqual([DrugFactory("test", 1, 0)]);
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit the older it gets", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.HERBAL_TEA, 2, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.HERBAL_TEA, 1, 4)]);
    });

    it("should increase the benefit twice as fast when expired", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.HERBAL_TEA, 0, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.HERBAL_TEA, -1, 5)]);
    });

    it("should not increase the benefit above 50", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.HERBAL_TEA, 2, 50),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.HERBAL_TEA, 1, 50)]);
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease the benefit or expiresIn", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.MAGIC_PILL, 2, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.MAGIC_PILL, 2, 3)]);
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit by 1 when expiresIn is above 10", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.FERVEX, 11, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.FERVEX, 10, 4)]);
    });

    it("should increase the benefit by 2 when expiresIn is between 6 and 10", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.FERVEX, 10, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.FERVEX, 9, 5)]);
    });

    it("should increase the benefit by 3 when expiresIn is between 1 and 5", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.FERVEX, 5, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.FERVEX, 4, 6)]);
    });

    it("should not increase the benefit above 50", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.FERVEX, 2, 50),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.FERVEX, 1, 50)]);
    });

    it("should drop the benefit to 0 when expired", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.FERVEX, 0, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.FERVEX, -1, 0)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit twice as fast as normal drugs", () => {
      expect(
        new Pharmacy([
          DrugFactory(DRUG_NAME.DAFALGAN, 2, 3),
        ]).updateBenefitValue(),
      ).toEqual([DrugFactory(DRUG_NAME.DAFALGAN, 1, 1)]);
    });
  });
});
