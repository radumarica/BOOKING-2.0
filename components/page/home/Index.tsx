/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useState } from 'react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';
import moment from 'moment';
import toast from 'react-hot-toast';

import { ITypeAutoComplete } from '@/types/TypeAutoComplete';
import { TypeSearchResult } from '@/types/TypeSearchResult';

import Container from '@/components/common/Container';
import HotelCard from './Card';

import 'react-datepicker/dist/react-datepicker.css';

interface ISearchResult {
    country: string;
    city: string;
    lat: number;
    lng: number;
    address: string;
    countryCode: string;
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
        countryCode: '',
        lat: 0,
        lng: 0,
    });
    const [loading, setLoading] = useState(false);

    const [searchResult, setSearchResult] = useState<
        {
            thumbnail: string;
            rating: number;
            hotelName: string;
            price: number;
            country_name: string;
            city_name: string;
        }[]
    >([]);

    const searchLocation = () => {
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
                            countryCode: x.properties.country_code,
                        }))
                    );
                })
                .catch((error) => {
                    throw error;
                });

            return () => controller.abort();
        }
    };

    const handleSubmit = () => {
        setLoading(true);

        // const controller = new AbortController();
        // const { signal } = controller;

        // const apiKey = '31d81c1aad7e5003c5499aab318cb397';
        // const secret = '8ff9871567';
        // const Xsignature = apiKey + secret + Math.floor(Date.now() / 1000);

        const options = {
            method: 'GET',
            url: 'https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates',
            params: {
                order_by: 'popularity',
                adults_number: '2',
                units: 'metric',
                room_number: '1',
                checkout_date: moment(endDate).format('YYYY-MM-DD'),
                filter_by_currency: 'USD',
                locale: 'en-us',
                checkin_date: moment(startDate).format('YYYY-MM-DD'),
                latitude: selectedResult.lat,
                longitude: selectedResult.lng,
                children_number: '2',
                children_ages: '5,0',
                categories_filter_ids: 'class::2,class::4,free_cancellation::1',
                page_number: '0',
            },
            headers: {
                'X-RapidAPI-Key': '3208982318msha2465956a5756a8p175381jsn3fb41e4e4452',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then((response) => {
                const { data }: { data: TypeSearchResult } = response;
                if (data.result.length === 0) {
                    setSearchResult([]);
                    setLoading(false);
                    return toast.error('No hotels found');
                }
                setSearchResult(
                    data.result.map((x) => ({
                        hotelName: x.hotel_name,
                        thumbnail: x.main_photo_url,
                        city_name: x.city_in_trans,
                        country_name: x.country_trans,
                        price: x.min_total_price,
                        rating: x.review_score || 0,
                    }))
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
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
                        <div className="flex  justify-center h-full w-[80%] max-w-[1800px]">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className=" md:w-[350px] text-gray-800 placeholder:text-gray-800 h-[54px] rounded-l-md border-2 px-4 border-gray-500 focus:outline-none focus:border-gray-500 bg-white"
                                    placeholder="Where are you going?"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        searchLocation();
                                    }}
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

            {searchResult.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-10">
                    {searchResult.map((x) => (
                        <div
                            key={x.city_name}
                            className="cursor-pointer rounded-xl bg-white dark:bg-gray-800 dark:text-white p-3 shadow-lg hover:shadow-xl"
                        >
                            <div className="relative flex items-end overflow-hidden rounded-xl">
                                <img
                                    src={x.thumbnail}
                                    alt="hotel"
                                    className="w-full h-[200px] object-cover"
                                />

                                <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 text-yellow-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>

                                    <span className="ml-1 text-sm text-slate-400">{x.rating}</span>
                                </div>
                            </div>

                            <div className="mt-1 p-2">
                                <h2 className="dark:text-white text-slate-700">{x.hotelName}</h2>
                                <p className="mt-1 text-sm dark:text-slate-300 text-slate-400">
                                    {x.city_name}
                                </p>

                                <div className="mt-3 flex items-end justify-between">
                                    <p>
                                        <span className="text-lg font-bold text-orange-500">
                                            ${x.price.toFixed(2)}
                                        </span>
                                        <span className="text-sm text-slate-400">/night</span>
                                    </p>

                                    <div className="group inline-flex rounded-xl bg-orange-100 p-2 hover:bg-orange-200">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-orange-400 group-hover:text-orange-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <section className="mt-20 mb-10">
                        <h1 className="text-center text-5xl font-bold text-white pb-10">
                            Entire city of choices
                        </h1>
                        <div className="grid grid-cols-3 gap-16 items-center ">
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
                                <p className="mr-56 underline underline-offset-[8px] ">
                                    Enjoy your
                                </p>
                                <p className="ml-24 mt-5  underline underline-offset-[10px]">
                                    Dream Vacation
                                </p>
                            </div>
                            <p className="w-[70%] text-center  mx-auto text-black dark:text-white my-10 font-medium">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                                officiis inventore br aliquam deserunt molestias, unde, veniam odio
                                earum quidem officia ratione incidunt neque tempora tempore rem
                                velit deleniti? Fugiat, maiores.
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
                                <p className="  underline underline-offset-[10px]">
                                    Relaxing Pleasure
                                </p>
                            </div>
                            <p className="w-[70%] text-center  mx-auto text-black dark:text-white my-10 font-medium">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                                officiis inventore br aliquam deserunt molestias, unde, veniam odio
                                earum quidem officia ratione incidunt neque tempora tempore rem
                                velit deleniti? Fugiat, maiores.
                            </p>
                        </div>
                    </section>
                </div>
            )}
        </Container>
    );
};
21;
export default Home;
