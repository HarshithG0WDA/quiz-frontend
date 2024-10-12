import React, { useState } from 'react';

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
    <div className="w-[700px] mx-auto p-4"> 
      <form onSubmit={handleSubmit} className="bg-black rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Question</h2>
        
        <div className="mb-4">
          <textarea
            id="questionInput"
            className="form-control w-full h-24 p-2 border bg-black text-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#00df9a] placeholder-white"
            rows="3"
            placeholder="Enter the question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {options.map((option, index) => (
          <div className="mb-4" key={index}>
            <div className="flex items-center">
              <input
                type="text"
                className="form-control w-full p-2 border bg-black text-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#00df9a] placeholder-white"
                placeholder={`Option ${index + 1}`}
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <div className="ml-2">
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

        <button type="submit" className="bg-[#00df9a] w-full rounded-md font-medium py-3 text-black hover:bg-[#00bf8a] transition duration-300">Submit</button>
      </form>
    </div>
  );
}