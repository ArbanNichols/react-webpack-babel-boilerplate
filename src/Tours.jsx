import Tour from './Tour';

const Tours = ({ tours, removeTour }) => {
  return (
    <section>
      <div className="title">
        <h1>our tours</h1>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => (
          <Tour key={tour.id} removeTour={removeTour} {...tour} />
        ))}
      </div>
    </section>
  );
};

export default Tours;
