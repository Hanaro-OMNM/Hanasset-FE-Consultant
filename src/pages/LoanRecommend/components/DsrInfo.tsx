import CommonBackground from '../../../components/atoms/CommonBackground';
import LoanProgressBar from '../../../components/atoms/LoanProgressBar';

interface DsrInfoProps {
  dsr: number;
}

const DsrInfo: React.FC<DsrInfoProps> = ({ dsr }) => {
  return (
    <div>
      <CommonBackground className="p-4">
        <p className="my-2 px-4 text-hanaBlack80 font-semibold">
          현재 DSR {dsr}%
        </p>
        <LoanProgressBar rate={dsr} />
      </CommonBackground>
    </div>
  );
};

export default DsrInfo;
