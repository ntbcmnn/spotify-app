import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
        await db.dropCollection('trackhistories');
    } catch (e) {
        console.log('Collections were not present, skipping the drop ');
    }

    const [skryptonite, monetochka, noize_mc] = await Artist.create(
        {
            name: 'Skryptonite',
            info: 'Kazakh singer and musical producer, founder of the Musica36 label.',
            image: 'fixtures/skryptonite.jpg',
        },
        {
            name: 'Monetochka',
            info: 'Russian singer, songwriter and musician.',
            image: 'fixtures/monetochka.jpg'
        },
        {
            name: 'Noize MC',
            info: 'Russian rap-rock-artist, songwriter and musician.',
            image: 'fixtures/noize_mc.jpeg'
        }
    );

    const [yeahh_pt1, uroboros, coloring_books, prayers, new_album, last_album] = await Album.create(
        {
            name: 'Yeahh PT. 1',
            artist: skryptonite._id,
            release_year: 2023,
            image: 'fixtures/yeahh.png',
        },
        {
            name: 'Uroboros: Street 36',
            artist: skryptonite._id,
            release_year: 2017,
            image: 'fixtures/uroboros.jpg'
        },
        {
            name: 'Coloring books for adults',
            artist: monetochka._id,
            release_year: 2018,
            image: 'fixtures/coloring_books.jpg'
        },
        {
            name: 'Prayers. Anecdotes. Toasts.',
            artist: monetochka._id,
            release_year: 2024,
            image: 'fixtures/prayers.jpeg'
        },
        {
            name: 'New album',
            artist: noize_mc._id,
            release_year: 2012,
            image: 'fixtures/new_album.jpg'
        },
        {
            name: 'Last album',
            artist: noize_mc._id,
            release_year: 2010,
            image: 'fixtures/last_album.jpg'
        },
    );
    await Track.create(
        {
            name: 'Asta la vista',
            album: yeahh_pt1._id,
            duration: '3:32',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/M3AGJUwBH0k'
        },
        {
            name: 'Something better than',
            album: yeahh_pt1._id,
            duration: '3:54',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/slLLF6Q5htQ'
        },
        {
            name: 'Rings',
            album: yeahh_pt1._id,
            duration: '3:34',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/Km2qhMfy3-s'
        },
        {
            name: 'Names',
            album: yeahh_pt1._id,
            duration: '2:32',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/AyV7tDI9lcU'
        },
        {
            name: 'To the ground',
            album: yeahh_pt1._id,
            duration: '4:04',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/1x_2JSzkZug'
        },
        {
            name: 'Mister 718',
            album: uroboros._id,
            duration: '3:46',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/nmC6_2oYqY4'
        },
        {
            name: 'Waste of time',
            album: uroboros._id,
            duration: '3:37',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/nlaAW0yOAnI'
        },
        {
            name: 'Butter',
            album: uroboros._id,
            duration: '4:16',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/HAAZ9ECyCsI'
        },
        {
            name: 'Boy',
            album: uroboros._id,
            duration: '2:57',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/cl9Wtii-zO4'
        },
        {
            name: 'Animals',
            album: uroboros._id,
            duration: '3:02',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/R87Pm5oKVzE'
        },
        {
            name: 'Every time',
            album: coloring_books._id,
            duration: '3:28',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/oVUBdmsG-pM'
        },
        {
            name: 'No coins',
            album: coloring_books._id,
            duration: '4:38',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/wzJNIagTnIE'
        },
        {
            name: '90',
            album: coloring_books._id,
            duration: '3:21',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/FSrQe9J8Cv8'
        },
        {
            name: 'Your name',
            album: coloring_books._id,
            duration: '3:01',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/ZlI6WgxQzdc'
        },
        {
            name: 'Night stall',
            album: coloring_books._id,
            duration: '2:44',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/vXAyS3_SBSw'
        },
        {
            name: 'It was in Russia',
            album: prayers._id,
            duration: '3:13',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/_otogxga6ww'
        },
        {
            name: 'Again',
            album: prayers._id,
            duration: '2:46',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/fDTrrWhL9ZA'
        },
        {
            name: 'Monopoly',
            album: prayers._id,
            duration: '3:37',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/v2B7YcEi8Lk'
        },
        {
            name: 'Selfharm',
            album: prayers._id,
            duration: '3:08',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/ZBxyTuAYF4Y'
        },
        {
            name: 'Over the rooftops',
            album: prayers._id,
            duration: '3:28',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/6BLIh_KrFlc'
        },
        {
            name: 'Egoism',
            album: new_album._id,
            duration: '2:44',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/FGpIVv1lbyI'
        },
        {
            name: 'Is universe infinite?',
            album: new_album._id,
            duration: '4:20',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/DBnwy46OPFU'
        },
        {
            name: `I'm dumb`,
            album: new_album._id,
            duration: '3:50',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/07M9AAMEQfw'
        },
        {
            name: 'Yes future!',
            album: new_album._id,
            duration: '3:09',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/rFH4jCW_LzM'
        },
        {
            name: 'Swimming pool',
            album: new_album._id,
            duration: '3:36',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/uTcu2ZyFT04'
        },
        {
            name: 'Wreak havoc',
            album: last_album._id,
            duration: '3:59',
            track_number: 1,
            youtubeLink: 'https://www.youtube.com/embed/Cy4VJ_p9hZk'
        },
        {
            name: 'The singer and the actress',
            album: last_album._id,
            duration: '4:23',
            track_number: 2,
            youtubeLink: 'https://www.youtube.com/embed/1UV0GMfx4P0'
        },
        {
            name: 'Backton #1',
            album: last_album._id,
            duration: '3:35',
            track_number: 3,
            youtubeLink: 'https://www.youtube.com/embed/A2oaMmiGpJw'
        },
        {
            name: 'Empty spaces',
            album: last_album._id,
            duration: '4:17',
            track_number: 4,
            youtubeLink: 'https://www.youtube.com/embed/GH9pOPA4jn8'
        },
        {
            name: 'Antennas',
            album: last_album._id,
            duration: '3:53',
            track_number: 5,
            youtubeLink: 'https://www.youtube.com/embed/o2YcKWzyoAw'
        },
    );
    await db.close();
};

run().catch(console.error);