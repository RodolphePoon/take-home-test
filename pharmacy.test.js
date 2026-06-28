import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("should decrease the benefit twice as fast when expired", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)],
    );
  });

  it("should not decrease the benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)],
    );
  });

  describe("Herbal Tea", () => {
    it("should increase the benefit the older it gets", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });

    it("should increase the benefit twice as fast when expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", -1, 5)]);
    });

    it("should not increase the benefit above 50", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Herbal Tea", 1, 50)]);
    });
  });

  describe("Magic Pill", () => {
    it("should not decrease the benefit or expiresIn", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Magic Pill", 2, 3)]);
    });
  });

  describe("Fervex", () => {
    it("should increase the benefit by 1 when expiresIn is above 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 11, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 10, 4)]);
    });

    it("should increase the benefit by 2 when expiresIn is between 6 and 10", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 9, 5)]);
    });

    it("should increase the benefit by 3 when expiresIn is between 1 and 5", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 4, 6)]);
    });

    it("should not increase the benefit above 50", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 2, 50)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", 1, 50)]);
    });

    it("should drop the benefit to 0 when expired", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });

  describe("Dafalgan", () => {
    it("should decrease the benefit twice as fast as normal drugs", () => {
      expect(
        new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue(),
      ).toEqual([new Drug("Dafalgan", 1, 1)]);
    });
  });
});
