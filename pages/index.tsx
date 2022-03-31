import type { NextPage } from 'next';
import Head from 'next/head';
import { HomePage } from '../components/home/home-page';
import { MainLayout } from '../components/main-layout';
import Web3Provider from '../components/web3/providers/web3-provider';


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mailio Web Client</title>
      </Head>
      <main>
        <Web3Provider />
        <HomePage />
      </main>
    </>
  )
}

Home.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
)


export default Home
