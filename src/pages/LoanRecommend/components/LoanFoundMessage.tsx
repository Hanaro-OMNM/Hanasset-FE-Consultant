import SemiTitle from '../../../components/atoms/SemiTitle';

interface LoanFoundMessageProps {
  isFound: boolean;
}

const LoanFoundMessage: React.FC<LoanFoundMessageProps> = ({ isFound }) => {
  return <SemiTitle>{isFound ? '' : '대출 상품을 찾지 못했어요'}</SemiTitle>;
};

export default LoanFoundMessage;
