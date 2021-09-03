import * as React from 'react';
import { Container } from "@material-ui/core";
import Head from "next/head";

import { Navbar } from 'components';

interface MainLayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
  = ({
       children,
       title,
       description,
       keywords
     }) => {


  return <>
    <Head>
      <title>{title || 'Wave optics'}</title>
      <meta name="description" content={`Wave optics.` + description}/>
      <meta name="robots" content="index, follow"/>
      <meta name="keywords" content={keywords || "physics, wave, optics"}/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
    <Navbar/>
    <Container maxWidth="lg">
      <main>
        {children}
      </main>
    </Container>
  </>;
};

export default MainLayout;


