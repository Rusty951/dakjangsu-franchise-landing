// Meeting scenario, in KRW 10,000 units. Commercial terms remain unconfirmed.
export const supportExample = {
  opening: 740,
  kitchen: 500,
  salesPeriods: [
    { monthlySales: 3000, months: 12 },
    { monthlySales: 4000, months: 12 },
  ],
};
export const monthlyLogisticsCredit = sales => sales >= 4000 ? 100 : sales >= 3000 ? 30 : 0;
export function calculateSupportExample({ opening, kitchen, salesPeriods }) {
  const periods = salesPeriods.map(period => ({ ...period, monthlyCredit: monthlyLogisticsCredit(period.monthlySales) }));
  const logistics = periods.reduce((sum, period) => sum + period.monthlyCredit * period.months, 0);
  // Franchise/education waiver is already inside opening. Royalty is separate.
  return { opening, kitchen, periods, logistics, total: opening + kitchen + logistics };
}
export const supportCalculation = calculateSupportExample(supportExample);
export const formatSupportAmount = value => new Intl.NumberFormat('ko-KR').format(value);
