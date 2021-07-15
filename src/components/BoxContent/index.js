import { ProfileRelationsBoxWrapper } from '../ProfileRelations'; 

export default function BoxContent({ title, items, user }) {
    return (
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {title} ({title === "Seguindo" ? user.following : user.followers})
          </h2>
          <ul>
            {items.map(pessoa => {
              return (
                <li key={pessoa.id}>
                  <a href={`https://github.com/${pessoa.login}`} target="_blank">
                  <img src={`https://github.com/${pessoa.login}.png`} />
                  <span>{pessoa.login}</span>
                </a>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
    )
}