import React, { useState } from 'react';

interface Transaction {
  date: string;
  type: '전세' | '월세';
  price: string;
  floor: number;
}

const transactions: Transaction[] = [
  { date: '24.10.11', type: '전세', price: '23억 6,000', floor: 36 },
  { date: '24.07.06', type: '월세', price: '10억/620', floor: 33 },
  { date: '24.06.28', type: '월세', price: '2억/682', floor: 30 },
  { date: '24.05.11', type: '월세', price: '2억/1,100', floor: 34 },
  { date: '24.04.15', type: '전세', price: '25억', floor: 40 },
  { date: '24.03.12', type: '전세', price: '22억', floor: 35 },
  { date: '24.02.10', type: '월세', price: '9억/500', floor: 32 },
  { date: '24.01.05', type: '전세', price: '24억', floor: 39 },
  { date: '24.01.01', type: '월세', price: '8억/400', floor: 31 },
  { date: '23.12.30', type: '전세', price: '21억 5,000', floor: 38 },
  { date: '23.12.30', type: '전세', price: '21억 5,000', floor: 38 },
];

const TransactionTable: React.FC = () => {
  const [filter, setFilter] = useState<'전세' | '월세' | '전체'>('전세');
  const [visibleCount, setVisibleCount] = useState(5);

  const filteredTransactions = transactions.filter(
    (transaction) => filter === '전체' || transaction.type === filter
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="p-6 mt-4">
      {/* 상단 필터 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">실거래가</h2>
        <div className="flex gap-2">
          {['전체', '전세', '월세'].map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
                ${
                  filter === type
                    ? 'bg-hanaColor2 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              onClick={() => setFilter(type as '전세' | '월세' | '전체')}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* 거래 내역 테이블 */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-4 py-2">계약일</th>
            <th className="border px-4 py-2">거래</th>
            <th className="border px-4 py-2">가격</th>
            <th className="border px-4 py-2">층</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredTransactions
            .slice(0, visibleCount)
            .map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50 animate-fadeInUp">
                <td className="border px-4 py-2 text-right">
                  {transaction.date}
                </td>
                <td className="border px-4 py-2 text-right">
                  {transaction.type}
                </td>
                <td className="border px-4 py-2 text-right">
                  {transaction.price}
                </td>
                <td className="border px-4 py-2 text-right">
                  {transaction.floor}층
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* 더 보기 버튼 */}
      {visibleCount < filteredTransactions.length && (
        <button
          className="mt-3 mx-auto block text-hanaColor2 font-semibold hover:underline transition-all duration-200"
          onClick={handleLoadMore}
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default TransactionTable;
