// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="NOT FOUND">
        <p>ERROR 404: The link that you have entered is not valid!</p>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
