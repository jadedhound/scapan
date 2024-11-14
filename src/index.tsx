/* @refresh reload */
import { render } from 'solid-js/web';
import type { Component } from 'solid-js';
import { AbilityScores } from './abilityScores';

import './index.css';
import { CharacterModelProvider } from './characterModel';
import { KindredView } from './kindred';
import { CharClassView } from './charClass'
import { Stats } from './stats';
import { Reroll } from './reroll';
import { Traits } from './traits';

const Title: Component = () => {
  return (
    <div class="md:col-span-2 lg:col-span-3 mx-auto text-center mb-4">
      <h1>Scapan</h1>
      <p class="italic text-xl">Dolmenwood Character Generator</p>
    </div>
  )
}

const Equipment: Component = () => {
  const GeneralItems = [["Common Clothes", 30], ["Backpack", 50], ["2 preserved rations", 40], ["Waterskin", 50], ["Tinderbox", 10], ["Belt pouch", 10], ["3d6 gp", 36]];
  return (
    <div>
      <h2>Equipment</h2>
      <h3>General</h3>
      <table class="mb-4">
        <thead>
          <tr>
            <td>Item</td>
            <td>Weight</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      <h3>Class</h3>
      <p><b>Trinket:</b> None</p>
    </div>
  )
}

const Alignment: Component = () => {
  return (
    <div>
      <h2>Alignment</h2>
      <p>
        Decide whether your character is Lawful, Neutral, or Chaotic and note this on your
        character sheet.
      </p>
      <p><b>Class restrictions:</b> Clerics and friars may not be Chaotic.</p>
    </div>
  )
}

const LevelAndXP: Component = () => {
  return (
    <div>
      <h2>Level and XP</h2>
      <p>Your character begins play at Level 1 with 0 XP.</p>
    </div>
  )
}

const NameAndDetails: Component = () => {
  return (
    <div class="mb-4">
      <h2>Name and Details</h2>
      <p>
        Referring to the tables listed under your character’s Kindred, choose a name for your character.
        Optionally, select a background and any extra details. You are now ready for adventure.
      </p>
    </div>
  )
}

const App: Component = () => {
  return (
    <CharacterModelProvider>
      <main class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Title />
        <AbilityScores />
        <KindredView />
        <CharClassView />
        <Stats />
        <Traits />
        <Equipment />
        <Alignment />
        <LevelAndXP />
        <NameAndDetails />
        <Reroll />
      </main>
    </CharacterModelProvider>
  );
};

render(() => <App />, document.getElementById('root')!);
