import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();
//provider , consumer - GithubContext.Provider

const GithubProvider = ({children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    //request loading
    const [requests, setRequests] = useState(0);
    const [loading, setIsLoading] = useState(false);
    //check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`).then(({data})=> {
            let {
                rate:{remaining},} = data;
                
                setRequests(remaining);
                if(remaining === 0) {
                    toggleError(true, "Sorry, you have exceeded your hourly rate limit");
                }
        }).catch((error) => {console.log(error);});
    };
    //error
    function toggleError(show = false, msg= '') {
        setError({show, msg});
    }
    const[error, setError] = useState({show: false, msg:''});
    useEffect(checkRequests,[]);
    return (
        <GithubContext.Provider value={{githubUser, repos, followers, requests, error}}>
            {children}
        </GithubContext.Provider>
    );
};
export {GithubProvider, GithubContext};