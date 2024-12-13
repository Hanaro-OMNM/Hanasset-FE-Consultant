interface LoanProgressBarProps {
  rate: number;
}

const LoanProgressBar: React.FC<LoanProgressBarProps> = ({ rate }) => {
  return (
    <div className="px-4">
      <div className="mb-8 bg-hanaSilver60 rounded-full h-4">
        <div
          className="bg-hanaColor2 rounded-full h-4"
          style={{
            width: `${rate}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoanProgressBar;
