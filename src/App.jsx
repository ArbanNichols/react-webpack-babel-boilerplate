import axios from 'axios';
import { useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
import { states } from './data';

const url = 'https://course-api.com/react-tours-project';

const App = ({ title }) => {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [usa, setUsa] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const newStates = [...states];
    console.log(newStates);
    newStates.forEach(({ name }, index) => {
      axios({
        method: 'post',
        url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
        data: {
          "country": "United States",
          "state": name,
        }
      })
        .then(response => {
          const { data } = response.data;
          const cities = [...data]
          newStates[index].cities = cities;
          // console.log(newStates[index]);
        });
    })
    console.log(newStates);
    // for (const name in newStates) {
    //   axios({
    //     method: 'post',
    //     url: 'https://countriesnow.space/api/v0.1/countries/state/cities',
    //     data: {
    //       "country": "United States",
    //       "state": name,
    //     }
    //   })
    //     .then(response => {
    //       // const { response } = response.data.data;
    //       console.log(response);
    //     });
    // }
  }, []);

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

export default App;
