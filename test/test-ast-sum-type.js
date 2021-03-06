const { parse } = require( '../built/syntax/parser');
const assert = require('assert');

/* eslint-disable no-undef */
describe('Sum Types', () => {
  const expected = {
    body: {
      statements: [
        {
          id: '',
          sumType: '',
        },
      ],
    },
  };

  beforeEach(() => {
    // Clear out the test object before each run.
    expected.body.statements[0] = {
      id: '',
      sumType: {},
    };
  });

  it('should be correctly parsed with basic types', () => {
    expected.body.statements[0].id = 'testID';
    expected.body.statements[0].sumType = { types: ['number', 'boolean'] };
    const result = parse('type testID: number | boolean');
    assert.deepEqual(result, expected);
  });

  it('should be correctly parsed with variable expression types', () => {
    expected.body.statements[0].id = 'testID2';
    expected.body.statements[0].sumType = {
      types: [{ id: 'testType' }, { id: 'testType2' }, { id: 'testType3' }],
    };
    const result = parse('type testID2: testType | testType2 | testType3');
    assert.deepEqual(result, expected);
  });

  it('should be correctly parsed with many different expression types', () => {
    expected.body.statements[0].id = 'testID3';
    expected.body.statements[0].sumType = {
      types: [
        'boolean',
        'string',
        'number',
        { id: 'customType' },
        'any',
        'error',
        { listType: 'number' },
      ],
    };
    const result = parse('type testID3: boolean | string | number | customType | any | error | list number');
    assert.deepEqual(result, expected);
  });
});
