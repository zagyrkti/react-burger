import { getDaysSinceDate } from './auxiliary';


describe('getDaysSinceDate function', () => {
  test('days since is precise', () => {
    expect(getDaysSinceDate("2022-05-15T20:55:59.831", "2022-05-19T20:55:59.831")).toBe(4);
    expect(getDaysSinceDate("2020-05-19T20:55:59.831", "2022-05-19T20:55:59.831")).toBe(730);
    expect(getDaysSinceDate("2021-12-31T20:55:59.831", "2022-01-01T00:55:59.831")).toBe(1);
  })
})