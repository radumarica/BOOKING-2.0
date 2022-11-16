import { FC, ReactNode } from 'react';

const Container: FC<{ children: ReactNode }> = ({ children }) => (
    <div className="flex flex-col items-center  min-h-screen py-2 dark:bg-gray-700">
        <section className="w-[75%] max-w-[1920px] mx-auto  ">{children}</section>
    </div>
);

export default Container;
