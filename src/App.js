import React, {useState, useEffect, useCallback} from "react";
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
    const REPO_NAME = 'gainsight-test';

    const getData = async () => {
        try {
            if (!connectKey) {
                setError('Inavlid access token.')
            }
            setError('');
            setLoading(true);

            const octokit = new Octokit({ auth: connectKey ? connectKey : '' });
            const info = await octokit.request('GET /repos/{owner}/{repo}/commits', {
                owner: 'JoshuaRotimi',
                repo: REPO_NAME
            });
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
        window.localStorage.setItem('accessKey', token);
        getData();
        setToken('');

    };

    const handleRefresh = useCallback(() => {
        getData();
    }, [connectKey]);

    useEffect(() => {
        getData();
    }, [connectKey]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown((prevState) => {
                if (prevState === 0) {
                    handleRefresh();
                    setCountDown(30);
                } else {
                    return prevState - 1
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  return (
      <Box p={'10px'} w={'80%'} m={'10px auto'} textAlign={'center'}>
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
                                 type={'text'}
                                 onChange={handleChange}
                          />
                          <Button colorScheme={'teal'} m={'0 10px'} onClick={handleClick}>Submit</Button>
                      </Flex>
                  </Box>)
          }

          <Flex alignItems={'center'} flexDirection={'column'}>
              <Flex alignItems={'center'}>
                  <Button colorScheme={'teal'} m={'0 10px'} onClick={handleRefresh}>Refresh</Button>
                  <Text color={'lightblue'}>{countDown}</Text>
              </Flex>

              {loading && <Text p={'20px 0'}>Loading... Please wait.</Text>}

              { error ? <Text p={'20px 0'}>{error}</Text> : null}

              {data && data.map((item, index) => (
                  <Item key={index} data={item} index={index}/>
              ))}
          </Flex>

        </Box>
  );
}

export default App;
