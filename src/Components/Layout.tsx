import React, { FunctionComponent, ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ children, title, description }) => (
  <div>
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
    </Head>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
