/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BirthdayProvider, useBirthday } from './context/BirthdayContext';
import { CatCursor } from './components/CatCursor';
import { BunnyCompanion } from './components/BunnyCompanion';
import { NavigationControls } from './components/NavigationControls';
import { ChapterArchiveModal } from './components/ChapterArchiveModal';

// Chapters
import { Chapter1Entrance } from './components/chapters/Chapter1Entrance';
import { Chapter2Beginning } from './components/chapters/Chapter2Beginning';
import { Chapter3Journey } from './components/chapters/Chapter3Journey';
import { Chapter4LittleThings } from './components/chapters/Chapter4LittleThings';
import { Chapter5Quiz } from './components/chapters/Chapter5Quiz';
import { Chapter6Cake } from './components/chapters/Chapter6Cake';
import { Chapter7Letter } from './components/chapters/Chapter7Letter';
import { Chapter8Surprise } from './components/chapters/Chapter8Surprise';

const ChapterRenderer: React.FC = () => {
  const { currentChapter } = useBirthday();

  const renderActiveChapter = () => {
    switch (currentChapter) {
      case 1:
        return <Chapter1Entrance />;
      case 2:
        return <Chapter2Beginning />;
      case 3:
        return <Chapter3Journey />;
      case 4:
        return <Chapter4LittleThings />;
      case 5:
        return <Chapter5Quiz />;
      case 6:
        return <Chapter6Cake />;
      case 7:
        return <Chapter7Letter />;
      case 8:
        return <Chapter8Surprise />;
      default:
        return <Chapter1Entrance />;
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-[#f7f2ea]">
      {/* Active Chapter Container */}
      <div key={currentChapter} className="w-full h-full animate-in fade-in duration-500">
        {renderActiveChapter()}
      </div>

      {/* Persistent UI layers */}
      <NavigationControls />
      <BunnyCompanion />
      <CatCursor />
      <ChapterArchiveModal />
    </main>
  );
};

export default function App() {
  return (
    <BirthdayProvider>
      <ChapterRenderer />
    </BirthdayProvider>
  );
}
