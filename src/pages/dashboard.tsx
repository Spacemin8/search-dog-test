import '../assets/styles/dashboard.css';
import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import LogOut from '../components/logOut';
import { Dog, Location, Coordinate } from '../core';
import { DogList } from '../components';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Stack } from '@mui/system';
import { Pagination } from '@mui/material';

const Dashboard: React.FC = () => {
  // const authContext = useContext(AuthContext);
  // const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
  const [breeds, setBreeds] = React.useState<Array<string>>([]);
  const [pageSize] = React.useState(24);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [sort, setSort] = React.useState<'asc' | 'desc'>('asc');
  const [dogIds, setDogIds] = React.useState<Array<string>>([]);
  const [dogs, setDogs] = React.useState<Array<Dog>>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    const breeds = await Dog.fetchBreeds();
    setBreeds(breeds);
  };

  React.useEffect(() => {
    searchDogIds();
  }, [pageSize, pageIndex, selectedBreeds, sort]);

  const searchDogIds = async () => {
    let params: any = { size: pageSize };
    if (selectedBreeds.length > 0)
      params = { ...params, breeds: selectedBreeds };
    if (pageIndex > 0) {
      params = { ...params, from: pageIndex * pageSize };
      if ((pageIndex + 1) * pageSize > total) {
        params = { ...params, size: total - pageIndex * pageSize };
      }
    }
    const response = await Dog.searchDogIds(params);
    setDogIds(response.resultIds);
    setTotal(response.total);
  };

  React.useEffect(() => {
    searchDogs();
  }, [dogIds]);

  const searchDogs = async () => {
    const dogs = await Dog.searchDogs(dogIds);
    setDogs(dogs);
  };

  const breedsChange = (e: SelectChangeEvent<typeof selectedBreeds>) => {
    const {
      target: { value }
    } = e;
    setSelectedBreeds(typeof value === 'string' ? value.split(',') : value);
  };

  const pageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setPageIndex(value);
  };

  return (
    <div className="dashboard w-full">
      <div className="navbar">
        <LogOut />
      </div>

      <div className="main p-4">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Breeds</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedBreeds}
            onChange={breedsChange}
            input={<OutlinedInput label="Breeds" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {breeds.map((breed) => (
              <MenuItem key={breed} value={breed}>
                <Checkbox checked={selectedBreeds.includes(breed)} />
                <ListItemText primary={breed} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="dog-list w-full flex gap-2 mt-4">
          <DogList dogs={dogs} />
        </div>
        <Stack spacing={2}>
          <Pagination
            className="w-full"
            count={Math.floor(total / pageSize)}
            boundaryCount={3}
            page={pageIndex}
            color="primary"
            onChange={pageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Dashboard;
