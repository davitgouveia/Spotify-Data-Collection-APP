import './App.css';
import * as React from 'react';
import axios from 'axios';


import { useEffect, useState } from 'react';

function downloadStringAsTxt(stringContent, fileName) {
  const blob = new Blob([stringContent], { type: 'text/plain' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function App() {
  const CLIENT_ID = process.env.clientID
  const REDIRECT_URI = "https://spotify-data-collection-app.vercel.app"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "user-top-read"

  const [token, setToken] = useState("")
  const [topTracks, setTopTracks] = useState([])

  const [checked, setChecked] = React.useState(false);


  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])

  function login() {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
  }

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
    document.getElementById("renderResult").innerHTML = '';
  }

  const searchTopTracks = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        time_range: "medium_term",
        limit: "20",
        offset: "0"
      }
    })
    console.log(data.items)
    setTopTracks(data.items)


    const body = JSON.stringify(data)
    const filename = 'Top 20 Musicas';
    downloadStringAsTxt(body, filename);
  }

  const renderTopTracks = () => {
    return topTracks.map(topTracks => (
      <li>
        <div className="column">{topTracks.name}</div>
        <div className="column">| {topTracks.artists[0].name} |</div>
      </li>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify Data Gathering</h1>
      </header>
      <section className="content-center">
        <div className="content">
          <div>
            {!token ?
              <button onClick={login} id="login-button">Login to Spotify</button>
              : <button onClick={logout} id="logout-button">Logout</button>}
          </div>
          <h1 id='msg'>Por favor, envie o arquivo baixado para: davi.gouveia@aluno.ifsp.edu.br</h1>

          {token ?
            <div onClick={searchTopTracks} id="search-button">Baixar arquivo</div>
            : <div className='termos-condicoes-wrapper'>
              <div className='termos-condicoes'>
                <h1>Termos e Condições do Aplicativo Web</h1>
                <p>Esse aplicativo foi desenvolvido pelo grupo cujo os integrantes são, Davi Trost Gouveia, Mateus Augusto Viotto e Pedro Barriviera para a disciplina de Inteligência Artificial - IARC7 e tem como objetivo coletar suas Top 20 Musicas para motivo de análise de dados.</p>
                <p>Este Termos e Condições estabelece os direitos e obrigações dos usuários ("Você") e a equipe responsável pelo aplicativo web ("Nós") durante o uso do nosso serviço. Ao utilizar o Aplicativo, você concorda com os termos e condições aqui estabelecidos. Leia atentamente este Termo antes de prosseguir com o uso do nosso Aplicativo.</p>

                <h2>1. Aceitação dos Termos de Uso</h2>
                <p>1.1. Ao fazer login com sua conta do Spotify™, você declara estar ciente e concordar integralmente com os termos e condições deste Termo.</p>
                <p>1.2. Caso você não concorde com este Termo, por favor, interrompa imediatamente o uso do nosso Aplicativo.</p>

                <h2>2. Coleta e Uso de Informações</h2>
                <p>2.1. O Aplicativo solicitará acesso à sua conta do Spotify™ para recuperar informações sobre suas top 20 músicas mais ouvidas nos últimos 6 meses.</p>
                <p>2.2. Ao conceder acesso à sua conta do Spotify™, você autoriza o Aplicativo a coletar, armazenar e utilizar essas informações exclusivamente para os fins do nosso serviço.</p>
                <p>2.3. As informações coletadas serão usadas para gerar dados estatísticos para análise.</p>

                <h2>3. Confidencialidade e Segurança</h2>
                <p>3.1. As interações de acesso são tratadas diretamente com o Spotify™</p>
                <p>3.2. As informações de acesso não serão coletadas pelo aplicativo</p>
                <p>Ao clicar em "Aceitar" ou prosseguir com o uso do nosso Aplicativo, você reconhece ter lido, entendido e concordado com todos os termos e condições deste Termos e Condições.</p>
              </div>
            </div>
          }
          <ul id="renderResult">
            {renderTopTracks()}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;

