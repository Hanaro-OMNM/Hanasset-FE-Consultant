interface AssetInfoProps {
  amount: number;
}

const AssetInfo: React.FC<AssetInfoProps> = ({ amount }) => {
  return (
    // 자산 정보
    <div className="mt-6">
      <p className="text-right mb-2 pr-4 font-semibold text-hanaBlack80">
        내가 가진 자산이에요
      </p>
      <p className="text-right mb-2 text-sm pr-8 font-semibold  text-hanaBlack60">
        {amount}억
      </p>
    </div>
  );
};

export default AssetInfo;
