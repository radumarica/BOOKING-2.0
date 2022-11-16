export const SOLANA_RPC_ENDPOINT = 'https://api.devnet.solana.com/';

export const DOMAIN_URL = process.env.NEXT_PUBLIC_URL;

export const markers = [
    {
        name: 'Tamarido, Costa Rica',
        name2: 'PALMVERSE Tamarindo',
        co: [+10.2993, -85.8371],
        id: '631b57decae51bd5c44f9294',
    },
    {
        name: 'Portugal',
        name2: 'PALMVERSE Portugal ',
        co: [+38.7223, -9.1393],
        id: '631b57f0cae51bd5c44f9297',
    },
    {
        name: 'Miami',
        name2: 'PALMVERSE Miami',
        co: [+25.7617, -80.1918],
        id: '631b57fbcae51bd5c44f929a',
    },
];

export const SampleData = [
    {
        id: '1',
        hotel_name: 'PALMVERSE Tamarindo, Costa Rica',
        hotel_id: 1,
        city: 'Tamarido',
        possibilities: ['PALMVERSE'],
        max_adult_size: 4,
        child_status: true,
        room_type: [
            {
                id: 1,
                title: 'Bed in Dorm',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg',
                price: 40,
            },
            {
                id: 2,
                title: 'Double Room',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-deluxe.jpg',
                price: 130,
            },
            {
                id: 4,
                title: 'King Room',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-suit.jpg',
                price: 190,
            },
        ],
    },
    {
        id: '3',
        hotel_name: 'PALMVERSE Portugal',
        hotel_id: 3,
        city: 'Santa Teresa',
        possibilities: ['Palmverse'],
        max_adult_size: 8,
        child_status: true,
        room_type: [
            {
                id: 1,
                title: 'Single',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/3-standart.jpg',
                price: 150,
            },
            {
                id: 2,
                title: 'Double',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/3-deluxe.jpg',
                price: 250,
            },
            {
                id: 4,
                title: 'King',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-suit.jpg',
                price: 300,
            },
        ],
    },
    {
        id: '4',
        hotel_name: 'PALMVERSE Miami, USA',
        hotel_id: 4,
        city: 'Miami',
        possibilities: ['PALMVERSE'],
        max_adult_size: 4,
        child_status: true,
        room_type: [
            {
                id: 1,
                title: 'Single',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg',
                price: 100,
            },
            {
                id: 2,
                title: 'Double',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-deluxe.jpg',
                price: 200,
            },
            {
                id: 4,
                title: 'King',
                description: 'coming soon.',
                photo: 'https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-suit.jpg',
                price: 300,
            },
        ],
    },
];
