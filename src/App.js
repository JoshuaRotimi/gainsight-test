import React, {useState, useEffect, useCallback} from "react";
import './App.css';
import {Box, Heading, Text, Flex, Input, Button, Link} from '@chakra-ui/react';
import Item from "./components/Item/Item";
import {Octokit} from "octokit";

function App() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [countDown, setCountDown] = useState(30);


    const connectKey = window.localStorage.getItem('accessKey');
 //   console.log(connectKey, 'connector');


    const ACCESS_TOKEN = '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';
    const REPO_NAME = 'typing-test';


    const octokit = new Octokit({ auth: ACCESS_TOKEN });

    const getData = async () => {
        try {
            setError('');
            setLoading(true);
           const {data: { login }} = await octokit.rest.users.getAuthenticated();
           console.log("Hello, %s", login);

            const info = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: 'JoshuaRotimi',
                repo: REPO_NAME
            });
            console.log(info.data);
            setData(info.data);
            setLoading(false);

        } catch (e) {
            console.log(e);
            setLoading(false);
            setError('Something went wrong. Could not fetch data.')
        }

    };

    const handleChange = (e) => {
        if (e.target.value === '') {
            return;
        }
        setToken(e.target.value.trim());
    };

    const handleClick = ()  => {
        const saveToken = window.localStorage.setItem('accessKey', token);

    };

    const handleRefresh = useCallback(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Logs every minute');
            setCountDown((prevState) => {
                if (prevState === 0) {
                    getData();
                    setCountDown(30);
                } else {
                    return prevState - 1
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  return (
      <Box p={'10px'} w={'50%'} m={'10px auto'} textAlign={'center'}>
          <Heading m={'10px 0'}>Gainsight Project</Heading>
          <Text
              p={'20px 0'}
              fontSize={'18px'}
          >Showing latest commits from this {' '}
              <Link textDecoration={'underline'} href={`https://github.com/JoshuaRotimi/${REPO_NAME}`} isExternal> Repository</Link>
          </Text>

          {
              connectKey ? null : (
                  <Box>
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
                  </Box>)
          }

          <Flex alignItems={'center'} flexDirection={'column'}>
              <Flex alignItems={'center'}>
                  <Button colorScheme={'teal'} m={'0 10px'} onClick={handleRefresh}>Refresh</Button>
                  <Text color={'lightblue'}>{countDown}</Text>
              </Flex>

              {loading && <Text p={'20px 0'}>Loading... Please wait.</Text>}

              {error && <Text p={'20px 0'}>{error}</Text>}

              {data && data.map((item, index) => (
                  <Item key={index} data={item}/>
              ))}
          </Flex>

        </Box>
  );
}

export default App;
