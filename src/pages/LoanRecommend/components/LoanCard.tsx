import clsx from 'clsx';

// LoanName Components
interface LoanNameProps {
  isBest: boolean;
  name: string;
}

const LoanName: React.FC<LoanNameProps> = ({ isBest, name }) => {
  return (
    <h6
      className={clsx(
        isBest && 'mb-1 text-hanaBlack20 text-lg  text-left',
        !isBest && 'mb-1 text-hanaBlack80 text-lg text-left'
      )}
    >
      {name}
    </h6>
  );
};

// LoanRate Components
interface LoanRateProps {
  isBest: boolean;
  rate: number;
}

const LoanRate: React.FC<LoanRateProps> = ({ isBest, rate }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold mt-auto',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold mt-auto'
      )}
    >
      {`${rate}%`}
    </h6>
  );
};

// LoanLimit Components
interface LoanLimitProps {
  isBest: boolean;
  limit: number;
}

const LoanLimit: React.FC<LoanLimitProps> = ({ isBest, limit }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold'
      )}
    >
      {`${limit}억 원`}
    </h6>
  );
};

// LoanNewDsr Components
interface LoanNewDsrProps {
  isBest: boolean;
  dsr: number;
}

const LoanDsr: React.FC<LoanNewDsrProps> = ({ isBest, dsr }) => {
  return (
    <h6
      className={clsx(
        isBest && 'h-5 text-hanaGold20 text-xs font-semibold',
        !isBest && 'h-5 text-hanaBlack60 text-xs font-semibold'
      )}
    >
      {`DSR ${dsr}%`}
    </h6>
  );
};

// LoanCard Components
interface LoanCardProps {
  isBest: boolean;
  isShow: boolean;
  loanId: number;
  name: string;
  rate: number;
  limit: number;
  dsr: number;
  onLoanDetailButtonClick: React.Dispatch<React.SetStateAction<number | null>>;
}

const LoanCard: React.FC<LoanCardProps> = ({
  isBest,
  isShow,
  loanId,
  name,
  rate,
  limit,
  dsr,
  onLoanDetailButtonClick,
}) => {
  return (
    <div className={clsx(!isShow && 'hidden')}>
      <button
        className="mb-3 w-full"
        onClick={() => onLoanDetailButtonClick(loanId)}
      >
        <div
          className={clsx(
            'p-4 rounded-lg shadow transition-transform duration-100',
            isBest ? 'bg-hanaColor2' : 'bg-hanaSilver20',
            'hover:shadow-lg hover:scale-105'
          )}
        >
          <div className="flex-col">
            <LoanName isBest={isBest} name={name} />
            <div className="mt-1 pt-1 flex justify-between">
              <LoanRate isBest={isBest} rate={rate} />
              <LoanLimit isBest={isBest} limit={limit} />
              <LoanDsr isBest={isBest} dsr={dsr} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default LoanCard;
