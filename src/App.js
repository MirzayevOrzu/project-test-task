import * as React from 'react';
import { useState, useEffect } from 'react';
import swapiApi from './swapi-axios';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import PersonCard from './components/PersonCard';
import Grid from '@mui/material/Grid';
import SearchField from './components/SearchField';

function App() {
  const [people, setPeople] = useState([]);
  const [[previous, next], setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    let relevant = true;
    if (relevant) {
      swapiApi.get('/people')
        .then(res => {
          console.log(res);
          setPeople(res.data.results);
          setPage([res.data.previous, res.data.next]);

        }).catch(err => {
          console.log(err);
        });
    }
    return () => {
      relevant = false;
    }
  }, []);

  useEffect(() => {
    let relevant = true;
    if (relevant) {
      let pageQuery = currentPage.split('/')[currentPage.split('/').length - 1]; // example: ?page=2
      swapiApi.get(`/people/${pageQuery}`)
        .then(res => {
          console.log(res);
          setPeople(res.data.results);
          setPage([res.data.previous, res.data.next]);
        }).catch(err => {
          console.log(err);
        });
    }
    return () => {
      relevant = false;
    }
  }, [currentPage]);


  const handlePagination = (newPageUrl) => {
    setCurrentPage(newPageUrl);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <SearchField setPeople={setPeople} />
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {
            people && people.map(person => (
              <Grid item xs={12} key={person.created} >
                <PersonCard person={person} />
              </Grid>
            ))
          }
        </Grid>
        <footer>
          <span onClick={() => handlePagination(previous)}>{previous ? '<= previous ' : null}</span>
          <span onClick={() => handlePagination(next)}> {next ? ' next =>' : null}</span>
        </footer>
      </Container>
    </React.Fragment >
  );
}

export default App;
