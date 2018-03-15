const fs = require('fs');
const parse = require('../syntax/parser');



let file = parse("lulu := true");
const util = require('util');

console.log(util.inspect(file, {showHidden: false, depth: null}));
/* eslint-enable no-undef */
describe('Declarations', () => {
  const grammar = LegalVisaCardNumberGrammar;
  it ("correctly parse declarations", () => {
    const testAST = {
      Program: {
        Body: {
          statements:
        }
      }
    };

  });

  it ("should fail parsing", ()=> {
    expect(parse(grammar, "510510510510510")).toBe(false);
    expect(parse(grammar, "4105105105105101")).toBe(false);
    expect(parse(grammar, "4")).toBe(false);
    expect(parse(grammar, "")).toBe(false);
  });
});
