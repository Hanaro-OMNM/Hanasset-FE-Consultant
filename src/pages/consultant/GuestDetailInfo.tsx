interface GuestDetailInfoProps {
  name: string;
  age: number;
  job: string;
  income: number;
  capital: number;
  hasHome: boolean;
  annualInterest: number;
  annualPrinciple: number;
  dsr: number;
}

const GuestDetailInfo: React.FC<GuestDetailInfoProps> = ({
  name,
  age,
  job,
  income,
  capital,
  hasHome,
  annualInterest,
  annualPrinciple,
  dsr,
}) => {
  return (
    <div className="flex flex-col gap-y-2 px-2 text-hanaBlack80 font-semibold">
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      <p>직업: {job}</p>
      <p>연소득: {income.toLocaleString()}만 원</p>
      <p>자본금: {capital.toLocaleString()}만 원</p>
      <p>보유 주택: {hasHome ? '있음' : '없음'}</p>
      <p> 연이자 상환액: {annualInterest}</p>
      <p> 연원금 상환액: {annualPrinciple}</p>
      <p>현재 DSR: {dsr}%</p>
    </div>
  );
};

export default GuestDetailInfo;
