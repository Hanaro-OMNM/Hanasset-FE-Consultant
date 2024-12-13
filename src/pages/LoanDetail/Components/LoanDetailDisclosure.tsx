import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';

// Title Components
interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return <h2 className="font-semibold">{title}</h2>;
};

// Content Components
interface ContentProps {
  content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => {
  return <p className="whitespace-pre-wrap">{content}</p>;
};

interface LoanDetailDisclosureProps {
  title: string;
  content: string;
}

const LoanDetailDisclosure: React.FC<LoanDetailDisclosureProps> = ({
  title,
  content,
}) => {
  return (
    <div className="my-4 py-6 px-4 rounded-lg bg-hanaSilver20 text-hanaSilver">
      <Disclosure>
        <DisclosureButton className="group flex w-full justify-between transition duration-150 transform hover:scale-105 ">
          <Title title={title} />
          <FaChevronDown className="text-hanaSilver80 group-data-[open]:rotate-180" />
        </DisclosureButton>
        <DisclosurePanel className={'pt-2 text-xs animate-fadeInUp'}>
          <Content content={content} />
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default LoanDetailDisclosure;
