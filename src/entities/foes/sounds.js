// sounds.js - supplier of foes sounds

class Sounds {
  
  static default(audio) {
    return {
      death: audio.sfx.npc.death,
      attack: audio.sfx.npc.hit,
    };
  }
    
}
  
export { Sounds };
