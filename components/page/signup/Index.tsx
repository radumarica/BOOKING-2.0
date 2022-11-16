/* eslint-disable react/no-unescaped-entities */
import Container from '@/components/common/Container';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

const SignUpPage: FC = () => {
    const [formDetails, setFormDetails] = useState();

    return (
        <Container>
            <form className="flex flex-col gap-4 my-5 sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-gray-200 dark:bg-gray-800 p-10 rounded-md shadow-md">
                <div className="flex  items-center  ">
                    <Image
                        src="/images/palmverse-logo.png"
                        alt="Palmverse Logo"
                        width={80}
                        height={80}
                    />
                    <h1 className="text-3xl text-gray-800 dark:text-white text-center font-bold ml-5 mt-2 ">
                        Register to Palmverse
                    </h1>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstname" value="First name" />
                    </div>
                    <TextInput id="firstname" type="text" placeholder="John" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastname" value="Last name" />
                    </div>
                    <TextInput id="lastname" type="text" placeholder="Doe" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput
                        id="email2"
                        type="email"
                        placeholder="name@palmverse.com"
                        required
                        shadow
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" type="password" required shadow />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput id="repeat-password" type="password" required shadow />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <Label htmlFor="agree">
                        I agree with the{' '}
                        <a
                            href="/forms"
                            className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                            terms and conditions
                        </a>
                    </Label>
                </div>

                <Button type="submit">Sign in </Button>

                <div className="flex text-sm items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">Don't have an account?</span>
                    <Link href="/signin">
                        <span className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer ">
                            Sign In
                        </span>
                    </Link>
                </div>
            </form>
        </Container>
    );
};

export default SignUpPage;
