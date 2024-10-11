import React, { useEffect, useState } from 'react';
 

const UpdateQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questionText, setQuestionText] = useState('');
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/questions/');
            const data = await response.json();
            console.log('Fetched questions:', data);
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleQuestionSelect = (question) => {
        console.log('Selected question uuid:', question.question_id);
        setSelectedQuestion(question);
        setQuestionText(question.title);
    
        setAnswers(question.answer.map(ans => ({
            text: ans.answer,
            is_correct: ans.is_correct
        })));
    };

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        if (selectedQuestion) {
            const updatedData = {
                title: questionText,
                points: 20, 
                difficulty: 2, 
                answer: answers.map(ans => ({
                    answer: ans.text,
                    is_correct: ans.is_correct
                }))
            };

            try {
                console.log("Updating question with uuid:", selectedQuestion.question_id);
                const response = await fetch(`http://localhost:8000/api/questions/${selectedQuestion.question_id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (response.ok) {
                    console.log('Question updated successfully');
                    fetchQuestions();
                    resetForm();
                } else {
                    const errorResponse = await response.json();
                    console.error('Error updating question:', response.statusText, errorResponse);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('No valid question selected for update.');
        }
    };

    const handleDeleteQuestion = async () => {
        if (selectedQuestion) {
            try {
                console.log("Deleting question with uuid:", selectedQuestion.question_id);
                const response = await fetch(`http://localhost:8000/api/questions/${selectedQuestion.question_id}/`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    console.log('Question deleted successfully');
                    fetchQuestions();
                    resetForm();
                } else {
                    console.error('Error deleting question:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.error('No valid question selected for deletion.');
        }
    };

    const handleAnswerChange = (index, newValue) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index].text = newValue;
        setAnswers(updatedAnswers);
    };

    const handleCorrectToggle = (index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index].is_correct = !updatedAnswers[index].is_correct;
        setAnswers(updatedAnswers);
    };

    const resetForm = () => {
        setSelectedQuestion(null);
        setQuestionText('');
        setAnswers([]);
    };

    return (
        <div className="max-w-[800px] mx-auto p-4 flex-1">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Questions</h2>
            <div>
                <h4 className="text-xl mb-2 text-center">Select a Question to Update</h4>
                <ul className="questions-list mb-4 flex flex-col">
                    {questions.map((question) => (
                        <li 
                            key={question.question_id} 
                            onClick={() => handleQuestionSelect(question)} 
                            className="cursor-pointer hover:bg-[#00df9a] text-white transition duration-200 p-2 rounded-lg border border-gray-300 mb-2"
                        >
                            {question.title}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedQuestion && (
                <form onSubmit={handleUpdateQuestion} className="bg-black rounded-lg shadow-lg p-6 mt-4">
                    <div className="mb-4">
                        <label className="font-bold">Question:</label>
                        <input
                            type="text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            required
                            className="w-full p-2 border bg-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#00df9a]"
                        />
                    </div>

                    <div className="mb-4">
                        <h4 className="text-xl mb-2 bg-black">Answers:</h4>
                        {answers.map((answer, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    required
                                    className="w-full p-2 border bg-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-[#00df9a]"
                                />
                                <div className="ml-2 text-black">
                                    <input
                                        type="checkbox"
                                        checked={answer.is_correct}
                                        onChange={() => handleCorrectToggle(index)}
                                        className="h-5 w-5 text-[#00df9a] rounded border-gray-300 focus:ring-[#00df9a]"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="bg-[#00df9a] w-full rounded-md font-medium py-3 text-black hover:bg-[#00bf8a] transition duration-300 mb-2">Update Question</button>
                    <button type="button" onClick={handleDeleteQuestion} className="bg-red-500 w-full rounded-md font-medium py-3 text-white hover:bg-red-600 transition duration-300">Delete Question</button>
                </form>
            )}
        </div>
    );
};

export default UpdateQuestions;