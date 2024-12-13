import CommonBackground from '../../components/atoms/CommonBackground';
import DetailInformtation from './DetailInformation';
import FixedProgressBar from './FixedProgressBar';
import OverflowIndicator from './OverflowIndicator';

interface FixedExpectationProps {
  capital: number;
  totalPrice: number;
  maxLoan: number;
}
const FixedExpectation: React.FC<FixedExpectationProps> = ({
  capital,
  totalPrice,
  maxLoan,
}) => {
  return (
    <div className="w-full mb-4 py-6">
      <CommonBackground className="p-6 h-40">
        <OverflowIndicator
          capital={capital}
          totalPrice={totalPrice}
          maxLoan={maxLoan}
        />

        <FixedProgressBar
          capital={capital}
          totalPrice={totalPrice}
          maxLoan={maxLoan}
        />

        <DetailInformtation
          capital={capital}
          totalPrice={totalPrice}
          maxLoan={maxLoan}
        />
      </CommonBackground>
    </div>
  );
};
export default FixedExpectation;
