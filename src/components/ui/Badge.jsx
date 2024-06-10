import { FaStar } from 'react-icons/fa';

const Badge = ({
  text,
  Icon = FaStar,
  iconClassName = '',
  displayIcon = true,
  textClassName = '',
}) => {
  return (
    <div className="w-fit h-fit border border-muted-foreground dark:border-muted rounded-md p-1 sm:p-2 self-end">
      <div className="inline-flex gap-2 items-center justify-evenly">
        {displayIcon && <Icon className={`${iconClassName}`} />}
        <p className={`tracking-wider text-foreground font-light ${textClassName}`}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Badge;
