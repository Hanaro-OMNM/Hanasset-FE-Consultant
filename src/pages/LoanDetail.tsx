import { IoChevronBack } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import CommonBackground from '../components/atoms/CommonBackground';
import LoanProgressBar from '../components/atoms/LoanProgressBar';
import { PlatformAPI } from '../platform/PlatformAPI';
import { activeChatRoomState } from '../recoil/chat/atom';
import { LoanDetail } from '../types/hanaAssetResponse.common';
import InstructionCard from './LoanDetail/Components/InstructionCard';
import LoanDetailAccentInfo from './LoanDetail/Components/LoanDetailAccentInfo';
import LoanDetailCard from './LoanDetail/Components/LoanDetailCard';
import LoanDetailDisclosure from './LoanDetail/Components/LoanDetailDisclosure';
import LoanDetailHint from './LoanDetail/Components/LoanDetailHint';

interface LoanDetailProps {
  onHide: () => void;
  loanId: number;
  name?: string;
}

const LoanDetailPage: React.FC<LoanDetailProps> = ({
  onHide,
  loanId,
  name,
}) => {
  const [loanDetailInfo, setLoanDetailInfo] = useState<LoanDetail | null>(null);
  const chatroomState = useRecoilValue(activeChatRoomState);

  useEffect(() => {
    const fetchLoanDetail = async () => {
      try {
        const loanResponse = await PlatformAPI.getLoanDetail(
          loanId,
          chatroomState?.chatroom.userId as number
        );
        setLoanDetailInfo(loanResponse);
      } catch (error) {
        console.error('Error fetching loan data:', error);
      }
    };
    fetchLoanDetail();
  }, [loanId]);

  return (
    <div className="animate-fadeInRight">
      <div className="w-[420px] backdrop-blur-[10px] h-screen overflow-y-auto bg-gray-50/90 scrollbar-hide">
        {/* 헤더 */}
        <div className="flex h-12 pl-1 gap-2 items-center">
          <button className="items-center" onClick={onHide}>
            <IoChevronBack className="text-hanaBlack80 text-xl" />
          </button>
          <div className="text-black text-xl font-fontMedium tracking-tight">
            대출 상세 정보
          </div>
        </div>
        <div className="p-5">
          <CommonBackground>
            <div className="py-3 mx-4">
              {/* 대출 정보 카드 */}
              <LoanDetailCard
                type={loanDetailInfo ? loanDetailInfo.type : ''}
                name={loanDetailInfo ? loanDetailInfo.name : ''}
                outline={loanDetailInfo ? loanDetailInfo.outline : ''}
              />
              <LoanDetailAccentInfo
                title={`${name}님의 금리`}
                content={`${loanDetailInfo ? loanDetailInfo.rate : ''}%`}
              />
              <LoanDetailAccentInfo
                title={'최대 한도'}
                content={`${loanDetailInfo ? (loanDetailInfo.limitAmount > 10000 ? (loanDetailInfo.limitAmount / 10000).toLocaleString() + '억' : loanDetailInfo.limitAmount.toLocaleString() + '만') : ''} 원`}
              />
              <LoanDetailHint content="예상 금리와 한도예요. 서류 제출과정에서 신용 및 손님의 정보가 변동되면 금리와 한도가 변경될 수 있어요. 자세한 내용은 하나은행 홈페이지나 대출 상담을 통해 확인해주세요." />
              <LoanDetailAccentInfo
                title={'DSR'}
                content={`${loanDetailInfo ? loanDetailInfo.dsr : 0}%`}
              />
              <LoanProgressBar rate={loanDetailInfo ? loanDetailInfo.dsr : 0} />
              {/* DSR 설명 */}
              <InstructionCard
                title={'DSR이란?'}
                content={
                  '내가 가지고 있는 모든 빚을 기준으로 빌릴 수 있는 돈의 상한선을 정하는 거예요.\n\n주택담보대출뿐만 아니라 학자금대출, 마이너스대출*, 자동차할부, 카드론 등 모든 대출의 원리금을 합한 총대출 상환액이 연 소득에서 차지하는 비중으로 대출 상환 능력을 심사하기 위한 지표예요.\n\n*마이너스대출은 빌린 금액이 아닌 한도금액, 즉 사용할 수 있는 마이너스대출 한도 전체를 더해요.\n\nDSR = (모든 주택담보대출 연간 총상환액(원금+이자) + 기타 부채 연간 총상환액(원금+이자)) / 연소득 × 100\n\n예를 들어 DSR 30%라면, 1년에 1억 원을 벌 때, 1년간 내는 대출 상환액이 3천만 원이에요. '
                }
              />
              {/* 대출 상세 정보 */}
              {/* 상품특징 */}
              {loanDetailInfo && loanDetailInfo.feature.length == 0 ? (
                <></>
              ) : (
                <LoanDetailDisclosure
                  title={'상품특징'}
                  content={loanDetailInfo ? loanDetailInfo.feature : ''}
                />
              )}
              {/* 대출대상 */}
              <LoanDetailDisclosure
                title={'대출대상'}
                content={loanDetailInfo ? loanDetailInfo.targetGuest : ''}
              />
              {/* 대상주택 */}
              <LoanDetailDisclosure
                title={'대상주택'}
                content={loanDetailInfo ? loanDetailInfo.targetHouse : ''}
              />
              {/* 대출기간 */}
              <LoanDetailDisclosure
                title={'대출기간'}
                content={loanDetailInfo ? loanDetailInfo.period : ''}
              />
              {/* 상환방식 */}
              <LoanDetailDisclosure
                title={'상환방식'}
                content={loanDetailInfo ? loanDetailInfo.paybackMethod : ''}
              />
              {/* 대출 받으러 가기 버튼 */}
            </div>
          </CommonBackground>
        </div>
      </div>
    </div>
  );
};

export default LoanDetailPage;
