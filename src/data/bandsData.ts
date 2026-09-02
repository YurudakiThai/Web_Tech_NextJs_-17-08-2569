import type { Band } from "@/src/types/band";

export const bands: Band[] = [
  {
    id: 1,
    slug: "the-beatles",
    name: "The Beatles",
    genre: "Rock",
    origin: "Liverpool, England",
    description:
      "A British rock band known for influential songs, creative albums, and a lasting impact on popular music.",
    image: "/image/bands/bands_members/TheBeatles/TheBeatlesMembers.webp",
    accentColor: "#d4a72c",
    members: [
      {
        id: 101,
        name: "John Lennon",
        role: "Vocals and guitar",
        image: "/image/bands/bands_members/TheBeatles/John_Lennon.jpeg",
      },
      {
        id: 102,
        name: "Paul McCartney",
        role: "Vocals and bass",
        image: "/image/bands/bands_members/TheBeatles/Paul_McCartney.jpeg",
      },
      {
        id: 103,
        name: "George Harrison",
        role: "Guitar and vocals",
        image: "/image/bands/bands_members/TheBeatles/George_Harrison.jpeg",
      },
      {
        id: 104,
        name: "Ringo Starr",
        role: "Drums and vocals",
        image: "/image/bands/bands_members/TheBeatles/Ringo_Starr.jpeg",
      },
    ],
  },
  {
    id: 2,
    slug: "maroon-5",
    name: "Maroon 5",
    genre: "Pop Rock",
    origin: "Los Angeles, United States",
    description:
      "An American pop rock band recognized for combining pop melodies, rock instruments, and modern production.",
    image: "/image/bands/bands_members/Maroon5/1_maroon5G.jpg",
    accentColor: "#e63946",
    members: [
      {
        id: 201,
        name: "Adam Levine",
        role: "Lead vocals",
        image: "/image/bands/bands_members/Maroon5/Adam_Levine.png",
      },
      {
        id: 202,
        name: "Jesse Carmichael",
        role: "Keyboard and guitar",
        image: "/image/bands/bands_members/Maroon5/Jesse_Carmichael.jpeg",
      },
      {
        id: 203,
        name: "James Valentine",
        role: "Guitar",
        image: "/image/bands/bands_members/Maroon5/James_Valentine.jpeg",
      },
      {
        id: 204,
        name: "Matt Flynn",
        role: "Drums",
        image: "/image/bands/bands_members/Maroon5/Matt_Flynn.jpeg",
      },
      {
        id: 205,
        name: "PJ Morton",
        role: "Keyboard",
        image: "/image/bands/bands_members/Maroon5/PJ_Morton.jpeg",
      },
      {
        id: 206,
        name: "Sam Farrar",
        role: "Bass and keyboard",
        image: "/image/bands/bands_members/Maroon5/Sam_Farrar.jpeg",
      },
    ],
  },
  {
    id: 3,
    slug: "queen",
    name: "Queen",
    genre: "Rock",
    origin: "London, England",
    description:
      "A British rock band celebrated for powerful performances, layered arrangements, and distinctive musical styles.",
    image: "/image/bands/bands_members/Queen/QueenPhotoMembers.jpg",
    accentColor: "#6c4ac7",
    members: [
      {
        id: 301,
        name: "Freddie Mercury",
        role: "Lead vocals and piano",
        image: "/image/bands/bands_members/Queen/Freddie_Mercury.jpeg",
      },
      {
        id: 302,
        name: "Brian May",
        role: "Guitar and vocals",
        image: "/image/bands/bands_members/Queen/Brian_May.jpeg",
      },
      {
        id: 303,
        name: "Roger Taylor",
        role: "Drums and vocals",
        image: "/image/bands/bands_members/Queen/Roger_Taylor.jpeg",
      },
      {
        id: 304,
        name: "John Deacon",
        role: "Bass",
        image: "/image/bands/bands_members/Queen/John_Deacon.jpeg",
      },
    ],
  },
];
