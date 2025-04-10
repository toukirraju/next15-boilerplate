'use client';
import { Box, Center, Collapse, Text } from "@mantine/core";
import { useState } from "react";
import { Icon } from "../Icons";

function ErrorList({ error }: { error: string }) {
    const errorList = error.split(',').map((error) => error.trim());
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Text component="div" c={'red'} mt={5} size="sm">
            {errorList.length > 1 ? (
                <>
                    <Text
                        onClick={() => setIsOpen((prev) => !prev)}
                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {isOpen ? 'Hide Errors' : 'Show Errors'}
                    </Text>
                    <Collapse in={isOpen}>
                        <ul>
                            {errorList.map((error, index) => (
                                <li key={index}>
                                    <Center inline>
                                        {<Icon icon={'uil:times'} />}
                                        <Box ml={7}>{error}</Box>
                                    </Center>
                                </li>
                            ))}
                        </ul>
                    </Collapse>
                </>
            ) : (
                <Center inline>
                    {<Icon icon={'uil:times'} />}
                    <Box ml={7}>{error}</Box>
                </Center>
            )}
        </Text>
    );
}

export default ErrorList;