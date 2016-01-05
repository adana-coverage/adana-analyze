import path from 'path';
import { readFileSync } from 'fs';
import { expect } from 'chai';

import lines from '../../src/lines';

const fixture = path.join(__dirname, '/../fixture/coverage.json');
const data = JSON.parse(readFileSync(fixture, 'utf8'));
const coverage = data['src/instrumenter.js'];

it('should calculate correct lines', () => {
  const result = lines(coverage.locations);
  expect(result).to.have.property('length', 457);
});
