import {FormEvent, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'

import illustrationImg from "../assets/images/illustration.svg";
import logoBlk from "../assets/images/logoB.svg";
import logoWhite from "../assets/images/logoW.svg"

import { Button } from "../components/Button";
import Switch from 'react-switch';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

import "../styles/auth.scss";
import { useTheme } from '../hooks/useTheme';

export function NewRoom() {
  const {user} =  useAuth();
  const history = useHistory();
  const [newRoom,  setNewRoom] = useState('');
  const [logoImg, setLogoImg] = useState('')
  const {theme, toggleTheme} = useTheme();

  async function handleCreateRoom(event:FormEvent) {
    event.preventDefault();
    
    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala" 
              onChange={event => setNewRoom(event.target.value)}
              value = {newRoom}
              //Criação de um evento para receber o valor de input e salvá-lo. Utilizamos a pacote de FormEvent para tipar a variável e criamos uma variável para manusear os valores do campo. 
            />
            <Button type="submit">
							Criar sala
						</Button>
          </form>
          <p className={theme}>
						Quer entrar em uma sala existente <Link to="/">clique aqui</Link>
					</p>
        </div>
      </main>
    </div>
  );
}
