/* @refresh reload */
import { render } from 'solid-js/web';
import type { Component } from 'solid-js';
import { AbilityScores } from './abilityScores';

import './index.css';
import { StateProvider } from './state';
import { KindredView } from './kindred';
import { CClassView } from './cClass'
import { Stats } from './stats';
import { Reroll } from './reroll';
import { Traits } from './traits';
import { Equipment } from './equipment';

const Title: Component = () => {
  return (
    <div class="md:col-span-2 lg:col-span-3 mx-auto text-center mb-4">
      <h1>Scapan</h1>
      <p class="italic text-xl">Dolmenwood Character Generator</p>
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

const Footer: Component = () => {
  return (
    <div class="md:col-span-2 lg:col-span-3 flex justify-center gap-4">
      <a href="https://github.com/jadedhound/scapan" target="_blank" class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-8 h-8 fill-green-500">
          <path d="M169 273c-25 0-35 33-35 53s10 52 35 52 35-32 35-52-10-53-35-53zM345 273c-25 0-35 33-35 53s10 52 35 52 35-32 35-52-10-53-35-53z" />
          <path d="M449 168c5-15 7-31 7-46 0-21-5-31-14-50-43 0-71 8-103 34a367 367 0 0 0-162 1c-33-26-61-35-105-35-9 19-14 29-14 50 0 15 3 31 8 46-27 31-40 69-40 109 0 31 5 64 19 91 38 75 144 72 217 72 71 0 171 2 207-72 14-28 17-60 17-91 0-40-11-78-37-109zM280 423h-46c-67 0-144-13-144-97 0-42 25-79 70-79 18 0 36 3 54 5a283 283 0 0 0 86 0c18-2 36-5 54-5 45 0 70 37 70 79 0 84-77 97-144 97z" />
        </svg>
        <div class="mt-1 font-bold">Source</div>
      </a>
      <a href="https://www.dolmenwood.necroticgnome.com/rules/doku.php?id=start" target="_blank" class="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 330 349" class="w-6 h-6">
          <path class="fill-red-500" d="M255 2a53 53 0 0 0-22 12l-10 14-5 13-1 17c0 10 0 12 2 19l7 12a58 58 0 0 0 22 17l13 6a68 68 0 0 0 42-5l9-6 9-10 5-10 3-11V57l-3-12a86 86 0 0 0-23-36l-10-6c-5-2-9-2-18-3-10 0-14 0-20 2zM48 9c-4 0-10 2-14 4l-11 5-10 9A52 52 0 0 0 1 54L0 67l4 14 8 15 9 10a47 47 0 0 0 22 11l13 2 14-2c4 0 11-3 16-5l13-8 9-10 6-12c2-7 3-9 2-21 0-14 0-15-3-24s-4-11-8-15l-12-8c-4-2-10-5-13-5L64 7 48 9zm118 26-5 5c0 2-2 3-2 3l-6-3q-4-4-7-4t-4 2l-3 6 2 13 2 18v9c-11 22-12 25-12 29l2 7 5 3c2 1 4 0 7-1s6-3 7-5l6-8a116 116 0 0 0 6-19c1-2 1-2 3-1l6 8 9 13 9 7 8 2 7-2 4-5c0-3 0-5-2-8s-6-9-13-15l-13-15c-2-5-3-8-3-17l-2-15c-1-2-2-5-4-6l-3-3-4 2zm80 96 2 6a378 378 0 0 0 18 36l-13-1-16-2c-4 0-4 0-4 2l2 9v8q-1 1-6-1l-12-6a311 311 0 0 1-28-17c-2 0-3 0-6 5a301 301 0 0 1-12 11l-5-8-5-9h-7l-17 8-18 8-8 4h-4l3-10 3-10-1-3-18 4-17 4c-1-1 1-5 3-9l7-18 3-10-4 2a974 974 0 0 0-66 60v3l8 1 21-2 23-2c8 0 8 1 8 2l-4 11-4 10c0 2 0 3 2 3l9-2a209 209 0 0 0 45-19l21-10a320 320 0 0 1 20 29l3 2 4-2 8-10a218 218 0 0 0 11-14l16 8 21 10a207 207 0 0 0 35 8l8-1-7-13-6-11h12a534 534 0 0 0 42 0c2-1 4-2 4-4 1-2 1-2-1-5l-16-12a436 436 0 0 1-52-42l-5-3v1zm-82 116c0 10 0 12-2 13-1 1-3 2-8 2s-7-1-9-2c-1-2-2-4-2-13v-11l-15 2c-2 1-3 2-4 11 0 8-1 11-3 12l-7 1c-4 0-5 0-7-2-3-3-3-4-3-10v-8l-9 2-7 2c-2 1-3 2-4 5a171 171 0 0 0-4 47l1 19h22v-19l3-7c2-1 3-2 7-2l8 1 3 4 1 14v10h19c2-1 2-1 1-12v-14c1-3 2-3 5-4l9 1c3 1 4 2 4 4l1 14 1 11 14 1 5-1a324 324 0 0 1-2-25l2-4a20 20 0 0 1 14 0l3 5 1 16-1 20-1 11 4 6c2 2 3 2 7 2l6-3 3-7c1-2 0-6-1-12l-2-14a80 80 0 0 1 0-21l5-3h8c3 1 4 2 5 4v24l14 3 8-1 4-2a988 988 0 0 0-6-68l-9-4-9-2-1 9-3 9-5 1-7-1c-2-1-2-2-3-8v-14l-13-2h-3l-1 23-5 3-8-1-4-2v-24l-10-1h-10z" />
          <path class="fill-stone-950" d="m272 44-6 4-3 5v5l2 6 4 4 8 2 7-2a15 15 0 0 0 6-11l-1-5-5-6-6-2h-7zM53 51c-1 1-4 3-5 6-2 4-3 5-2 8 0 2 1 5 3 7 1 2 3 3 6 4h8l4-3 4-5 1-6-2-6-5-5-6-2-6 2z" />
        </svg>
        <div class="mt-1 font-bold">Wiki</div>
      </a>
    </div>
  )
}

const App: Component = () => {
  return (
    <StateProvider>
      <main class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Title />
        <AbilityScores />
        <KindredView />
        <CClassView />
        <Stats />
        <Traits />
        <Equipment />
        <Alignment />
        <LevelAndXP />
        <NameAndDetails />
        <Reroll />
        <Footer />
      </main>
    </StateProvider>
  );
};

render(() => <App />, document.getElementById('root')!);
