import React from "react";
import {Box, Text, Flex, Heading} from '@chakra-ui/react';

const Item = ({data}) => {
    return (
        <Box m={'20px 0'} border={'1px solid gray'} p={'5px'} borderRadius={'4px'} w={'60%'}>
            <Heading
                p={'10px'}
                textAlign={'left'}
                as={'h4'}
                size={'md'}
                fontSize={'20px'}
                m={'20px 0'}>{data.commit.message}</Heading>
            <Flex m={'5px 0'} justifyContent={'space-between'}>
                <Text p={'3px'} fontSize={'14px'}>Time : {data.commit.author.date}</Text>
                <Text p={'3px'} fontSize={'14px'}>Author: {data.commit.author.name}</Text>
            </Flex>
        </Box>
    )
};

export default Item;