import { Pharmacy } from "./pharmacy";
import { DRUG_NAME, DrugFactory } from "./drug";
import fs from "fs";

const drugs = [
  DrugFactory("Doliprane", 20, 30),
  DrugFactory(DRUG_NAME.HERBAL_TEA, 10, 5),
  DrugFactory(DRUG_NAME.FERVEX, 12, 35),
  DrugFactory(DRUG_NAME.MAGIC_PILL, 15, 40),
];
const pharmacy = new Pharmacy(drugs);

const log = [];

for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
}

/* eslint-disable no-console */
fs.writeFile(
  "output.json",
  JSON.stringify({ result: log }, null, 2).concat("\n"),
  (err) => {
    if (err) {
      console.log("error");
    } else {
      console.log("success");
    }
  },
);

/* eslint-enable no-console */
