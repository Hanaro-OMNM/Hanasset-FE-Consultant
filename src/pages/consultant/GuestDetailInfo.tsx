interface GuestDetailInfoProps {
  name: string;
  age: number;
  job: string;
  income: number;
  family: boolean;
  home: boolean;
  loan: number;
  dsr: number;
}

const GuestDetailInfo: React.FC<GuestDetailInfoProps> = ({
  name,
  age,
  job,
  income,
  family,
  home,
  loan,
  dsr,
}) => {
  return (
    <div className="flex flex-col gap-y-2 px-2 text-hanaBlack80 font-semibold">
      <p>이름: {name}</p>
      <p>나이: {age}</p>
      <p>직업: {job}</p>
      <p>연소득: {income.toLocaleString()}만 원</p>
      <p>결혼자녀유무: {family ? '있음' : '없음'} </p>
      <p>보유 주택: {home ? '있음' : '없음'}</p>
      <p>보유 대출: {loan > 0 ? '있음' : '없음'}</p>
      <p>보유 대출: {loan > 0 ? '있음' : '없음'}</p>
      <p>현재 DSR: {dsr}%</p>
    </div>
  );
};

export default GuestDetailInfo;
