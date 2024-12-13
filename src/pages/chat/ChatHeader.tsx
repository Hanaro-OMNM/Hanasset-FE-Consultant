import { HiBell } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type ChatHeaderProps = {
  responserName: string;
  responserImage: string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  responserName,
  responserImage,
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-3 bg-white justify-center">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={responserImage}
            alt="responser"
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-md font-bold text-hanaBlack80">
            {responserName}
          </span>
          <div className="w-2 h-2 rounded-full bg-red-500 mx-2"></div>
        </div>

        <div className="flex items-center">
          <button
            className="px-2 py-1 text-xs text-white bg-hanaRed80 rounded hover:bg-hanaRed transition duration-150 ease-in-out"
            onClick={() => navigate('/Consulting')}
          >
            상담 종료
          </button>
          <button className="ml-2 flex items-center justify-center p-1 text-gray-500 hover:text-gray-700">
            <HiBell className="h-5 w-5" />
          </button>
        </div>
      </div>

      <hr className="mt-3 border-t border-hanaSilver40" />
    </div>
  );
};

export default ChatHeader;
