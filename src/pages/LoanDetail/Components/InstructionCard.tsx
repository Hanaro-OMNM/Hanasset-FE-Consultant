import { FiAlertCircle } from 'react-icons/fi';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <p className="text-hanaSilver80 font-semibold">{title}</p>;
};

interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return (
    <p className="text-hanaSilver80 text-xs whitespace-pre-wrap">{content}</p>
  );
};

interface InstructionProps {
  title: string;
  content: string;
}

const InstructionCard: React.FC<InstructionProps> = ({ title, content }) => {
  return (
    <div className="p-4 rounded-lg bg-hanaSilver20 flex flex-col">
      <div className="flex items-center mb-2">
        <FiAlertCircle className="w-5 h-5 text-hanaGold60 mr-2" />
        <Title title={title} />
      </div>
      <Content content={content} />
    </div>
  );
};

export default InstructionCard;
