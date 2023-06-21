import React from 'react';
import Section from './Section';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification/Notification';

export class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleLeavFeedback = button => {
    this.setState( prevState => ({
      [button]: prevState[button] + 1,
    }));
  }

  countTotalFeedback() {
    const values = Object.values(this.state);
    const totalFeedback = values.reduce((total, value) => (total += value), 0);
    return totalFeedback;
  }

  countPositiveFeedbackPercentage = total => {
    const percetnage = Math.round((this.state.good * 100) / total);

    return percetnage;
  };

  render() {
    const { good, neutral, bad } = this.state;
    const options = Object.keys(this.state);
    const total = this.countTotalFeedback();
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.handleLeavFeedback}
          />
        </Section>
        <Section title="Statistics">
                    {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage(total)}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </>
    );
  }
}
