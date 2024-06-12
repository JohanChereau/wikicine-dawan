const MovieDetailsContent = ({ description }) => {
  return (
    <section className="grid mt-8 gap-3">
      <span>
        <h3 className="text-2xl font-bold text-foreground">Description</h3>
      </span>
      <p className="text-muted-foreground">{description}</p>
    </section>
  );
};

export default MovieDetailsContent;
