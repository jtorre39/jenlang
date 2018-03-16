// Parser module specifically for jen
//
// Heavily inspired by Ray Toal's parser for iki:
// https://github.com/rtoal/iki-compiler
//
// For use:
//
// const parser = require('./parser');
// const program = parse(sourceCodeString);

const ohm = require('ohm-js');
const fs = require('fs');
const withIndentsAndDedents = require('./preparser.js');

const Program = require('../ast/program');
const Body = require('../ast/body');
const VarDec = require('../ast/variable-declaration');
const VarAsgn = require('../ast/assignment-statement');
const BooleanLiteral = require('../ast/boolean-literal');
const NumericLiteral = require('../ast/numeric-literal');
const StringLiteral = require('../ast/string-literal');
const WhileStatement = require('../ast/while-statement');
const BinaryExpression = require('../ast/binary-expression.js');
const UnaryExpression = require('../ast/unary-expression.js');
const SubscriptedExpression = require('../ast/subscripted-expression');
// const TernaryExpression = require('../ast/ternary-expression.js');

const grammar = ohm.grammar(fs.readFileSync('./syntax/jen.ohm'));
const astGenerator = grammar.createSemantics().addOperation('ast', {
  Program(_1, body, _2) { return new Program(body.ast()); },
  Body(_1, expressionsAndStatements, _2) { return new Body(expressionsAndStatements.ast()); },
  Suite(_1, _2, body, _3) { return body.ast(); },

  Declaration(ids, _, exps) { return new VarDec(ids.ast(), exps.ast()); },
  Assignment(ids, _, exps) { return new VarAsgn(ids.ast(), exps.ast()); },
  While(_1, exps, _2, suite) { return new WhileStatement(exps.ast(), suite.ast()); },
  Exp0_and(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp0_or(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp0_xor(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp1_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp2_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp3_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp4_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp5_not(op, operand) { return new UnaryExpression(op.ast(), operand.ast()); },
  Exp6_binary(left, op, right) { return new BinaryExpression(op.ast(), left.ast(), right.ast()); },
  Exp7_parens(_1, expression, _2) { return expression.ast(); },

  // SubscriptExp (id, _1, expression, _2) {
  //  return new SubscriptedExpression(id.ast(), expression.ast());
  // },
  NonemptyListOf(first, _, rest) { return [first.ast(), ...rest.ast()]; },
  varId(_1, _2) { return this.sourceString; },
  constId(_1, _2) { return this.sourceString; },
  packageId(_1, _2) { return this.sourceString; },
  booleanLiteral(_) { return new BooleanLiteral(!!this.sourceString); },
  numLiteral(_) { return new NumericLiteral(+this.sourceString); },
  stringLiteral(_1, chars, _2) { return new StringLiteral(this.sourceString); },
  _terminal() { return this.sourceString; },
});

module.exports = (text) => {
  const match = grammar.match(withIndentsAndDedents(text));
  if (!match.succeeded()) {
    throw match.message;
  }

  return astGenerator(match).ast();
};