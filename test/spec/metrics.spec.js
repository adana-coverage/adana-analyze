import path from 'path';
import { readFileSync } from 'fs';
import { expect } from 'chai';

import tags from '../../src/tags';
import metrics from '../../src/metrics';

it('should calculate correct metrics', () => {
  const fixture = path.join(__dirname, '/../fixture/coverage.json');
  const data = JSON.parse(readFileSync(fixture, 'utf8'));
  const coverage = data['src/instrumenter.js'];
  const result = tags(coverage.locations);
  expect(metrics(result.function)).to.have.property('total', 22);
  expect(metrics(result.line)).to.have.property('total', 99);
  expect(metrics(result.branch)).to.have.property('total', 79);
});

it('should evaluate metrics value to one when tag is missing', () => {
  const fixture = path.join(__dirname, '/../fixture/coverage-no-branch.json');
  const data = JSON.parse(readFileSync(fixture, 'utf8'));
  const coverage = data['src/no-branch.js'];
  const result = tags(coverage.locations, [ 'branch' ]);
  expect(metrics(result.branch)).to.have.property('total', 0);
  expect(metrics(result.branch)).to.have.property('passed', 0);
  expect(metrics(result.branch)).to.have.property('value', 1);
});
