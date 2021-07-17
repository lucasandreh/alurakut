import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;
    gap: 10px;
`;

const Repo = styled.div`
    display: flex;
    gap: 10px;
    background-color: #D9E6F6;
    padding: 10px;
    border-radius: 8px;
    align-items: center;

    img {
        max-width: 60px;
        max-height: 60px;
        border-radius: 31px;
        position: relative;
    }

    .user-data {
        margin-bottom: 10px;
        a {
            text-decoration: none;
            font-weight: 700;
            color: #2E7BB4;
        }

        p {
            font-size: 13px;
            color: #5A5A5A;
        }
    }

    p {
        color: #333333;
        font-size: 15px;
    }
`;

export default function Repositories({ items, user }) {
    return (
        <Container>
            {items.map(item => {

                const dateFormat = item.created_at.replace("T", " ").replace("Z", "").replaceAll("-", "/").split(" ")
                const [date, hour] = dateFormat;
                const hourFormat = hour.split(":")
                const [horas, minutos] = hourFormat;
                const newDate = new Date(date).toLocaleDateString()

                return (
                <Repo key={item.id}>
                    <img src={`https://github.com/${user}.png`} />
                    <div>
                        <div className="user-data">
                            <a href={item.html_url} target="_blank">{item.name}</a>
                            <p>{`${newDate} - ${horas}:${minutos}`}</p>
                        </div>
                        <p>{item.description}</p>
                    </div>
                </Repo>
                )
            })}
        </Container>
    )
}