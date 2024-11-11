import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <div class="">
      <Title />
      <AbilityScores />
      <h2>Kindred</h2>
      <h2>Class</h2>
      <h2>Stats</h2>
      <p>HP, AC, Speed</p>
      <p>Attack, Save Targets, Skill Targets, Languages</p>
      <h2>Traits</h2>
      <h2>Equipment</h2>
      <p>General, Class, Trinket</p>
      <h2>Alignment</h2>
      <p> 
        Decide whether your character is Lawful, Neutral, or Chaotic and note this on your
        character sheet.
      </p>
      <p><b>Class restrictions:</b> Clerics and friars may not be Chaotic.</p>
      <h2>Level and XP</h2>
      <p>Your character begins play at Level 1 with 0 XP.</p>
      <h2>Name and Details</h2>
      <p>
        Referring to the tables listed under your character’s Kindred, choose a name for your character. 
        Optionally, select a background and any extra details. You are now ready for adventure.
      </p>
    </div>
  );
};

const Title: Component = () => {
  return (
    <div class="mx-auto">
      <h1>Scapan</h1>
      <p class="italic text-xl">Dolmenwood Character Generator</p>
    </div>
  )
}

const AbilityScores: Component = () => {
  return (
    <div class="">
      <h2>Ability Scores</h2>
    </div>
  )
}

export default App;
