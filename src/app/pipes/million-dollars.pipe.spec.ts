import { MillionDollarsPipe } from './million-dollars.pipe';

describe('MillionDollarsPipe', () => {
  it('create an instance', () => {
    const pipe = new MillionDollarsPipe();
    expect(pipe).toBeTruthy();
  });
});
