import React, { useState } from 'react';
import './Checkbox.css';

export default function CheckboxInputForm() {  
  const [question, setQuestion] = useState('');
  const [points, setPoints] = useState(10);  
  const [difficulty, setDifficulty] = useState(1); 
  const [options, setOptions] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCheckboxChange = (index) => {
    const newOptions = [...options];
    newOptions[index].isCorrect = !newOptions[index].isCorrect;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const answers = options.map((option) => ({
      answer: option.text,
      is_correct: option.isCorrect,
    }));

    const data = {
      title: question,
      points: points,
      difficulty: difficulty, 
      answer: answers, 
    };

    try {
      
      const response = await fetch('http://localhost:8000/api/questions/create/', {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Question created successfully");
        
        resetForm();
      } else {
        console.error("Error creating question:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setQuestion('');
    setOptions([
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            id="questionInput"
            className="form-control question-input"
            rows="3"
            placeholder="Enter the question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {options.map((option, index) => (
          <div className="form-group" key={index}>
            <div className="input-group">
              <input
                type="text"
                className="form-control option-input"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <div className="input-group-append">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={option.isCorrect}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary submit-btn">Submit</button>
      </form>
    </div>
  );
}