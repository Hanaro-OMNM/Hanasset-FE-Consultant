import clsx from 'clsx';
import { useState } from 'react';
import CommonBackground from '../../../components/atoms/CommonBackground';
import SemiTitle from '../../../components/atoms/SemiTitle';
import LoanSlider from '../../../components/molecules/LoanSlider';

interface ExpectationProps {
  title?: string;
  totalPrice: number;
  maxLoan: number; // 최대 대출 가능 금액
}
const Expectation: React.FC<ExpectationProps> = ({
  title,
  totalPrice,
  maxLoan,
}) => {
  // 자본금, 대출금, 부족 금액 계산
  const [capital, setCapital] = useState(totalPrice - maxLoan);
  const shortage = Math.max(0, totalPrice - (capital + maxLoan));

  return (
    <div className="w-full mb-4 py-6">
      {title && <SemiTitle>{title}</SemiTitle>}
      <CommonBackground className="p-6 h-40">
        <div
          className={clsx(
            'bg-hanaRed40 w-48 h-8 text-hanaGold20 text-xs rounded-md p-2 mx-2 shadow-lg',
            shortage > 0 ? 'visible' : 'invisible' // visible 상태를 조정하여 공간 고정
          )}
          style={{ left: `${(capital / totalPrice) * 100}%` }}
        >
          ⚠️ 앗 대출 한도를 넘었어요 &nbsp;
          <span className="text-hanaRed font-fontBold">
            {shortage.toFixed(1)}억
          </span>
        </div>
        {/* Slider */}
        <LoanSlider
          capital={capital}
          totalPrice={totalPrice}
          maxLoan={maxLoan}
          onChange={setCapital}
        />

        {/* 정보 표시 */}
        <div className="flex justify-around mt-4 font-fontLight">
          <div className="flex-col text-hanaBlack80 text-center">
            <div className="text-sm text-hanaSilver80">자본금</div>
            <div>{capital.toFixed(1)}억</div>
          </div>
          <div className="flex-col text-hanaBlack80 text-center">
            <div className="text-sm text-hanaSilver80">대출금</div>
            <div>
              {Math.min(Number(totalPrice - capital), maxLoan).toFixed(1)}억
            </div>
          </div>
        </div>
      </CommonBackground>
    </div>
  );
};
export default Expectation;
