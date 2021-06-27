import { Link, useHistory, useParams } from "react-router-dom";

import logoBlk from "../assets/images/logoB.svg";
import logoWhite from "../assets/images/logoW.svg"
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import Switch from 'react-switch';
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
//import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";
import { database } from "../services/firebase";
import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

type RoomParms = {
  id: string;
};

export function AdminRoom() {
  //const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParms>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);
  const [logoImg, setLogoImg] = useState('')
  const {theme, toggleTheme} = useTheme();

  useEffect(() => {
    if (theme === 'light') {
        setLogoImg(logoBlk)
    }
    else {
        setLogoImg(logoWhite) 
    } 

  }, [theme])

  async function handleEndRoom() {
    if(window.confirm("Tem certeza que deseja encerra a sala?")){
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
    }
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room" className={theme}>
      <header>
        <div className="content">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />    
          </Link>          
          <div>
          <Switch
            onChange={toggleTheme}
            checked = {theme === 'dark'}
            height ={30}
            width={50}
            handleDiameter={30}
            offColor= '#333'
            onColor='#3f3f3f'
            offHandleColor="#835afd"
            onHandleColor="#835afd"
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"                  
            className="Switch"           
          />
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && (
            <span>
              {questions.length} {questions.length > 1}Pergunta(s)
            </span>
          )}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como Respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
