import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, AlurakutStyles, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { useEffect, useState } from "react";
import ImagesList from "../src/components/ImagesList";

import images from '../images.json';
import BoxContent from "../src/components/BoxContent";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSidebar({ avatar, name, user }) {
  return (
    <Box>
      <img src={`https://github.com/${avatar}.png`} alt="Profile Image" style={{ borderRadius: '8px'}} />
      <AlurakutProfileSidebarMenuDefault name={name} user={user} />
    </Box>
  )
}

export default function Home() {
  // const usuarioAleatorio = 'llofyy';
  const pessoasFavoritas = [
    'luizomf', 
    'rafaballerini', 
    'marcobrunodev', 
    'maykbrito', 
    'filipedeschamps', 
    'diego3g'
  ];
  
  const [comunidades, setComunidades] = useState([{title: 'Eu odeio acordar cedo', image: 'https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg'}]);
  const [userData, setUserData] = useState({login: 'llofyy'});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [imageListShow, setImageListShow] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [nomeDoUsuario, setNomeDoUsuario] = useState('');
  const [usuarioAleatorio, setUsuarioAleatorio] = useState('llofyy');
  const [requestOk, setRequestOk] = useState(true)

  useEffect(() => {
    async function handleLoadFollowersAndFollowing() {
      await fetch(`https://api.github.com/users/${usuarioAleatorio}/following`)
      .then(data => {
        if(data.ok) {
          return data.json();
        }

        throw new Error('Requisição não completada.');
      })
      .then(data => setFollowing(data))
      .catch(err => console.log(err));

      await fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
      .then(data => {
        if(data.ok) {
          return data.json();
        }

        throw new Error('Requisição não completada.');
      })
      .then(data => setFollowers(data))
      .catch(err => console.log(err));
    }

    async function handleUserData() {
      await fetch(`https://api.github.com/users/${usuarioAleatorio}`)
      .then(data => {
        setRequestOk(data.ok);
        if(data.ok) {
          return data.json();
        }
        throw new Error('Usuário não existe.');
      })
      .then(data => setUserData(data))
      .catch(err => console.log(err));
    }

    handleLoadFollowersAndFollowing();
    handleUserData();
  }, [usuarioAleatorio]);

  function handleShowImageList(e) {
    e.preventDefault();
    setImageListShow(!imageListShow);
  }


  return (
    <>
    <AlurakutMenu githubUser={userData.login} />
    <MainGrid>
      <div className="profileArea" style={{gridArea: "profileArea"}}>
       <ProfileSidebar avatar={userData.login} name={userData.name} user={userData.login} />
      </div>
      <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
        <Box>
          <h1 className="title">
            Bem Vindo(a), {userData.name}
            <p style={{
              marginTop: "20px",
              fontSize: "16px",
              color: "#5A5A5A"
            }}>{userData.bio}</p>
            <OrkutNostalgicIconSet />
          </h1>
        </Box>
           
        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
              <input 
                placeholder="Adicione o @ do usuário" 
                name="title" 
                aria-label="Adicione o @ do usuário"
                type="text"
                value={nomeDoUsuario}
                onChange={(e) => setNomeDoUsuario(e.target.value)}
              />

              <button onClick={() => nomeDoUsuario === '' ? setUsuarioAleatorio('llofyy') : setUsuarioAleatorio(nomeDoUsuario)} style={{ marginBottom: "10px" }}>
                  Mudar usuário
              </button>
              {requestOk ? '' : <p style={{ color: "red" }}>Usuário não encontrado!</p>}
            </div>
            <hr />
          <form onSubmit={e => {
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);
            const comunidade = {
              title: dadosDoForm.get('title'), 
              image: dadosDoForm.get('image')
            }
            setComunidades([...comunidades, comunidade]);
          }}>
            <div>
              <input 
                placeholder="Qual vai ser o nome da comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da comunidade?"
                type="text" 
              />
            </div>
            <div>
              <input 
                placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                type="text"
                onChange={(e) => setUrlValue(e.target.value)}
                value={urlValue} 
              />
            </div>
            <button>
              Criar comunidade
            </button>
            <button onClick={handleShowImageList} style={{ marginLeft: "10px" }}>
              {!imageListShow ? 'Mostrar lista de imagens' : 'Esconder lista de imagens'}
            </button>
          </form>
        </Box>
        {!imageListShow ? '' : 
          <Box>
            <h2 className="subTitle">Escolha uma imagem padrão para sua comunidade:</h2>
            <ImagesList>
            {images.map(image => {
                return (
                    <img onClick={e => setUrlValue(e.target.src)} src={image} alt="Imagem padrão de comunidade"/>
                )
            })}
            </ImagesList>
          </Box>
        }
      </div>
      <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>

        <BoxContent title="Seguindo" items={following} user={userData} />

        <BoxContent title="Seguidores" items={followers} user={userData} />

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
            {comunidades.map(comunidade => {
              return (
                <li key={comunidade.title}>
                  <a href={`/users/${comunidade.title}`}>
                  <img src={comunidade.image} />
                  <span>{comunidade.title}</span>
                </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

      </div>
    </MainGrid>
    </>
  )
}
