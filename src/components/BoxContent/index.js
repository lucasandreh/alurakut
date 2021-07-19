import { ProfileRelationsBoxWrapper } from '../ProfileRelations';
import Link from 'next/link'; 

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
                  <Link href={`/users/${pessoa.login}`}>
                    <a>
                      <img src={`https://github.com/${pessoa.login}.png`} />
                      <span>{pessoa.login}</span>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>
    )
}