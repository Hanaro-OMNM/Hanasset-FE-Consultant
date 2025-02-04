// Type Components
interface TypeProps {
  type: string;
}

const Type: React.FC<TypeProps> = ({ type }) => {
  return (
    <p className="mb-1 pl-1 text-hanaSilver80 text-xs font-semibold">{type}</p>
  );
};

// LoanName Components
interface LoanNameProps {
  name: string;
}

const LoanName: React.FC<LoanNameProps> = ({ name }) => {
  return <p className="text-hanaBlack80 text-2xl font-semibold">{name}</p>;
};

// Outline Components
interface OutlineProps {
  outline: string;
}

const Outline: React.FC<OutlineProps> = ({ outline }) => {
  return (
    <p className="w-80 text-hanaSilver text-sm font-semibold">{outline}</p>
  );
};

interface LoanDetailCardProps {
  type: string;
  name: string;
  outline: string;
}

const LoanDetailCard: React.FC<LoanDetailCardProps> = ({
  type,
  name,
  outline,
}) => {
  return (
    <div>
      <div className="my-4 p-4 w-full flex-col gap-y-5 justify-start">
        <Type type={type} />
        <LoanName name={name} />
        <Outline outline={outline} />
      </div>
    </div>
  );
};

export default LoanDetailCard;
