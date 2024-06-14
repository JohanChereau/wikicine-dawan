const MovieDetailsContent = ({ description }) => {
  return (
    <section className="grid mt-8 gap-3">
      <h3 className="text-2xl font-bold text-foreground">Description</h3>

      <p className="text-muted-foreground">{description}</p>
    </section>
  );
};

export default MovieDetailsContent;
