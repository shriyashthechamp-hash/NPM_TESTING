import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { TransformationArena } from './components/arena/TransformationArena';
import { StyleCatalogExplorer } from './components/explorer/StyleCatalogExplorer';
import { ComponentPlayground } from './components/playground/ComponentPlayground';
import { DesignDnaInspector } from './components/dna/DesignDnaInspector';
import { PromptForge } from './components/prompt/PromptForge';
import { StyleRecommender } from './components/recommend/StyleRecommender';
import { DeveloperExportStudio } from './components/export/DeveloperExportStudio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [selectedArenaStyleId, setSelectedArenaStyleId] = useState<string>('neo-brutalism');
  const [selectedPromptStyleId, setSelectedPromptStyleId] = useState<string>('neo-brutalism');

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleSelectStyleForArena = (styleId: string) => {
    setSelectedArenaStyleId(styleId);
    setActiveTab('arena');
  };

  const handleOpenPromptForgeWithStyle = (styleId: string) => {
    setSelectedPromptStyleId(styleId);
    setActiveTab('prompt');
  };

  return (
    <div className="min-h-screen bg-midnight-950 text-midnight-100 flex flex-col font-sans selection:bg-lime-electric selection:text-midnight-950">
      {/* Top Persistent Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            setActiveTab={setActiveTab}
            onSelectStyleForArena={handleSelectStyleForArena}
            onOpenPromptForgeWithStyle={handleOpenPromptForgeWithStyle}
          />
        )}

        {activeTab === 'arena' && (
          <TransformationArena
            initialStyleId={selectedArenaStyleId}
            setActiveTab={setActiveTab}
            onOpenPromptForgeWithStyle={handleOpenPromptForgeWithStyle}
          />
        )}

        {activeTab === 'explorer' && (
          <StyleCatalogExplorer
            onSelectStyleForArena={handleSelectStyleForArena}
            onOpenPromptForgeWithStyle={handleOpenPromptForgeWithStyle}
          />
        )}

        {activeTab === 'playground' && <ComponentPlayground />}

        {activeTab === 'dna' && <DesignDnaInspector />}

        {activeTab === 'prompt' && <PromptForge initialStyleId={selectedPromptStyleId} />}

        {activeTab === 'recommend' && (
          <StyleRecommender
            onSelectStyleForArena={handleSelectStyleForArena}
            onOpenPromptForgeWithStyle={handleOpenPromptForgeWithStyle}
          />
        )}

        {activeTab === 'export' && <DeveloperExportStudio />}
      </main>

      {/* Persistent Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
