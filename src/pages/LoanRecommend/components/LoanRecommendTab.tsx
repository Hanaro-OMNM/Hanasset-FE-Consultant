import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import CommonBackground from '../../../components/atoms/CommonBackground';
import { LoanInfo } from '../../../types/hanaAssetResponse.common';
import LoanCard from './LoanCard';
import LoanFoundMessage from './LoanFoundMessage';

interface LoanRecommendTabProps {
  hanaLoanList: LoanInfo[];
  beotimmogLoanList: LoanInfo[];
  onLoanDetailButtonClick: React.Dispatch<React.SetStateAction<number | null>>;
}

// 대출 리스트 최소 개수 전처리
const loanListPreProcessing = (loanList: LoanInfo[]) => {
  const emptyLoan: LoanInfo = {
    name: '-',
    loanId: 0,
    rate: 100,
    limitAmount: 0,
    dsr: 100,
  };

  while (loanList.length < 3) {
    loanList.push(emptyLoan);
  }

  return loanList;
};

const LoanRecommendTab: React.FC<LoanRecommendTabProps> = ({
  hanaLoanList,
  beotimmogLoanList,
  onLoanDetailButtonClick,
}) => {
  const [showCount, setShowCount] = useState(3);
  const onClick = () => {
    setShowCount((showCount) => showCount + 3);
  };

  hanaLoanList = loanListPreProcessing(hanaLoanList);
  beotimmogLoanList = loanListPreProcessing(beotimmogLoanList);

  const isHanaLoanFound = hanaLoanList.length > 0;
  const isBeotimmogLoanFound = beotimmogLoanList.length > 0;

  return (
    <div className="w-full py-6">
      <CommonBackground>
        <TabGroup>
          <TabList className="flex pl-5">
            {/* 대출 종류 선택 */}
            <Tab className="h-12 w-32 bg-white text-hanaBlack80 font-fontMedium focus:outline-none">
              {({ selected }) => (
                <button
                  className={clsx(
                    'w-full h-full transition-colors duration-200',
                    selected
                      ? 'text-hanaColor2 border-b-2 border-hanaColor2'
                      : 'text-hanaSilver60 hover:text-hanaSilver60 hover:border-b-2 hover:border-hanaSilver60'
                  )}
                >
                  하나은행 대출
                </button>
              )}
            </Tab>
            <Tab className="h-12 w-32 bg-white text-hanaBlack80 font-fontMedium focus:outline-none">
              {({ selected }) => (
                <button
                  className={clsx(
                    'w-full h-full transition-colors duration-200',
                    selected
                      ? 'text-hanaColor2 border-b-2 border-hanaColor2'
                      : 'text-hanaSilver60 hover:text-hanaSilver60 hover:border-b-2 hover:border-hanaSilver60'
                  )}
                >
                  버팀목 대출
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* 하나은행 대출 리스트 */}
              {isHanaLoanFound ? (
                <div className="mt-4 px-4 w-full flex-col animate-fadeInUp">
                  {hanaLoanList.map((loan: LoanInfo, index: number) => (
                    <LoanCard
                      key={index}
                      isBest={index === 0 ? true : false}
                      isShow={index < showCount ? true : false}
                      loanId={loan.loanId}
                      name={loan.name}
                      rate={loan.rate}
                      limit={loan.limitAmount}
                      dsr={loan.dsr}
                      onLoanDetailButtonClick={onLoanDetailButtonClick}
                    />
                  ))}
                  {/* 더 보기 버튼 */}
                  <div
                    className={clsx(
                      showCount < hanaLoanList.length &&
                        'mx-4 mb-4 text-hanaBlack60 text-center',
                      showCount >= hanaLoanList.length && 'hidden'
                    )}
                  >
                    <button onClick={onClick} className="mb-2">
                      더 보기
                    </button>
                  </div>
                </div>
              ) : (
                <LoanFoundMessage isFound={false} />
              )}
            </TabPanel>
            <TabPanel>
              {/* 버팀목 대출 리스트 */}
              {isBeotimmogLoanFound ? (
                <div className="mt-4 px-4 w-full flex-col animate-fadeInUp">
                  {beotimmogLoanList.map((loan: LoanInfo, index: number) => (
                    <LoanCard
                      key={index}
                      isBest={index === 0 ? true : false}
                      isShow={index < showCount ? true : false}
                      loanId={loan.loanId}
                      name={loan.name}
                      rate={loan.rate}
                      limit={loan.limitAmount}
                      dsr={loan.dsr}
                      onLoanDetailButtonClick={onLoanDetailButtonClick}
                    />
                  ))}
                  <div
                    className={clsx(
                      showCount < beotimmogLoanList.length &&
                        'mx-4 mb-4 text-hanaBlack60 text-center',
                      showCount >= beotimmogLoanList.length && 'hidden'
                    )}
                  >
                    <button onClick={onClick} className="mb-2">
                      더 보기
                    </button>
                  </div>
                </div>
              ) : (
                <LoanFoundMessage isFound={false} />
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </CommonBackground>
    </div>
  );
};

export default LoanRecommendTab;
