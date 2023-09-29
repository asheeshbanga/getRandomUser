
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const fetchRandomData = (pageNumber) => {
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({data}) => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log(err);
    });
}

const getFullUserName = (userInfo) => {
  const {name: {first, last}, picture: {thumbnail}} = userInfo;
  return `${first} ${last}`;
}

function App() {

  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfo, setUserInfo] = useState([]);
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
    // setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || 'No user data found.');
    if (randomData === undefined) return;
    const newUserInfo = [...userInfo, ...randomData.results]
    setUserInfo(newUserInfo);
    setNextPageNumber(randomData.info.page + 1);
    })
}

  useEffect(() => {
      fetchNextUser(nextPageNumber);
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happens!</h2>
      <button onClick={() => {fetchNextUser()}}>Fetch Next User</button>
      {
        userInfo.map((userInfo, idx) => (
          <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} alt="" />
          </div>
        ))
      }
      <p> {randomUserDataJSON} </p>
    </div>
  );
}

export default App;
