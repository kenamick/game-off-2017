// sounds.js - supplier of foes sounds

class Sounds {
  
  static default(audio) {
    return {
      death: audio.sfx.npc.death,
      attack: audio.sfx.npc.hit,
      grunt: audio.sfx.npc.grunts
    };
  }

  static boss(audio) {
    return {
      death: audio.sfx.npc.death,
      attack: audio.sfx.npc.hit,
      grunt: audio.sfx.npc.boss.grunts
    };
  }

}

export { Sounds };
