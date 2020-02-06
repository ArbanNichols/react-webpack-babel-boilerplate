import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import moment from 'moment';
import uuid from '../../utils/uuid';

const regex = /{your solution}/;
const meredith = 'http://codechallenge.meredith.com';

const reducer = (state, action) => {
  const { type, args, remaining, next } = action;
  switch (type) {
    case 'addition': {
      let sum = args.reduce((a, b) => a + b, 0);
      let newUrl = meredith + next.replace(regex, sum);
      return {
        url: newUrl,
        remaining: remaining,
        solutions: [...state.solutions, { operation: type, result: sum }],
      };
    }
    case 'multiplication': {
      let product = args.reduce((a, b) => a * b);
      let newUrl = meredith + next.replace(regex, product);
      return {
        url: newUrl,
        remaining: remaining,
        solutions: [...state.solutions, { operation: type, result: product }],
      };
    }
    case 'next_fibonacci_number': {
      let fib = args[args.length - 1] + args[args.length - 2];
      let newUrl = meredith + next.replace(regex, fib);
      return {
        url: newUrl,
        remaining: remaining,
        solutions: [...state.solutions, { operation: type, result: fib }],
      };
    }
    case 'date_addition': {
      let d = moment(args[0]);
      let [time, amount] = args[1].split(' ');
      time = parseInt(time);
      d = d.add(time, amount);
      let newUrl = meredith + next.replace(regex, d.unix());
      return {
        url: newUrl,
        remaining: remaining,
        solutions: [...state.solutions, { operation: type, result: d.unix() }],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    remaining: -1,
    solutions: [],
    url:
      'http://codechallenge.meredith.com/code-challenge/firststep/?auth=T1iMb31jT6Z73Zvm8vm6C72fpPoyt9CqrqeNUXgXq8w%3D',
  });

  useEffect(() => {
    const fetchOperation = async () => {
      try {
        const response = await axios(state.url);
        const { data } = response;
        dispatch({
          type: data.operation,
          args: data.arguments,
          remaining: data.operations_remaining,
          next: data.next_endpoint,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOperation(); // Try IFFE
  }, [state.url]);

  return (
    <div>
      <div>{state.remaining}</div>
      <ul>
        {state.solutions.map(i => (
          <li key={uuid()}>
            Operation: {i.operation} Result: {i.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
