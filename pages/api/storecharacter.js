import prisma from '@component/lib/prismaClient';

export default async function handle(req, res) {
  
  if (req.method === 'POST') {
    // store the character data into the database
    const characterData = req.body;
    console.log('the character data is: ', characterData.id);
    const thisWorld = await prisma.world.findUnique({
      where: { chakra: characterData.traits.chakra },
    });
    console.log('this world is: ', thisWorld);
    const newCharacterTraits = {
      City: characterData.traits.city,
      Chakra: characterData.traits.chakra,
      'Birth Sign': characterData.traits['Birth Sign'],
      "Soul's Age": characterData.traits["Soul's Age"],
      'Karmic Debt': characterData.traits['Karmic Debt'],
      'Sacred Item': characterData.traits['Sacred Item'],
      'Guiding Totem': characterData.traits['Guiding Totem'],
      'Hidden Talent': characterData.traits['Hidden Talent'],
      'Spirit Animal': characterData.traits['Spirit Animal'],
      'Character Type': characterData.traits['Character Type'],
      'Platonic Solid': characterData.traits['Platonic Solid'],
      'Magical Ability': characterData.traits['Magical Ability'],
      'Cherished Memory': characterData.traits['Cherished Memory'],
      'Spiritual Lesson': characterData.traits['Spiritual Lesson'],
      'Ancestral Lineage': characterData.traits['Ancestral Lineage'],
      'Astral Connection': characterData.traits['Astral Connection'],
      'Elemental Affinity': characterData.traits['Elemental Affinity'],
      'Dream Manifestation': characterData.traits['Dream Manifestation'],
      'Past Life Occupation': characterData.traits['Past Life Occupation'],
    };
    const newCharacterForBackup = {
      genesisCharacterId: characterData.id, // to match with CharacterBackup model
      characterName: characterData.characterName,
      nftNumber: characterData.nftNumber,
      characterBackstory: characterData.characterBackstory, // changed from "backstory"
      imageId: characterData.imageId, // changed from "imagineAPIImageId"
      chosenImageUrl: characterData.chosenImageUrl, // change "chosenImageUrl" to "chosenImage"
      addedToIPFS: false,
      state: characterData.state,
      traits: newCharacterTraits,
      worldId: thisWorld.id,
    };
    console.log('in here. ', characterData.id);
    const existingCharacter = await prisma.characterBackup.findUnique({
      where: { genesisCharacterId: characterData.id },
    });

    if (existingCharacter) {
      // Character already exists, return an error or handle this situation as you see fit.
      res.status(409).send('Character already exists');
    } else {
      // Character doesn't exist, create new record
      const storedCharacter = await prisma.characterBackup.create({
        data: newCharacterForBackup,
      });
      console.log('the character was added to the db');
      res.json(storedCharacter);
    }
  } else {
    res.status(405).send('Method not allowed'); // Only allow POST requests
  }
}
