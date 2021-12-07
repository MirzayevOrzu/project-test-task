import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { CardContent, Typography } from '@mui/material';
import swapiApi from '../swapi-axios';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';

export default function PersonCard({ person }) {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    let relevant = true;
    if (relevant) {
      person.films.forEach(filmUrl => {
        let filmPath = filmUrl.split('/api/')[1];
        swapiApi.get(filmPath).then(res => {
          setFilms([...films, res.data]);
        });
      });
    }
    return () => {
      relevant = false;
    }
  }, [films, person.films]);

  return (
    <Card sx={{}}>
      <CardHeader
        avatar={
          <Avatar
            src={`https://starwars-visualguide.com/assets/img/characters/${person.url.split('/')[person.url.split('/').length - 2]}.jpg`}
            sx={{ bgcolor: red[500], height: '90px', width: '90px', marginRight: '20px' }}
            aria-label="recipe"
          >
            {person.name}
          </Avatar>
        }
        title={<Typography variant='h6'>Name: {person.name}</Typography>}
        subheader={
          <div>
            <Typography variant='body1'>birth year: {person.birth_year}</Typography>
            <Typography variant='body1'><a href={person.homeworld}>home country</a></Typography>
          </div>
        }
      />
      <CardContent>
        <Typography variant='subtitle1'>Films: </Typography>
        <Stack direction="row" spacing={2}>
          {
            films && films.map(film => (
              <Box display='flex' flexDirection='column' >
                <Avatar
                  alt={film.title}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant='caption'>{film.title}</Typography>
              </Box>
            ))
          }
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
