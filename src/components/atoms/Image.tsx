import photo from '../../assets/img/logo.png';

interface ImageProps {
  image?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  alt?: string;
  square?: boolean;
}

export default function Image(props: ImageProps) {
  return (
    <div
      className={`overflow-hidden border border-gray-300 ${
        props.square
          ? 'w-72 h-72 rounded-[10%] border-[0.7px]'
          : 'w-24 h-24 border-[1.5px] rounded-full'
      }`}
    >
      <img
        className="h-full w-full object-cover"
        src={props.image ? props.image : photo}
        onClick={props.onClick ? (e) => props.onClick!(e) : undefined}
        alt={props.alt}
      />
    </div>
  );
}
