import {
  amountInPaid,
  amountOutPaid,
  calcTotalInUnpaid,
  calcTotalOutUnpaid,
  calcTotalInPaid,
  calcTotalOutPaid,
  calcTotalInAndOut,
  calcTotalIn,
  calcTotalOut,
  stringToFloat,
} from '../../../src/utils/transactionCalcs';
import { transactions } from './__mocks__/transactions';

describe('transactionCalcs', () => {
  it('amountInPaid', () => {
    expect(amountInPaid(
      calcTotalIn(transactions),
      calcTotalInPaid(transactions),
    )).toBe(95.23809523809524);
  });

  it('amountOutPaid', () => {
    expect(amountOutPaid(
      calcTotalOut(transactions),
      calcTotalOutPaid(transactions),
    )).toBe(99.17490387630158);
  });

  it('calcTotalInPaid', () => {
    expect(calcTotalInPaid(transactions)).toBe(1000);
  });

  it('calcTotalOutPaid', () => {
    expect(calcTotalOutPaid(transactions)).toBe(600.99);
  });
  it('calcTotalInUnpaid', () => {
    expect(calcTotalInUnpaid(transactions)).toBe(50);
  });

  it('calcTotalOutUnpaid', () => {
    expect(calcTotalOutUnpaid(transactions)).toBe(5);
  });

  it('calcTotalOut', () => {
    expect(calcTotalOut(transactions)).toBe(605.99);
  });
  it('calcTotalIn', () => {
    expect(calcTotalIn(transactions)).toBe(1050);
  });

  it('calcTotalInAndOut', () => {
    expect(calcTotalInAndOut(transactions)).toBe(444.01);
  });

  it('stringToFloat', () => {
    expect(stringToFloat('0.00')).toBe(0);
    expect(stringToFloat('0.12')).toBe(0.12);
    expect(stringToFloat('1.12')).toBe(1.12);
    expect(stringToFloat('1000.00')).toBe(1000);
  });
});
