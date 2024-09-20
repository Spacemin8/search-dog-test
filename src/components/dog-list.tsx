import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Dog } from '@/core';
import { clsxm } from '../lib';

interface Props {
  className?: string;
  dogs: Array<Dog>;
  selectedIds?: Array<string>;
  onClick?: (dogId: string) => void;
}

export const DogList: React.FC<Props> = ({
  className = '',
  dogs,
  selectedIds = [],
  onClick
}) => {
  return (
    <List
      className={clsxm('dog-list', 'w-full', className)}
      sx={{ bgcolor: 'background.paper' }}
    >
      {dogs.map((dog) => (
        <React.Fragment key={dog.id}>
          <ListItem
            className={clsxm(
              'cursor-pointer',
              selectedIds.some((x) => x === dog.id)
                ? 'border-[2px] rounded-2'
                : ''
            )}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={dog.img} />
            </ListItemAvatar>
            <ListItemText
              primary={dog.id}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      display: 'inline'
                    }}
                  >
                    {dog.name}, {dog.age} years old
                  </Typography>
                  <br />
                  {dog.zip_code} - {dog.breed}
                </React.Fragment>
              }
              onClick={() => onClick?.(dog.id)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};
