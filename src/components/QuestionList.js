import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ newQuestion }) {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
  }, [])


  /////
  function handleAddQuestion() {
    setQuestions([...questions, newQuestion])
  }
  //////

  //handle update//
  function handleUpdate(newValue, question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newValue,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        const updatedList = questions.map((q) => {
          if (Number(updatedItem.correctIndex) !== Number(q.correctIndex)) {
            return updatedItem;
          }
          else {
            return q;
          }
        })
        setQuestions(updatedList)
      });

  }

  ///handle delete

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",

    })
      .then(res => res.json())
      .then(() => {
        const updatedList = questions.filter((q) => {
          return q.id !== id
        })
        setQuestions(updatedList)
      })

  }



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questions.map((q) => {
          return <QuestionItem key={q.id} question={q} onClickDelete={handleDelete} onChangeUpdate={handleUpdate} />
        })
      }</ul>
    </section>
  );
}

export default QuestionList;
