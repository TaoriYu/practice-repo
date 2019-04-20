import { classToPlain, plainToClass } from 'class-transformer';
import { date } from '../date';

describe('date transformer test suite', () => {
  class TestTransform {
    @date()
    public date: Date = new Date();
  }

  it('should transform utc date in Date', () => {
    const parsedDate = new Date('2019-04-20T16:36:00+00:00');
    const testData = { date: '2019-04-20T16:36:00+00:00' };

    expect(plainToClass(TestTransform, testData).date.toUTCString())
      .toEqual(parsedDate.toUTCString());
  });

  it('should transform Date in unix timestamp', () => {
    // '2019-04-20T16:36:00+00:00'
    const parsedTimestamp = 1555778160000;
    const instance = plainToClass(TestTransform, { date: '2019-04-20T16:36:00+00:00' });

    expect(classToPlain(instance)).toEqual({ date: parsedTimestamp });
  });
});
