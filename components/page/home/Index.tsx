/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import moment from 'moment';

import { ITypeAutoComplete } from '@/types/TypeAutoComplete';
import Container from '@/components/common/Container';
import HotelCard from './Card';

import 'react-datepicker/dist/react-datepicker.css';

interface ISearchResult {
    country: string;
    city: string;
    lat: number;
    lng: number;
    address: string;
}

const Home: FC = () => {
    const [query, setQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [results, setResults] = useState<ISearchResult[]>([]);
    const [selectedResult, setSelectedResult] = useState<ISearchResult>({
        address: '',
        city: '',
        country: '',
        lat: 0,
        lng: 0,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length > 0) {
            const geoApiFyAPI = 'fb47183383a345d8a9542f6425f41075';

            const controller = new AbortController();
            const { signal } = controller;

            fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${geoApiFyAPI}`,
                { signal }
            )
                .then((response) => response.json())
                .then((data: ITypeAutoComplete) => {
                    setResults(
                        data.features.map((x) => ({
                            lat: x.geometry.coordinates[1],
                            lng: x.geometry.coordinates[0],
                            country: x.properties.country,
                            city: x.properties.city,
                            address: x.properties.address_line2,
                        }))
                    );
                })
                .catch((error) => {
                    throw error;
                });

            const options = {
                method: 'GET',
                url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
                params: {
                    sort_order: 'HDR',
                    location_id: '3000035821',
                    date_checkout: '2022-11-16',
                    date_checkin: '2022-11-15',
                    star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
                    rooms_number: '1',
                    amenities_ids: 'FINTRNT,FBRKFST',
                },
                headers: {
                    'X-RapidAPI-Key': '3208982318msha2465956a5756a8p175381jsn3fb41e4e4452',
                    'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
                },
            };

            axios
                .request(options)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });

            return () => controller.abort();
        }
    }, [query]);

    const handleSubmit = () => {
        setLoading(true);

        const controller = new AbortController();
        const { signal } = controller;

        const apiKey = '31d81c1aad7e5003c5499aab318cb397';
        const secret = '8ff9871567';
        const Xsignature = apiKey + secret + Math.floor(Date.now() / 1000);

        axios({
            method: 'GET',
            url: `https://api.test.hotelbeds.com/hotel-api/1.0/hotels?fields=all&from=2021-10-01&to=2021-10-02&destinationCode=PMI&useSecondaryLanguage=false`,
            headers: {
                'Api-key': apiKey,
                'X-Signature': Xsignature,
                Accept: 'application/json',
                'Accept-Encoding': 'gzip',
            },
        })
            .then((response) => {
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <Container>
            <div className="flex justify-center mt-5 relative h-[480px]">
                <div className="relative w-full shadow-md">
                    <Image
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt="Picture of a hotel"
                        layout="fill"
                        objectFit="cover"
                        className="rounded absolute"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 rounded" />
                    <div className="absolute bottom-10 z-20 left-5 w-full  flex flex-col justify-center items-start text-white ">
                        <h1 className="text-4xl font-bold ">Welcome to Palmverse</h1>
                        <p className="text-xl my-2 ">
                            We make it easy to book your next trip directly from your web3 wallet.
                        </p>
                    </div>
                    <div className="absolute h-20 z-50 -bottom-12 flex justify-center w-full  ">
                        <div
                            className="flex  justify-center h-full w-[80%] max-w-[1800px]"
                            onBlur={() => setResults([])}
                        >
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className=" md:w-[400px] text-gray-800 placeholder:text-gray-800 h-[54px] rounded-l-md border-2 px-4 border-gray-500 focus:outline-none focus:border-gray-500 bg-white"
                                    placeholder="Where are you going?"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {results.length > 0 && (
                                    <ul className="absolute w-[450px] h-fit  bg-white rounded-b-md shadow-md -bottom-44 ">
                                        {results.slice(0, 5).map((result) => (
                                            <li
                                                key={result.lat}
                                                onClick={() => {
                                                    setQuery(result.address);
                                                    setSelectedResult(result);
                                                    setResults([]);
                                                }}
                                                className="flex items-center text-gray-600 py-2 px-4 hover:bg-gray-200 bg-white cursor-pointer capitalize"
                                            >
                                                <FaMapMarkerAlt className="mr-2 text-lg" />
                                                {result.address}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <DatePicker
                                    onChange={(date: Date) => setStartDate(date.toString())}
                                    className="w-[250px] h-[54px] text-sm  border-y-2 border-gray-500 focus:outline-none focus:border-gray-500 px-4"
                                    name="dateIn"
                                    autoComplete="off"
                                    minDate={new Date()}
                                    required
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={
                                        !startDate
                                            ? 'Select Check In Date'
                                            : moment(startDate).format('DD/MM/YYYY')
                                    }
                                />
                            </div>
                            <div>
                                <DatePicker
                                    onChange={(date: Date) => setEndDate(date.toString())}
                                    className="w-[250px] h-[54px] text-sm  border-2 border-gray-500 focus:outline-none focus:border-gray-500 px-4"
                                    name="dateOut"
                                    autoComplete="off"
                                    startDate={new Date(startDate)}
                                    selectsEnd
                                    minDate={new Date(startDate)}
                                    required
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText={
                                        !endDate
                                            ? 'Select Check Out Date'
                                            : moment(endDate).format('DD/MM/YYYY')
                                    }
                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => handleSubmit()}
                                    className="w-[150px] h-[54px] rounded-r-md bg-primary text-white font-bold hover:bg-violet-500 transition-all"
                                >
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                                        </div>
                                    ) : (
                                        'Search'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="mt-20 mb-10">
                <h1 className="text-center text-5xl font-bold text-white pb-10">
                    Entire city of choices
                </h1>
                <div className="flex flex-wrap justify-evenly items-center ">
                    <HotelCard
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquet nisl lorem quis nisl."
                        title="Hotel 1"
                        image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                    />

                    <HotelCard
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquet nisl lorem quis nisl."
                        title="Hotel 2"
                        image="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    />

                    <HotelCard
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut aliquam aliquam, nunc nisl aliquet nisl, eget aliquet nisl lorem quis nisl."
                        title="Hotel 3"
                        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    />
                </div>
            </section>
            <section className="flex justify-between items-center py-10">
                <div className="w-[60%] ">
                    <div className="text-5xl font-bold text-black dark:text-white text-center">
                        <p className="mr-56 underline underline-offset-[8px] ">Enjoy your</p>
                        <p className="ml-24 mt-5  underline underline-offset-[10px]">
                            Dream Vacation
                        </p>
                    </div>
                    <p className="w-[70%] text-center  mx-auto text-black dark:text-white my-10 font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officiis
                        inventore br aliquam deserunt molestias, unde, veniam odio earum quidem
                        officia ratione incidunt neque tempora tempore rem velit deleniti? Fugiat,
                        maiores.
                    </p>
                </div>
                <div className="w-1/2">
                    <div className="dark:bg-gray-300 bg-gray-200 p-3 rounded-md shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGhvdGVsfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Picture of the author"
                            width={1000}
                            height={600}
                            objectFit="cover"
                            className="rounded-md shadow-md "
                        />
                    </div>
                </div>
            </section>
            <section className="flex justify-between items-center py-10">
                <div className="w-1/2">
                    <div className="dark:bg-gray-300 bg-gray-200 p-3 rounded-md shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Picture of the author"
                            width={1000}
                            height={600}
                            objectFit="cover"
                            className="rounded-md shadow-md "
                        />
                    </div>
                </div>

                <div className="w-[60%] ">
                    <div className="text-5xl font-bold text-black dark:text-white text-center">
                        <p className="  underline underline-offset-[10px]">Relaxing Pleasure</p>
                    </div>
                    <p className="w-[70%] text-center  mx-auto text-black dark:text-white my-10 font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste officiis
                        inventore br aliquam deserunt molestias, unde, veniam odio earum quidem
                        officia ratione incidunt neque tempora tempore rem velit deleniti? Fugiat,
                        maiores.
                    </p>
                </div>
            </section>
        </Container>
    );
};
21;
export default Home;
