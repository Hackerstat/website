import React, { FunctionComponent, ReactNode } from 'react';
import Head from 'next/head';

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
      {children}
    </div>
  </div>
);

export default Layout;
