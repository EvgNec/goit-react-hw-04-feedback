import { useState } from 'react';
import React from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification/Notification';

export function App() {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);

   const options = ['good', 'neutral', 'bad'];
  const totalFeedback = goodFeedback + neutralFeedback + badFeedback;

  function handleLeavFeedback (button) {
    if (button === 'good') {
      setGoodFeedback(prevState => prevState + 1);
    }
    if (button === 'neutral') {
      setNeutralFeedback(prevState => prevState + 1);
    }
    if (button === 'bad') {
      setBadFeedback(prevState => prevState + 1);
    }
  }

 function countTotalFeedback() {
   if (totalFeedback) {
      const goodFeedbackPercantage = Math.round(
        (100 * goodFeedback) / totalFeedback
      );
      return goodFeedbackPercantage;
    }

    return 0;
  }



    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={handleLeavFeedback}
          />
        </Section>
        <Section title="Statistics">
                    {totalFeedback > 0 ? (
            <Statistics
              good={goodFeedback}
              neutral={neutralFeedback}
              bad={badFeedback}
              total={totalFeedback}
              positivePercentage={countTotalFeedback(totalFeedback)}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
}