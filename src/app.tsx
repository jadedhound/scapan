import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <main class="md:grid md:grid-cols-2 gap-x-8 gap-y-4">
      <Title />
      <AbilityScores />
      <Kindred />
      <Class />
      <Stats />
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

    </main>
  );
};

const Title: Component = () => {
  return (
    <div class="md:col-span-2 mx-auto text-center mb-4">
      <h1>Scapan</h1>
      <p class="italic text-xl">Dolmenwood Character Generator</p>
    </div>
  )
}

const AbilityScores: Component = () => {
  return (
    <div class="">
      <h2>Ability Scores</h2>
       <table>
        <thead>
          <tr>
            <td>STR</td>
            <td>DEX</td>
            <td>CON</td>
            <td>WIS</td>
            <td>INT</td>
            <td>CHA</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10 (+0)</td>
            <td>10 (+0)</td>
            <td>10 (+0)</td>
            <td>10 (+0)</td>
            <td>10 (+0)</td>
            <td>10 (+0)</td>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

const Kindred: Component = () => {
  return (
    <div class="">
      <h2>Kindred</h2>
      <div class="grid grid-cols-3 gap-2">
        <div>
        <input type="radio" id="Breggle" name="kindred" value="Breggle" />
        <label for="Breggle">Breggle</label>
        </div>
        <div>
        <input type="radio" id="Elf" name="kindred" value="Elf" />
        <label for="Elf">Elf</label>
        </div>
        <div>
        <input type="radio" id="Grimalkin" name="kindred" value="Grimalkin" />
        <label for="Grimalkin">Grimalkin</label>
        </div>
        <div>
        <input type="radio" id="Human" name="kindred" value="Human" checked />
        <label for="Human">Human</label>
        </div>
        <div>
        <input type="radio" id="Mossling" name="kindred" value="Mossling" />
        <label for="Mossling">Mossling</label>
        </div>
        <div>
        <input type="radio" id="Woodgrue" name="kindred" value="Woodgrue" />
        <label for="Woodgrue">Woodgrue</label>
        </div>
      </div>
    </div>
  )
}

const Class: Component = () => {
  return (
    <div class="">
      <h2>Class</h2>
      <div class="grid grid-cols-3 gap-2">
        <div>
          <input type="radio" id="Bard" name="class" value="Bard" />
          <label for="Bard">Bard</label>
        </div>
        <div>
          <input type="radio" id="Cleric" name="class" value="Cleric" />
          <label for="Cleric">Cleric</label>
        </div>
        <div>
          <input type="radio" id="Enchanter" name="class" value="Enchanter" />
          <label for="Enchanter">Enchanter</label>
        </div>
        <div>
          <input type="radio" id="Fighter" name="class" value="Fighter" checked />
          <label for="Fighter">Fighter</label>
        </div>
        <div>
          <input type="radio" id="Friar" name="class" value="Friar" />
          <label for="Friar">Friar</label>
        </div>
        <div>
          <input type="radio" id="Hunter" name="class" value="Hunter" />
          <label for="Hunter">Hunter</label>
        </div>
        <div>
          <input type="radio" id="Knight" name="class" value="Knight" />
          <label for="Knight">Knight</label>
        </div>
        <div>
          <input type="radio" id="Magician" name="class" value="Magician" />
          <label for="Magician">Magician</label>
        </div>
        <div>
          <input type="radio" id="Thief" name="class" value="Thief" />
          <label for="Thief">Thief</label>
        </div>
      </div>
    </div>
  )
}

const Stats: Component = () => {
  return (
    <div class="">
      <h2>Stats</h2>        
      <table class="mb-4">
        <thead>
          <tr>
            <td>HP</td>
            <td>AC</td>
            <td>Speed</td>
            <td>Attack</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>0 (0 with Shield)</td>
            <td>0 ft</td>
            <td>+0</td>
          </tr>
        </tbody>
      </table>      
      <h3>Save Targets</h3>
      <table class="mb-4">
        <thead>
          <tr>
            <td>Doom</td>
            <td>Ray</td>
            <td>Hold</td>
            <td>Blast</td>
            <td>Spell</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>      
      <p><b>Skill Targets:</b> None</p>
      <p><b>Languages:</b> Woldish</p>
    </div>
  )
}

export default App;
