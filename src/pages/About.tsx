import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center">About Us</h1>
        <p className="mt-4 text-lg text-center">Learn more about our company...</p>
        <div className="mt-8">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="mt-2">Our mission is to provide the best products and services...</p>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-bold">Our Team</h2>
          <p className="mt-2">We have a team of dedicated professionals...</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
