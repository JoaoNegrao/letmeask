import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

import illustrationImg from "../assets/images/illustration.svg";
import logoBlk from "../assets/images/logoB.svg";
import logoWhite from "../assets/images/logoW.svg"
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";
import Switch from 'react-switch';


import '../styles/auth.scss';
import { FormEvent, useEffect, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
	const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const {theme, toggleTheme} = useTheme();
  const [logoImg, setLogoImg] = useState('')

	async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

		history.push('/rooms/new')
	}

  async function handleJoinRoom(event:FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exist.');
      return;
    }

    if(roomRef.val().endedAt){
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }


  useEffect(() => {
    if (theme === 'light') {
        setLogoImg(logoBlk)
    }
    else {
        setLogoImg(logoWhite) 
    } 

}, [theme])

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">          
          <Link to="/">
            <img src={logoImg} alt="Letmeask" />    
          </Link> 
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input 
							type="text" 
							placeholder="Digite o código da sala"
              onChange ={event => setRoomCode(event.target.value)}
              value = {roomCode}
						/>
						<Button type="submit">
							Entrar na sala
						</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
