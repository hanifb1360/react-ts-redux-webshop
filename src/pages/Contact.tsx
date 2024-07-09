import React from 'react';
import Layout from '../components/Layout';

const Contact: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center">Contact Us</h1>
        <p className="mt-4 text-lg text-center">Get in touch with us...</p>
        <div className="mt-8 max-w-lg mx-auto">
          <form>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2">Name</label>
              <input type="text" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2">Email</label>
              <input type="email" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-bold mb-2">Message</label>
              <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 rounded">Send</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
