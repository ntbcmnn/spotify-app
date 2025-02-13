import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import { randomUUID } from "node:crypto";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("tracks");
    await db.dropCollection("trackhistories");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping the drop ");
  }

  const [jane, john] = await User.create(
    {
      username: "jane",
      password: "123",
      role: "admin",
      displayName: "Jane Smith",
      avatar: "fixtures/jane.jpg",
      token: randomUUID(),
    },
    {
      username: "john",
      password: "123",
      role: "user",
      displayName: "John Doe",
      avatar: "fixtures/john.jpg",
      token: randomUUID(),
    },
  );

  const [skryptonite, monetochka, noize_mc, zoloto] = await Artist.create(
    {
      user: jane._id,
      name: "Skryptonite",
      info: "Kazakh singer and musical producer, founder of the Musica36 label.",
      image: "fixtures/skryptonite.jpg",
      isPublished: true,
    },
    {
      user: john._id,
      name: "Monetochka",
      info: "Russian singer, songwriter and musician.",
      image: "fixtures/monetochka.jpg",
      isPublished: true,
    },
    {
      user: jane._id,
      name: "Noize MC",
      info: "Russian rap-rock-artist, songwriter and musician.",
      image: "fixtures/noize_mc.jpeg",
      isPublished: true,
    },
    {
      user: john._id,
      name: "ZOLOTO",
      info: "Musician, author & artist, rock & pop-singer from Kazakhstan.",
      image: "fixtures/zoloto.jpg",
      isPublished: false,
    },
  );

  const [
    yeahh_pt1,
    uroboros,
    coloring_books,
    prayers,
    new_album,
    last_album,
    reincarnate,
  ] = await Album.create(
    {
      name: "Yeahh PT. 1",
      user: jane._id,
      artist: skryptonite._id,
      release_year: 2023,
      image: "fixtures/yeahh.png",
      isPublished: true,
    },
    {
      name: "Uroboros: Street 36",
      user: jane._id,
      artist: skryptonite._id,
      release_year: 2017,
      image: "fixtures/uroboros.jpg",
      isPublished: true,
    },
    {
      name: "Coloring books for adults",
      user: jane._id,
      artist: monetochka._id,
      release_year: 2018,
      image: "fixtures/coloring_books.jpg",
      isPublished: true,
    },
    {
      name: "Prayers. Anecdotes. Toasts.",
      user: john._id,
      artist: monetochka._id,
      release_year: 2024,
      image: "fixtures/prayers.jpeg",
      isPublished: true,
    },
    {
      name: "New album",
      user: john._id,
      artist: noize_mc._id,
      release_year: 2012,
      image: "fixtures/new_album.jpg",
      isPublished: true,
    },
    {
      name: "Last album",
      user: john._id,
      artist: noize_mc._id,
      release_year: 2010,
      image: "fixtures/last_album.jpg",
      isPublished: true,
    },
    {
      name: "Reincarnate",
      user: john._id,
      artist: zoloto._id,
      release_year: 2024,
      image: "fixtures/reincarnate.png",
      isPublished: false,
    },
  );
  await Track.create(
    {
      name: "Asta la vista",
      user: john._id,
      artist: skryptonite._id,
      album: yeahh_pt1._id,
      duration: "3:32",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/M3AGJUwBH0k",
      isPublished: true,
    },
    {
      name: "Something better than",
      user: john._id,
      artist: skryptonite._id,
      album: yeahh_pt1._id,
      duration: "3:54",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/slLLF6Q5htQ",
      isPublished: true,
    },
    {
      name: "Rings",
      user: john._id,
      artist: skryptonite._id,
      album: yeahh_pt1._id,
      duration: "3:34",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/Km2qhMfy3-s",
      isPublished: true,
    },
    {
      name: "Names",
      user: john._id,
      artist: skryptonite._id,
      album: yeahh_pt1._id,
      duration: "2:32",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/AyV7tDI9lcU",
      isPublished: true,
    },
    {
      name: "To the ground",
      user: john._id,
      artist: skryptonite._id,
      album: yeahh_pt1._id,
      duration: "4:04",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/1x_2JSzkZug",
      isPublished: true,
    },
    {
      name: "Mister 718",
      user: john._id,
      artist: skryptonite._id,
      album: uroboros._id,
      duration: "3:46",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/nmC6_2oYqY4",
      isPublished: true,
    },
    {
      name: "Waste of time",
      user: john._id,
      artist: skryptonite._id,
      album: uroboros._id,
      duration: "3:37",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/nlaAW0yOAnI",
      isPublished: true,
    },
    {
      name: "Butter",
      user: john._id,
      artist: skryptonite._id,
      album: uroboros._id,
      duration: "4:16",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/HAAZ9ECyCsI",
      isPublished: true,
    },
    {
      name: "Boy",
      user: john._id,
      artist: skryptonite._id,
      album: uroboros._id,
      duration: "2:57",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/cl9Wtii-zO4",
      isPublished: true,
    },
    {
      name: "Animals",
      user: john._id,
      artist: skryptonite._id,
      album: uroboros._id,
      duration: "3:02",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/R87Pm5oKVzE",
      isPublished: true,
    },
    {
      name: "Every time",
      user: john._id,
      artist: monetochka._id,
      album: coloring_books._id,
      duration: "3:28",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/oVUBdmsG-pM",
      isPublished: true,
    },
    {
      name: "No coins",
      user: jane._id,
      artist: monetochka._id,
      album: coloring_books._id,
      duration: "4:38",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/wzJNIagTnIE",
      isPublished: true,
    },
    {
      name: "90",
      user: jane._id,
      artist: monetochka._id,
      album: coloring_books._id,
      duration: "3:21",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/FSrQe9J8Cv8",
      isPublished: true,
    },
    {
      name: "Your name",
      user: jane._id,
      artist: monetochka._id,
      album: coloring_books._id,
      duration: "3:01",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/ZlI6WgxQzdc",
      isPublished: true,
    },
    {
      name: "Night stall",
      user: jane._id,
      artist: monetochka._id,
      album: coloring_books._id,
      duration: "2:44",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/vXAyS3_SBSw",
      isPublished: true,
    },
    {
      name: "It was in Russia",
      user: jane._id,
      artist: monetochka._id,
      album: prayers._id,
      duration: "3:13",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/_otogxga6ww",
      isPublished: true,
    },
    {
      name: "Again",
      user: jane._id,
      artist: monetochka._id,
      album: prayers._id,
      duration: "2:46",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/fDTrrWhL9ZA",
      isPublished: true,
    },
    {
      name: "Monopoly",
      user: jane._id,
      artist: monetochka._id,
      album: prayers._id,
      duration: "3:37",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/v2B7YcEi8Lk",
      isPublished: true,
    },
    {
      name: "Selfharm",
      user: jane._id,
      artist: monetochka._id,
      album: prayers._id,
      duration: "3:08",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/ZBxyTuAYF4Y",
      isPublished: true,
    },
    {
      name: "Over the rooftops",
      user: jane._id,
      artist: monetochka._id,
      album: prayers._id,
      duration: "3:28",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/6BLIh_KrFlc",
      isPublished: true,
    },
    {
      name: "Egoism",
      user: jane._id,
      artist: noize_mc._id,
      album: new_album._id,
      duration: "2:44",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/FGpIVv1lbyI",
      isPublished: true,
    },
    {
      name: "Is universe infinite?",
      user: jane._id,
      artist: noize_mc._id,
      album: new_album._id,
      duration: "4:20",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/DBnwy46OPFU",
      isPublished: true,
    },
    {
      name: `I'm dumb`,
      user: jane._id,
      artist: noize_mc._id,
      album: new_album._id,
      duration: "3:50",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/07M9AAMEQfw",
      isPublished: true,
    },
    {
      name: "Yes future!",
      user: jane._id,
      artist: noize_mc._id,
      album: new_album._id,
      duration: "3:09",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/rFH4jCW_LzM",
      isPublished: true,
    },
    {
      name: "Swimming pool",
      user: jane._id,
      artist: noize_mc._id,
      album: new_album._id,
      duration: "3:36",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/uTcu2ZyFT04",
      isPublished: true,
    },
    {
      name: "Wreak havoc",
      user: jane._id,
      artist: noize_mc._id,
      album: last_album._id,
      duration: "3:59",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/Cy4VJ_p9hZk",
      isPublished: true,
    },
    {
      name: "The singer and the actress",
      user: jane._id,
      artist: noize_mc._id,
      album: last_album._id,
      duration: "4:23",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/1UV0GMfx4P0",
      isPublished: true,
    },
    {
      name: "Backton #1",
      user: jane._id,
      artist: noize_mc._id,
      album: last_album._id,
      duration: "3:35",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/A2oaMmiGpJw",
      isPublished: true,
    },
    {
      name: "Empty spaces",
      user: jane._id,
      artist: noize_mc._id,
      album: last_album._id,
      duration: "4:17",
      track_number: 4,
      youtubeLink: "https://www.youtube.com/embed/GH9pOPA4jn8",
      isPublished: true,
    },
    {
      name: "Antennas",
      user: jane._id,
      artist: noize_mc._id,
      album: last_album._id,
      duration: "3:53",
      track_number: 5,
      youtubeLink: "https://www.youtube.com/embed/o2YcKWzyoAw",
      isPublished: true,
    },
    {
      name: `Didn't happen`,
      user: john._id,
      artist: zoloto._id,
      album: reincarnate._id,
      duration: "2:28",
      track_number: 1,
      youtubeLink: "https://www.youtube.com/embed/BLtlUYy7rkM",
      isPublished: false,
    },
    {
      name: `I'll be alone`,
      user: john._id,
      artist: zoloto._id,
      album: reincarnate._id,
      duration: "3:10",
      track_number: 2,
      youtubeLink: "https://www.youtube.com/embed/YfhJM1ekZeM",
      isPublished: false,
    },
    {
      name: `It's about to be April`,
      user: john._id,
      artist: zoloto._id,
      album: reincarnate._id,
      duration: "3:04",
      track_number: 3,
      youtubeLink: "https://www.youtube.com/embed/RIT_KkTLm2E",
      isPublished: false,
    },
  );

  await db.close();
};

run().catch(console.error);
