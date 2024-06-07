const Badge = ({ rating, Icon, iconClassName }) => {
  return (
    <div className="w-fit border border-muted-foreground rounded-md p-1 bg-muted">
      <div className="inline-flex gap-2 items-center justify-evenly">
        <Icon className={iconClassName} />
        <span className="tracking-wider">{rating}</span>
      </div>
    </div>
  );
};

export default Badge;
