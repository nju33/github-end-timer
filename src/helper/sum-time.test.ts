import {getTime} from './sum-time';

test('', () => {
  expect(getTime('fix: ... [wt 2.5]')).toBe(2.5);
  expect(getTime('fix: ... [et 2.5]')).toBe(2.5);
});