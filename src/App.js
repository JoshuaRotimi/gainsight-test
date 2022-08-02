import React, {useState, useEffect} from "react";
import './App.css';
import {Box, Heading, Text, Flex, Input, Button} from '@chakra-ui/react';
import Item from "./components/Item/Item";
import {Octokit} from "octokit";

function App() {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const ACCESS_TOKEN = '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';


    const octokit = new Octokit({ auth: ACCESS_TOKEN });

    const getData = async () => {
        try {
            setLoading(true);
            const {data: { login }} = await octokit.rest.users.getAuthenticated();
            console.log("Hello, %s", login);

            const info = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: 'JoshuaRotimi',
                repo: 'typing-test'
            });
            console.log(info.data);
            setData(info.data);
            setLoading(false);

        } catch (e) {
            console.log(e)
        }

    };

    const handleChange = (e) => {
        setToken(e.target.value);
    };

    useEffect(() => {
        getData();
    }, []);

  return (
      <Box p={'10px'} w={'50%'} m={'10px auto'} textAlign={'center'}>
          <Heading m={'10px 0'}>Gainsight Project</Heading>

          <Text>Please enter the access token to view Latest Commits</Text>
          <Flex w={'80%'} m={'20px auto'}>
              <Input textAlign='left'
                     fontSize='14px'
                     placeholder='Enter Token'
                     value={token} type={'text'}
                     onChange={handleChange}
              />
              <Button colorScheme={'teal'} m={'0 10px'}>Submit</Button>
          </Flex>

          <Flex alignItems={'center'} flexDirection={'column'}>
              {data && data.map((item) => (
                  <Item key={item.index} data={data}/>
              ))}
          </Flex>

        </Box>
  );
}

export default App;
