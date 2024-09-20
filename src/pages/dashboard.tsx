import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TablePagination from '@mui/material/TablePagination';

import '../assets/styles/dashboard.css';

import { Dog } from '../core';
import { AppHeader, DogList } from '../components';

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
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [sort, setSort] = React.useState<'asc' | 'desc'>('asc');
  const [favoriteDogIds, setFavoriteDogIds] = React.useState<Array<string>>([]);
  const [favoriteDogs, setFavoriteDogs] = React.useState<Array<Dog>>([]);
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
    params = { ...params, sort: `breed:${sort}` };
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

  React.useEffect(() => {
    searchMatches();
  }, [favoriteDogIds]);
  const searchMatches = async () => {
    if (favoriteDogIds.length <= 0) {
      setFavoriteDogs([]);
      return;
    }

    const dogId = await Dog.searchMatches(favoriteDogIds);

    const dogs = await Dog.searchDogs([dogId]);
    setFavoriteDogs(dogs);
  };

  const breedsChange = (e: SelectChangeEvent<typeof selectedBreeds>) => {
    const {
      target: { value }
    } = e;
    setSelectedBreeds(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPageIndex(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(e.target.value, 10));
    setPageIndex(0);
  };

  const handleSelectSort = (e: SelectChangeEvent<any>) => {
    setSort(e.target.value);
    setPageIndex(0);
  };

  const handleSelectDog = (dogId: string) => {
    if (favoriteDogIds.some((x) => x === dogId)) {
      setFavoriteDogIds(favoriteDogIds.filter((x) => x !== dogId));
    } else {
      setFavoriteDogIds([...favoriteDogIds, dogId]);
    }
  };

  return (
    <div className="dashboard w-full">
      <AppHeader />
      <div className="main p-4">
        <div className="dog-list w-full mt-4">
          <div>
            <strong>Matches:</strong>
          </div>
          <DogList dogs={favoriteDogs} />
        </div>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
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
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Sort by breed
          </InputLabel>
          <Select
            value={sort}
            label="Sort by breed"
            onChange={handleSelectSort}
          >
            <MenuItem value="asc">ASC</MenuItem>
            <MenuItem value="desc">DESC</MenuItem>
          </Select>
        </FormControl>
        <div className="dog-list w-full flex gap-2 mt-4">
          <DogList
            dogs={dogs}
            selectedIds={favoriteDogIds}
            onClick={(dogId) => handleSelectDog(dogId)}
          />
        </div>
        {/* <Stack spacing={2}>
          <Pagination
            className="w-full"
            count={Math.floor(total / pageSize)}
            boundaryCount={3}
            page={pageIndex}
            color="primary"
            onChange={pageChange}
          />
        </Stack> */}
        <div className="flex flex-col w-full">
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={pageSize}
            count={total}
            page={pageIndex}
            sx={{ width: '100%' }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
