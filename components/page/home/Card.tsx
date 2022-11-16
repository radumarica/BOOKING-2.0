import { FC } from 'react';
import Image from 'next/image';

const HotelCard: FC<{
    image: string;
    title: string;
    description: string;
}> = ({ image, title, description }) => (
    <div className="relative max-w-md  xl:max-w-2xl min-w-0 break-words bg-white dark:bg-gray-800 dark:text-white w-96 mb-6 shadow-lg rounded-xl mt-8">
        <div className="card">
            <div className="card-header mx-4 mt-4">
                <Image
                    className="w-auto rounded-lg"
                    src={image}
                    alt="tailwind-card-image"
                    width={600}
                    height={400}
                />
            </div>
            <div className="card-body px-6 py-4">
                <h4 className="font-semibold text-center">{title}</h4>

                <p className="opcacity-60  text-sm text-center">{description}</p>
                <button
                    type="button"
                    className="bg-primary w-fit text-sm mx-auto px-4 py-2 rounded-md text-white "
                >
                    More Details
                </button>
            </div>
        </div>
    </div>
);

export default HotelCard;
