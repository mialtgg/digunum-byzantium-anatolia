import React from 'react';

const AboutPage: React.FC = () => (
  <div className="max-w-2xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-4">About Us</h1>
    <p className="mb-2">This is a dummy About Us page for the Byzantine Anatolia project. Here you can add information about your team, mission, and project goals.</p>
    <ul className="list-disc pl-6">
      <li>Project started: 2024</li>
      <li>Team: Byzantium Researchers</li>
      <li>Mission: Digitize and share Byzantine coin finds from Anatolia</li>
    </ul>
  </div>
);

export default AboutPage; 