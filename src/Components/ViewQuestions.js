import React, { useEffect, useState } from 'react';


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
    return <div className='text-center text-xl'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center text-xl text-red-500'>Error: {error}</div>;
  }

  return (
    <div className="questions-container max-w-[800px] mx-auto p-4 text-center">
      <h2 className='text-6xl font-bold mb-6'>Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="question-card border rounded-lg p-4 mb-4 shadow-lg">
          <h4 className='text-xl font-semibold text-white' >{question.title}</h4>
          <ul className='list-disc list-inside mt-2 font-semibold'>
            {question.answer.map((option) => (
              <li key={option.id} className={`py-2 ${option.is_correct ? 'text-green-400' : 'text-white'}`}>
                {option.answer} {option.is_correct && <span className='text-green-400'></span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewQuestions;