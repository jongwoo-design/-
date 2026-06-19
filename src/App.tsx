/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ActivitySection from './components/ActivitySection';
import CampaignSection from './components/CampaignSection';
import ApplySection from './components/ApplySection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#132a13] font-sans flex flex-col justify-between">
      <div>
        {/* Navigation Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Empathy Hero Unit, shown primarily on introduction/about page */}
        {activeTab === 'about' && (
          <HeroSection 
            onJoinClick={() => setActiveTab('apply')} 
            onExploreClick={() => setActiveTab('activity')} 
          />
        )}

        {/* Main Content Stage */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === 'about' && <AboutSection />}
              {activeTab === 'activity' && <ActivitySection />}
              {activeTab === 'campaign' && <CampaignSection />}
              {activeTab === 'apply' && <ApplySection />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Structured Supportive Credits Footer */}
      <Footer />
    </div>
  );
}
