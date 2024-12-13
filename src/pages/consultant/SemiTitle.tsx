interface SemiTitleProps {
  title: string;
}

const SemiTitle: React.FC<SemiTitleProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-hanaBlack80 mt-4">{title}</h2>
      <hr className="border-t border-hanaSilver60 my-2" />
    </div>
  );
};

export default SemiTitle;
