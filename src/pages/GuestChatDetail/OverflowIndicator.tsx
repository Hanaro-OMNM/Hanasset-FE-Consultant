import clsx from 'clsx';

interface OverflowIndicatorProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
}
const OverflowIndicator: React.FC<OverflowIndicatorProps> = ({
  capital,
  totalPrice,
  maxLoan,
}) => {
  const shortage = Math.max(0, totalPrice - (capital + maxLoan));
  return (
    <div
      className={clsx(
        'bg-hanaRed40 w-56 h-8 text-hanaGold20 text-xs rounded-md p-2 mb-2 mx-4 shadow-lg',
        shortage > 0 ? 'visible' : 'invisible'
      )}
      style={{ left: `${(capital / totalPrice) * 100}%` }}
    >
      ⚠️ 앗 대출 한도를 넘었어요 &nbsp;
      <span className="text-hanaRed font-fontBold">{shortage}천만 원</span>
    </div>
  );
};

export default OverflowIndicator;
