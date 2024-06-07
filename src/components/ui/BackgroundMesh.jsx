const BackgroundMesh = ({ size = 'w-1/4' }) => {
  return (
    <div
      className={`absolute ${size} aspect-square bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] rounded-full blur-[100px] opacity-90 dark:opacity-65`}
    ></div>
  );
};

export default BackgroundMesh;
