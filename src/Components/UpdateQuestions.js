import React, { useEffect, useState } from 'react';
import './UpdateQuestions.css'; 

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

        // Set answers based on selected question
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
        <div className="update-questions-container">
            <h2>Update Questions</h2>
            <div>
                <h4>Select a Question to Update</h4>
                <ul className="questions-list">
                    {questions.map((question) => (
                        <li key={question.question_id} onClick={() => handleQuestionSelect(question)}>
                            {question.title}
                        </li>
                    ))}
                </ul>
            </div>

            {selectedQuestion && (
                <form onSubmit={handleUpdateQuestion} className="update-form">
                    <div>
                        <label>Question:</label>
                        <input
                            type="text"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            required
                            className="question-input"
                        />
                    </div>

                    <div>
                        <h4>Answers:</h4>
                        {answers.map((answer, index) => (
                            <div key={index} className="answer-item">
                                <input
                                    type="text"
                                    value={answer.text}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    required
                                    className="answer-input"
                                />
                                <input
                                    type="checkbox"
                                    checked={answer.is_correct}
                                    onChange={() => handleCorrectToggle(index)}
                                    className="correct-checkbox"
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="update-button">Update Question</button>
                    <button type="button" onClick={handleDeleteQuestion} className="delete-button">Delete Question</button>
                </form>
            )}
        </div>
    );
};

export default UpdateQuestions;