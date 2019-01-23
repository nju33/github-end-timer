import {getTime} from './sum-time';

test('', () => {
  expect(getTime('fix: ... [wh 2.5]')).toBe(2.5);
});