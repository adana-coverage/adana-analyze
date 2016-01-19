import path from 'path';
import { readFileSync } from 'fs';
import { expect } from 'chai';

import tags from '../../src/tags';

const fixture = path.join(__dirname, '/../fixture/coverage.json');
const data = JSON.parse(readFileSync(fixture, 'utf8'));
const coverage = data['src/instrumenter.js'];

it('should use tags as keys from the coverage data', () => {
  const result = tags(coverage.locations);
  expect(result).to.have.property('line');
  expect(result).to.have.property('statement');
  expect(result).to.have.property('branch');
  expect(result).to.have.property('function');
});

it('should use locations as values from the coverage data', () => {
  const result = tags(coverage.locations);
  expect(result.line).to.be.an.instanceof(Array);
  expect(result.line).to.have.property('length', 99);
});

it('should select non-existant tags as empty arrays', () => {
  const result = tags(coverage.locations, [ 'foo' ]);
  expect(result.foo).to.be.an.instanceof(Array);
  expect(result.foo).to.have.property('length', 0);
});
