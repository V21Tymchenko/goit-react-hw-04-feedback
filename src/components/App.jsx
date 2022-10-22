import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './Buttons';
import Section from './Section';
import Notification from './Notification';
import Box from './Box/Box';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncrement = feedback => {
    switch (feedback) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log('something wrong');
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return `${Math.floor((good * 100) / countTotalFeedback())}%`;
  };

  const options = Object.keys({ good, neutral, bad });

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleIncrement}
        ></FeedbackOptions>
      </Section>
      <Section title="Statictics">
        {countTotalFeedback() ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="No feedback given"></Notification>
        )}
      </Section>
    </Box>
  );
}
