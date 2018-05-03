const Type = require('./type.js');
const IdentifierExpression = require('./identifier-expression');

module.exports = class RecordType {
  constructor(fields) {
    Object.assign(this, { fields });
  }

  analyze(context) {
    // Creates a mapping of each string representation of a type to the actual
    // type it is referencing. This allows for recursively checking through
    // sum types in the case of nested sum types.
    // this.computedTypes = {};
    // this.types.forEach((type) => {
    //   const typeId = type instanceof IdentifierExpression ? type.id : type;
    //   this.computedTypes[typeId] = Type.cache[typeId] || context.lookupSumType(typeId);
    // });
    // TODO
    // assign
  }

  isCompatibleWith(otherType) {
    // return Object.keys(this.computedTypes)
    //   .some(typeKey => this.computedTypes[typeKey].isCompatibleWith(otherType));
  }

  /* eslint-disable class-methods-use-this */
  optimize() {
    // Later we can implement an optimization step that further reduces sum types
    // to basic types.
  }
};
