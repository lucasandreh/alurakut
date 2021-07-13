import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, AlurakutStyles, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'; 
import { useEffect, useState } from "react";

function ProfileSidebar({ avatar }) {
  return (
    <Box>
      <img src={`https://github.com/${avatar}.png`} alt="Profile Image" style={{ borderRadius: '8px' }} />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'llofyy';
  const pessoasFavoritas = [
    'luizomf', 
    'rafaballerini', 
    'marcobrunodev', 
    'maykbrito', 
    'filipedeschamps', 
    'diego3g'
  ];

  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function handleLoadFollowersAndFollowing() {
      await fetch(`https://api.github.com/users/${usuarioAleatorio}/following`)
      .then(user => user.json())
      .then(user => setFollowing(user))
      .catch(err => console.log(err));

      await fetch(`https://api.github.com/users/${usuarioAleatorio}/followers`)
      .then(user => user.json())
      .then(user => setFollowers(user))
      .catch(err => console.log(err));
    }

    async function handleUserData() {
      await fetch(`https://api.github.com/users/${usuarioAleatorio}`)
      .then(user => user.json())
      .then(data => setUserData(data))
      .catch(err => console.log(err));
    }

    handleLoadFollowersAndFollowing();
    handleUserData();
  }, [])

  return (
    <>
    <AlurakutMenu githubUser={usuarioAleatorio} />
    <MainGrid>
      <div className="profileArea" style={{gridArea: "profileArea"}}>
       <ProfileSidebar avatar={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
        <Box>
          <h1 className="title">
            Bem Vindo(a), {userData.name}
            <OrkutNostalgicIconSet />
          </h1>
        </Box>
      </div>
      <div className="profileRelationsArea" style={{gridArea: "profileRelationsArea"}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
            {pessoasFavoritas.map(pessoa => {
              return (
                <li key={pessoa}>
                  <a href={`/users/${pessoa}`}>
                  <img src={`https://github.com/${pessoa}.png`} />
                  <span>{pessoa}</span>
                </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Seguindo ({userData.following})
          </h2>
          <ul>
            {following.map(pessoa => {
              return (
                <li key={pessoa.id}>
                  <a href={`/users/${pessoa.login}`}>
                  <img src={`https://github.com/${pessoa.login}.png`} />
                  <span>{pessoa.login}</span>
                </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Seguidores ({userData.followers.toLocaleString('pt-br')})
          </h2>
          <ul>
            {followers.map(pessoa => {
              return (
                <li key={pessoa.id}>
                  <a href={`/users/${pessoa.login}`}>
                  <img src={`https://github.com/${pessoa.login}.png`} />
                  <span>{pessoa.login}</span>
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
