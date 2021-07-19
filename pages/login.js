import React, { useEffect, useState } from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';
import Head from 'next/head';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const date = new Date();
      
//   async function getUser() {
//     await fetch(`https://api.github.com/users/${githubUser}`)
//     .then(async (response) => {
//         await response.json();
//         setRequestStatus(response.ok);
//         console.log(requestStatus);
//         console.log(response.ok)
//     })
// }

  return (
    <>
    <Head>
      <title>Alurakut</title>
    </Head>
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={async (infosDoEvento) => {
                infosDoEvento.preventDefault();
                fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                       'Content-Type': 'application/json'  
                    },
                    body: JSON.stringify({ githubUser: githubUser })
                    })
                    .then(async (respostaDoServer) => {
                        const dadosDaResposta = await respostaDoServer.json()
                        const token = dadosDaResposta.token;
                        nookies.set(null, 'USER_TOKEN', token, {
                            path: '/',
                            maxAge: 86400 * 7 
                        })
                        router.push('/')
                    })
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
          </p>
            <input
                placeholder="Usuário"
                value={githubUser}
                onChange={(evento) => {
                    setGithubUser(evento.target.value)
                }}
                required
            />
            {/* {!requestStatus ? <p style={{ color: "red" }}>Usuário não existe.</p> : ''} */}
            <br />
            <button type="submit">
              Login
            </button>
          </form>
          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
              </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © {date.getFullYear()} LLOFYY - <a href="https://github.com/llofyy/alurakut">Sobre o projeto</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
    </>
  )
} 