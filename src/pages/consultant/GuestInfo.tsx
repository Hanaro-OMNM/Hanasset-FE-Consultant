import { PiBuildingApartment } from 'react-icons/pi';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import CommonBackground from '../../components/atoms/CommonBackground';
import Swiper from '../../components/atoms/Swiper';
import { PlatformAPI } from '../../platform/PlatformAPI';
import { activeChatRoomState } from '../../recoil/chat/atom';
import { GuestInfo } from '../../types/hanaAssetResponse.common';
import { LoanRecommendInfo } from '../../types/hanaAssetResponse.common';
import { RealEstateInfo } from '../../types/hanaAssetResponse.common';
import FixedExpectation from '../GuestChatDetail/FixedExpectation';
import LoanDetailPage from '../LoanDetail';
import LoanRecommendTab from '../LoanRecommend/components/LoanRecommendTab';
import GuestDetailInfo from './GuestDetailInfo';
import SemiTitle from './SemiTitle';

export default function GuestInfoPage() {
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [loanRecommendInfos, setLoanRecommendInfos] = useState<
    LoanRecommendInfo[] | []
  >([]);
  const [realEstateId, setRealEstateId] = useState(0);
  const [loanId, setLoanId] = useState<number | null>(null);
  const [realEstateInfos, setRealEstateInfos] = useState<RealEstateInfo[] | []>(
    []
  );
  const chatroomState = useRecoilValue(activeChatRoomState);

  const swiperClick = (index: number) => {
    setRealEstateId(index);
  };

  const getRealEstateInfoList = (loanRecommendInfos: LoanRecommendInfo[]) => {
    const realEstateInfoList = loanRecommendInfos.map(
      (loanRecommendInfo) => loanRecommendInfo.realEstateInfo
    );
    if (realEstateInfoList) {
      setRealEstateInfos(realEstateInfoList);
    }
  };

  const fetchLoanRecommend = async () => {
    try {
      const loanRecommend = await PlatformAPI.getConsultingUserInfo(
        chatroomState!.chatroom.chatroomId,
        chatroomState!.chatroom.userId
      );
      setGuestInfo(loanRecommend.user);
      setLoanRecommendInfos(loanRecommend.loanRecommendInfos);
      getRealEstateInfoList(loanRecommendInfos);
    } catch (error) {
      console.error('Error fetching loan data:', error);
    }
  };

  useEffect(() => {
    if (realEstateInfos.length < 1) {
      fetchLoanRecommend();
    }
  }, [realEstateInfos, chatroomState]);

  return (
    <div>
      {!loanId ? (
        <div className="flex h-screen">
          <div className="max-w-[420px] bg-gray-100 p-6 overflow-hidden">
            <div className="h-full overflow-y-auto max-h-screen scrollbar-hide hover:scrollbar-hide hover:scrollbar-thumb-gray-400">
              <div className="flex flex-col gap-y-4">
                <div>
                  <SemiTitle title="손님 정보" />
                  <GuestDetailInfo
                    name={guestInfo ? guestInfo.name : ''}
                    age={guestInfo ? guestInfo.age : 0}
                    job={guestInfo ? guestInfo.jobType : ''}
                    income={guestInfo ? guestInfo.income : 0}
                    capital={guestInfo ? guestInfo.capital : 0}
                    hasHome={guestInfo ? guestInfo.hasHouse : false}
                    annualInterest={guestInfo ? guestInfo.annualInterest : 0}
                    annualPrinciple={guestInfo ? guestInfo.annualPrinciple : 0}
                    dsr={guestInfo ? guestInfo.dsr : 0}
                  />
                </div>

                {/* 매물 정보 */}
                <div>
                  <SemiTitle title="매물 정보" />
                  <div className="h-32">
                    <Swiper
                      items={realEstateInfos ? realEstateInfos : []}
                      renderItem={(realEstate) => (
                        <div className="flex flex-col gap-4 h-32 mr-1 ml-1">
                          <div>
                            <button
                              onClick={() =>
                                swiperClick(
                                  realEstate
                                    ? realEstateInfos.findIndex(
                                        (realEstateInfo) =>
                                          realEstateInfo.realEstateId ===
                                          realEstate.realEstateId
                                      )
                                    : 0
                                )
                              }
                              className="w-full transition-transform transform hover:scale-105"
                            >
                              <CommonBackground className="flex items-center p-4 h-20 rounded-lg shadow-md bg-gradient-to-r from-white to-hanaGreen20">
                                <PiBuildingApartment className="text-2xl text-hanaGreen" />
                                <div className="ml-4 text-hanaBlack font-medium text-left">
                                  {realEstate ? realEstate.name : ''} (
                                  {realEstate ? realEstate.rentType : ''})
                                  <div className="text-sm text-hanaBlack80">
                                    {realEstate ? realEstate.address : ''}
                                    <br />
                                    {realEstate ? realEstate.addressDetail : ''}
                                    ,{' 전용면적: '}
                                    {realEstate
                                      ? Math.round(
                                          realEstate.exclusiveAreaSize * 100
                                        ) / 100
                                      : 0}
                                  </div>
                                </div>
                              </CommonBackground>
                            </button>
                          </div>
                        </div>
                      )}
                      spaceBetween={30}
                      slidesPerView={1}
                    />
                  </div>
                </div>

                {/* 대출 상품 리스트 */}
                <div>
                  <SemiTitle title="대출 상품 리스트" />
                  <FixedExpectation
                    capital={guestInfo ? guestInfo.capital / 1000 : 0}
                    totalPrice={
                      realEstateInfos[realEstateId]
                        ? realEstateInfos[realEstateId].deposit / 1000_0000
                        : 0
                    }
                    maxLoan={
                      realEstateInfos[realEstateId]
                        ? (realEstateInfos[realEstateId].deposit / 1000_0000) *
                          0.8
                        : 0
                    }
                  />
                  <LoanRecommendTab
                    hanaLoanList={
                      loanRecommendInfos.length > 0
                        ? loanRecommendInfos[realEstateId].hanaLoans
                        : []
                    }
                    beotimmogLoanList={
                      loanRecommendInfos.length > 0
                        ? loanRecommendInfos[realEstateId].beotimmokLoans
                        : []
                    }
                    onLoanDetailButtonClick={setLoanId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex h-screen">
          <LoanDetailPage
            loanId={loanId}
            name={guestInfo?.name}
            onHide={() => setLoanId(null)}
          />
        </div>
      )}
    </div>
  );
}
