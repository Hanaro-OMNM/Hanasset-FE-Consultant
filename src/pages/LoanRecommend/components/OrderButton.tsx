import clsx from 'clsx';

// OrderButton Components
interface OrderButtonProps {
  activate: boolean;
  onClick: () => void;
  text: string;
}

const OrderButton: React.FC<OrderButtonProps> = ({
  activate,
  onClick,
  text,
}) => {
  return (
    <div>
      <button
        className={clsx(
          activate && 'text-xs font-semibold',
          !activate && 'text-xs text-hanaSilver80 font-semibold'
        )}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default OrderButton;
