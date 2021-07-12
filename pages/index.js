import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, AlurakutStyles, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'; 

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
            Bem Vindo(a)
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
      </div>
    </MainGrid>
    </>
  )
}
