import React from "react";
import {Box, Text, Flex, Heading} from '@chakra-ui/react';

const Item = ({data}) => {
    console.log(data);
    return (
        <Box m={'20px 0'} border={'1px solid gray'} p={'5px'} borderRadius={'4px'} w={'60%'}>
            <Heading
                p={'10px'}
                textAlign={'left'}
                as={'h4'}
                size={'md'}
                fontSize={'20px'}
                m={'20px 0'}>Initial Commit</Heading>
            <Flex m={'5px 0'} justifyContent={'space-between'}>
                <Text p={'3px'} fontSize={'14px'}>Time : Commit Time</Text>
                <Text p={'3px'} fontSize={'14px'}>Author: Commit Author</Text>
            </Flex>
        </Box>
    )
};

export default Item;