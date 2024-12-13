interface LoanDetailHintProps {
  content: string;
}

const LoanDetailHint: React.FC<LoanDetailHintProps> = ({ content }) => {
  return (
    <div className="mt-1 mb-2 px-4 text-xs text-hanaBlack60">{content}</div>
  );
};

export default LoanDetailHint;
