import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../../src/components/ProfileRelations'; 
import { useEffect, useState } from "react";

import BoxContent from "../../src/components/BoxContent";
import Repositories from "../../src/components/Repositories";
import { useRouter } from "next/dist/client/router";

import Head from 'next/head';

function ProfileSidebar({ avatar, name, user }) {
  return (
    <Box>
      <img src={`https://github.com/${avatar}.png`} alt="Profile Image" style={{ borderRadius: '8px'}} />
      <AlurakutProfileSidebarMenuDefault name={name} user={user} />
    </Box>
  )
}

export default function Home() {

    const router = useRouter()
    const { username } = router.query;
  
  const usuarioAleatorio = username;

  const [comunidades, setComunidades] = useState([]);
  const [userData, setUserData] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [repositories, setRepositories] = useState([]);

  const token = "6153afb9f1143958ccc7a1b054b4e1";

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
        if(data.ok) {
          return data.json();
        }

        throw new Error('Usuário não existe.');
      })
      .then(data => setUserData(data))
      .catch(err => {});
    }
 
    async function handleGetCommunities() {
      await fetch('https://graphql.datocms.com/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "query":
            `query{
              allCommunities {
                id,
                title,
                imageUrl,
                creatorSlug
            }
          }`
        })
      })
      .then(response => response.json())
      .then(respostaConvertida => {
        setComunidades(respostaConvertida.data.allCommunities);
      })

    }

    async function handleLoadRepositories() {
      await fetch(`https://api.github.com/users/${usuarioAleatorio}/repos`)
      .then(async response => {
        const respostaConvertida = await response.json();
        setRepositories(respostaConvertida);
      });
    }

    handleLoadFollowersAndFollowing();
    handleUserData();
    handleGetCommunities();
    handleLoadRepositories();
  }, [usuarioAleatorio]);

  return (
    <>
    <Head>
      <title>Alurakut | {usuarioAleatorio}</title>
    </Head>
    <AlurakutMenu githubUser={usuarioAleatorio} />
    <MainGrid>
      <div className="profileArea" style={{gridArea: "profileArea"}}>
       <ProfileSidebar avatar={usuarioAleatorio} name={userData.name} user={usuarioAleatorio} />
      </div>
      <div className="welcomeArea" style={{gridArea: "welcomeArea"}}>
        <Box>
          <h1 className="title">
            <p style={{
              marginTop: "20px",
              fontSize: "16px",
              color: "#5A5A5A"
            }}>{userData.bio}</p>
            <OrkutNostalgicIconSet />
          </h1>
        </Box>

          <Box>
            <h2 className="subTitle">Repositórios públicos de {usuarioAleatorio}:</h2>
            <Repositories items={repositories} user={usuarioAleatorio} />
          </Box>
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
                <li key={comunidade.id}>
                  <a href={`/users/${comunidade.title}`}>
                  <img src={comunidade.imageUrl} />
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
