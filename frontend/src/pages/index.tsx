import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  return (
    <header
      className={clsx('hero', styles.heroBanner)}
      style={{
        background:
          colorMode === 'dark'
            ? 'linear-gradient(45deg, #1a1a1a, #333333)'
            : 'linear-gradient(45deg, #ffffff, #f0f0f0)',
        color: colorMode === 'dark' ? '#ffffff' : '#000000',
      }}
    >
      <div className="container">
        <Heading
          as="h1"
          className="hero__title"
          style={{
            textShadow:
              colorMode === 'dark' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {siteConfig.title}
        </Heading>
        <p
          className="hero__subtitle"
          style={{
            textShadow:
              colorMode === 'dark' ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction"
            style={{
              boxShadow:
                colorMode === 'dark'
                  ? '0 4px 8px rgba(0,0,0,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            Start Reading
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
