interface LoanSliderProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
  onChange: (capital: number) => void;
}

const LoanSlider: React.FC<LoanSliderProps> = ({
  capital,
  totalPrice,
  maxLoan,
  onChange,
}) => {
  let backgroundStyle;

  if (capital < totalPrice - maxLoan) {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #00CC9C 0%,                               /* 자본금 시작 (녹색) */
        #00CC9C ${(capital / totalPrice) * 100}%, /* 자본금 비율 */
        #E90061 ${(capital / totalPrice) * 100}%, /* 부족 금액 시작 (빨간색) */
        #E90061 ${((totalPrice - maxLoan) / totalPrice) * 100}%, /* 부족 금액 비율 */
        #E0E0E0 ${((totalPrice - maxLoan) / totalPrice) * 100}%, /* 대출금 시작 (연한 회색) */
        #E0E0E0 100%                               /* 대출금 끝 */
      )
    `;
  } else {
    backgroundStyle = `
      linear-gradient(
        to right, 
        #00CC9C 0%,                               /* 자본금 시작 (녹색) */
        #00CC9C ${(capital / totalPrice) * 100}%, /* 자본금 비율 */
        #E0E0E0 ${Math.ceil((capital / totalPrice) * 100)}%, /* 대출금 시작 (연한 회색) */
        #E0E0E0 100%                               /* 대출금 끝 */
      )
    `;
  }

  return (
    <div className="px-2">
      <input
        type="range"
        min="0"
        max={totalPrice}
        value={capital}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-hanaGreen h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: backgroundStyle,
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default LoanSlider;
