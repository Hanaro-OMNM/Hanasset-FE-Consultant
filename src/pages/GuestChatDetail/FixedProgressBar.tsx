interface FixedProgressBarProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
}

const FixedProgressBar: React.FC<FixedProgressBarProps> = ({
  capital,
  totalPrice,
  maxLoan,
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
    <div className="px-4">
      <div className="bg-hanaSilver60 rounded-full h-3">
        <div
          className="bg-hanaColor2 rounded-full h-3"
          style={{
            background: backgroundStyle,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FixedProgressBar;
