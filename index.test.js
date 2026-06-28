import fs from "fs";

describe("compare _output.json and output.json", () => {
  it("should be the same", () => {
    const _output = JSON.parse(fs.readFileSync("./_output.json", "utf8"));
    const output = JSON.parse(fs.readFileSync("./output.json", "utf8"));

    expect(_output).toEqual(output);
  });
});
