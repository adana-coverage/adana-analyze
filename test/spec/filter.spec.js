import path from 'path';
import { readFileSync } from 'fs';
import { expect } from 'chai';

import filter from '../../src/filter';

const fixture = path.join(__dirname, '/../fixture/coverage.json');
const data = JSON.parse(readFileSync(fixture, 'utf8'));
const coverage = data['src/instrumenter.js'];

it('should filter', () => {
  const result = filter(coverage.locations, [
    { rule: 'include', tag: 'branch' },
    { rule: 'exclude', tag: 'line' },
  ]);
  result.forEach(({ tags }) => {
    expect(tags).to.not.contain('line');
    expect(tags).to.contain('branch');
  });
});
