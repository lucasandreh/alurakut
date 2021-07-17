import nookies from 'nookies';

export default function LogoutPage() {
    return <h1>Logout</h1>
}

export async function getServerSideProps(context) {
      nookies.destroy(context, 'USER_TOKEN');
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
}