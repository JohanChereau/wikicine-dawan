import Rating from './Rating';

const MovieHeader = ({ movieTitle, dateProd, rate }) => {
  return (
    <section className="grid text-center gap-2 font-bold backdrop-brightness-50">
      <div>{movieTitle}</div>
      <div>{dateProd}</div>
      <div>{rate}</div>
      <div>
        <Rating />
      </div>
    </section>
  );
};

export default MovieHeader;
