import React, { useEffect, useState } from 'react';
import './ViewQuestions.css'; 

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/questions/');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="questions-container">
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-card">
          <h4>{question.title}</h4>
          <ul>
            {question.answer.map((option) => (
              <li key={option.id} className={option.is_correct ? 'correct-answer' : ''}>
                {option.answer} {option.is_correct && <span>(Correct)</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewQuestions;