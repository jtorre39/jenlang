export class BreakStatement {
  constructor() { // eslint-disable-line
    // Intentionally empty
  }

  analyze(context: any) { // eslint-disable-line class-methods-use-this
    context.assertInLoop('Break statement outside loop');
  }

  optimize() {
    return this;
  }

  // Depends on the generator, will be filled in later.
  gen() { }
};
