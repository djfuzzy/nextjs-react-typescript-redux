import Head from 'next/head';
import Footer from '../components/Footer';

const Layout: React.FC = (props) => (
  <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>{props.children}</main>
    <Footer />
  </>
);

export default Layout;
