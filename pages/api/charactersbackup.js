import prisma from '@component/lib/prismaClient';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    axios
      .get('http://localhost:3000/api/charactersbackup')
      .then(async response => {
        // The API response data.
        const apiData = response.data;
        const characters = apiData.characters.filter(x => x.state !== 'VOID');

        // Iterate over the characters array.
        for (const character of characters) {
          // Format the data to fit your schema.
          const world = await prisma.world.findUnique({
            where: { chakra: character.traits.chakra },
          });
          const formattedCharacter = {
            id: character.id,
            createdAt: new Date(character.createdAt),
            updatedAt: new Date(character.updatedAt),
            worldId: world.id,
            promptForMidjourney: character.promptForMidjourney,
            characterName: character.characterName,
            nftNumber: character.nftNumber,
            characterBackstory: character.characterBackstory,
            imageId: character.imageId,
            upscaledImageUrls: JSON.stringify(character.upscaledImageUrls),
            chosenImageUrl: character.chosenImageUrl,
            readyToMint: character.readyToMint,
            completionResponse: character.completionResponse,
            tweeted: character.tweeted,
            addedToIPFS: character.addedToIPFS,
            state: character.state,
            traits: character.traits,
            worldCharacteristicsOfPeople:
              character.worldCharacteristicsOfPeople,
          };

          // Insert the formatted data into your database.
          await prisma.characterBackup.create({
            data: formattedCharacter,
          });
          console.log('One character was added.');
        }
      })
      .catch(error => {
        console.error(
          'There was an error fetching the data from the API:',
          error
        );
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
}

async function addWorldsToDb() {
  for (let world of worlds) {
    // Create the world first
    console.log('creating the following world: ', world);
    const createdWorld = await prisma.world.create({
      data: {
        name: world.name,
        chakra: world.chakra,
        otherside: world.otherside,
        description: world.description,
        characteristics: world.characteristics,
        characteristicsOfPeople: world.characteristicsOfPeople,
      },
    });
    console.log('the worlds were created');

    // Map through landmarks and create each one
    for (let landmark of world.landmarks) {
      await prisma.landmark.create({
        data: {
          name: landmark,
          worldId: createdWorld.id,
        },
      });
    }
    console.log('the landmarks were created');

    // Map through cities and create each one
    for (let city of world.cities) {
      await prisma.city.create({
        data: {
          name: city.cityName,
          associatedLandmark: city.associatedLandmark,
          mainActivity: city.mainActivity,
          worldId: createdWorld.id,
        },
      });
    }
    console.log('the cities were created.');

    // Map through celebrations and create each one
    for (let celebration of world.celebrations) {
      await prisma.celebration.create({
        data: {
          name: celebration,
          worldId: createdWorld.id,
        },
      });
    }
    console.log('the celebrations were created');
  }
}

const worlds = [
  {
    name: 'primordia',
    chakra: 1,
    color: 'red',
    landmarks: [
      'The Maroon Marshes (a marshy area with red soil and vegetation).',
      'Blood River (constantly flows with red water, symbolic of life)',
      'Scarlet Summit (a massive mountain peak with red stones)',
    ],
    cities: [
      {
        cityName: 'Rubicund Ridge',
        associatedLandmark: 'Scarlet Summit',
        mainActivity: 'Harvesting of the Red Rust, key resource of Primordia',
      },
      {
        cityName: 'Marsh Metropolis',
        associatedLandmark: 'The Maroon Marshes',
        mainActivity: 'Main trading hub and business center of Primordia',
      },
      {
        cityName: 'Bleeding Bay',
        associatedLandmark: 'Blood River',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Primordia',
      },
    ],
    characteristicsOfPeople:
      'Muscular and robust physiques, sharp eyes, prominent scars from battles, tattoo markings of their victories, animal-like features (fangs, claws, etc.).',
    celebrations: [
      'Survival Day (a day of endurance and strength competitions).',
      "Ancestor's Day (a day dedicated to paying homage to ancestors)",
      'Battle Victory Day (a day of celebrating victories and remembering the fallen)',
    ],
    otherside: 'crimson',
    description: 'The land of primal and survival aspects of existence.',
    characteristics:
      'They can be the warriors, the protectors, the guardians of the world. They are deeply connected with nature and the physical world. They could be related to animals, warriors, or any physical, grounded character type.',
  },
  {
    name: 'emblazion',
    color: 'orange',
    chakra: 2,
    landmarks: [
      'The Lava Lakes (lakes that resemble lava, symbolizing passion)',
      'Amber Cascade (a waterfall that shines like amber in sunlight).',
      'Fire Fronds Forest (a forest with orange foliage that appears to be on fire)',
    ],
    cities: [
      {
        cityName: 'Lava Landing',
        associatedLandmark: 'The Lava Lakes',
        mainActivity:
          'Harvesting of the Ignis Essence, a key resource of Emblazion',
      },
      {
        cityName: 'Amber Atrium',
        associatedLandmark: 'Amber Cascade',
        mainActivity: 'Main trading hub and business center of Emblazion',
      },
      {
        cityName: 'Frond Fiesta',
        associatedLandmark: 'Fire Fronds Forest',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Emblazion',
      },
    ],
    characteristicsOfPeople:
      'Expressive eyes, vibrant, colorful hair, graceful movements, clothing often features artistic, handmade adornments.',
    celebrations: [
      'Festival of Lights (celebrating the fire within, featuring thousands of lanterns)',
      'Passion Play (a theater festival)',
      'Emotion Day (a day of expressing and acknowledging emotions)',
    ],
    otherside: 'molten',
    description: 'The land of creativity and emotional aspects.',
    characteristics:
      'They are artists, musicians, poets, dancers, and dreamers. They represent passion, desire, and the emotional drive that propels ones journey.',
  },
  {
    name: 'chryseos',
    color: 'yellow',
    chakra: 3,
    landmarks: [
      'Lustrous Labyrinth (a maze made from shiny yellow minerals),',
      'The Shimmering Sands (a desert with golden sand)',
      'The Sunflower Savannas (endless plains covered in blooming sunflowers)',
    ],
    cities: [
      {
        cityName: 'Lustrous Landing',
        associatedLandmark: 'Lustrous Labyrinth',
        mainActivity:
          'Harvesting of Lustrous Minerals, key resource of Chryseos',
      },
      {
        cityName: 'Sandstone Square',
        associatedLandmark: 'The Shimmering Sands',
        mainActivity: 'Main trading hub and business center of Chryseos',
      },
      {
        cityName: 'Savanna Soiree',
        associatedLandmark: 'The Sunflower Savannas',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Chryseos',
      },
    ],
    characteristicsOfPeople:
      'Muscular and lean bodies, sharp, determined eyes, radiant hair that gleams under sunlight, wear clothes made of durable materials with minimalistic designs.',
    celebrations: [
      'Transformation Festival (celebrating personal growth and change)',
      'Golden Gala (a grand gathering and feast)',
    ],
    otherside: 'luster',
    description: 'The land of personal strength, willpower and transformation.',
    characteristics:
      'They are the leaders, heroes, or inspirational figures that help one find their inner strength and assert their will.',
  },
  {
    name: 'eleasis',
    chakra: 4,
    landmarks: [
      'The Healing Pond (a small pond with healing properties)',
      'The Emerald Grove (a grove with emerald-green grass)',
      'The Love Leaf Locus (a spot surrounded by heart-shaped leaves)',
    ],
    cities: [
      {
        cityName: 'Pond Pavillion',
        associatedLandmark: 'The Healing Pond',
        mainActivity:
          'Harvesting of the Healing Herbs, key resource of Eleasis',
      },
      {
        cityName: 'Grove Galleria',
        associatedLandmark: 'The Emerald Grove',
        mainActivity: 'Main trading hub and business center of Eleasis',
      },
      {
        cityName: 'Leaf Spot',
        associatedLandmark: 'The Love Leaf Locus',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Eleasis',
      },
    ],
    characteristicsOfPeople:
      'Soft and calm eyes, hair that resembles vines or leaves, gentle demeanor, clothes made of natural fibers in earthy tones.',
    celebrations: [
      "Love's Bloom (a festival celebrating love)",
      'Renewal Day (a day to renew vows and relationships).',
    ],
    color: 'green',
    otherside: 'jungle',
    description: 'The land of Compassion.',
    characteristics:
      'They are healers, nurturers, and the embodiments of unconditional love. They remind us of the power of compassion and love in our journey.',
  },
  {
    name: 'voxlumis',
    chakra: 5,
    landmarks: [
      'Echo Canyon (a canyon where even the slightest sound echoes)',
      'The Sapphire Sea (a vast blue sea)',
      'The Whispering Woods (a forest where even the trees seem to speak)',
    ],
    cities: [
      {
        cityName: 'Echo Enclave',
        associatedLandmark: 'Echo Canyon',
        mainActivity: 'Harvesting of Echo Crystals, key resource of Voxlumis',
      },
      {
        cityName: 'Sapphire Settlement',
        associatedLandmark: 'The Sapphire Sea',
        mainActivity: 'Main trading hub and business center of Voxlumis',
      },
      {
        cityName: 'Woodland Wharf',
        associatedLandmark: 'The Whispering Woods',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Voxlumis',
      },
    ],
    characteristicsOfPeople:
      'Eyes that sparkle with curiosity, voices that are musical, hair that moves like water, clothes adorned with script and symbolic designs.',
    celebrations: [
      'Word Weaving Day (a day of storytelling)',
      'Songbird Festival (a music festival)',
      'Voice Victory (a day to celebrate victories through debates or peaceful dialogues)',
    ],
    color: 'blue',
    otherside: 'biolume',
    description: 'The land of Communication.',
    characteristics:
      'They are great orators, scholars, writers, or any character that uses communication as a central tool. They teach the importance of expression and truth in ones journey.',
  },
  {
    name: 'insightia',
    chakra: 6,
    landmarks: [
      'The Dreamweaver’s Den (a mystic cave filled with ancient prophecies)',
      "The Mind's Maze (a labyrinth that challenges the mind)",
      'The Visionary Veil (a misty valley known for inducing prophetic visions)',
    ],
    cities: [
      {
        cityName: "Dreamweaver's Dwelling",
        associatedLandmark: 'The Dreamweaver’s Den',
        mainActivity: 'Harvesting of Dream Crystals, key resource of Insightia',
      },
      {
        cityName: 'Maze Metropolis',
        associatedLandmark: "The Mind's Maze",
        mainActivity: 'Main trading hub and business center of Insightia',
      },
      {
        cityName: 'Veil Venue',
        associatedLandmark: 'The Visionary Veil',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Insightia',
      },
    ],
    characteristicsOfPeople:
      'Mysterious eyes, hair that seems to contain the night sky, clothing adorned with symbols of knowledge and wisdom.',
    celebrations: [
      'Moon Meditation Night (a night dedicated to meditation and introspection)',
      ' Prophecy Day (a day of prophetic readings and interpretations)',
    ],
    color: 'indigo',
    otherside: 'botanical',
    description: 'The land of Intuition',
    characteristics:
      'They are mystics, sages, seers, or any character associated with wisdom and knowledge. They guide by helping one trust their intuition and attain wisdom.',
  },
  {
    name: 'claridium',
    chakra: 7,
    landmarks: [
      'The Crystal Cliffs (cliffs made of violet crystal)',
      'The Ethereal Echoes (caves where sounds echo with a spiritual vibration)',
      "The Ascendant Ascent (a towering mountain that's said to lead to enlightenment)",
    ],
    cities: [
      {
        cityName: 'Crystal City',
        associatedLandmark: 'The Crystal Cliffs',
        mainActivity:
          'Harvesting of Enlightenment Crystals, key resource of Claridium',
      },
      {
        cityName: 'Echo Empire',
        associatedLandmark: 'The Ethereal Echoes',
        mainActivity: 'Main trading hub and business center of Claridium',
      },
      {
        cityName: 'Ascent Arrival',
        associatedLandmark: 'The Ascendant Ascent',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Claridium',
      },
    ],
    characteristicsOfPeople:
      'Eyes that hold a calm and serene look, hair that glows subtly, clothing adorned with symbols of divinity and enlightenment.',
    celebrations: [
      "The Spirit's Symposium (a gathering for spiritual discourses)",
      'The Enlightenment Eve (a night of collective meditation and introspection).',
    ],
    color: 'violet',
    otherside: 'crystal',
    description: 'The land of Enlightened beings.',
    characteristics:
      'They are angels, spirits, or any enlightened character. They represent the final stages of the journey, where one realizes their connection with the universe.',
  },
  {
    name: 'poiesis',
    chakra: 8,
    landmarks: [
      'The Muse’s Cap (a mushroom cap where one can connect with the muse)',
      'The Creation Cradle (a valley known for its inspiring views)',
      'The Inspiration Inlet (a coastal area that inspires creativity)',
    ],
    cities: [
      {
        cityName: "Muse's Metropolis",
        associatedLandmark: 'The Muse’s Cap',
        mainActivity:
          'Harvesting of Inspiration Mushrooms, key resource of Poiesis',
      },
      {
        cityName: 'Creation City',
        associatedLandmark: 'The Creation Cradle',
        mainActivity: 'Main trading hub and business center of Poiesis',
      },
      {
        cityName: 'Inlet Island',
        associatedLandmark: 'The Inspiration Inlet',
        mainActivity:
          'Main port city, hosts all major celebrations and festivals of Poiesis',
      },
    ],
    characteristicsOfPeople:
      'Eyes that seem to hold a universe within, hair that changes color according to their mood or creation, clothing that is a piece of art itself.',
    celebrations: [
      'Imagination Illumination (a festival of light and creativity)',
      'The White Wash (a festival where everyone paints and gets painted).',
    ],
    color: 'white',
    otherside: 'mycelium',
    description:
      'The place where place where beings that are fully align with their chakras engage in the creative act.',
    characteristics:
      'They are the beings that devote their whole existence to their full expression through the creative act.',
  },
];
