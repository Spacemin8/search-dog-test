import '../assets/styles/dashboard.css';
import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import LogOut from '../components/logOut';
import { Dog, Location, Coordinate } from '../core';

const Dashboard: React.FC = () => {
  // const authContext = useContext(AuthContext);
  // const navigate = useNavigate();

  const [breeds, setBreeds] = React.useState<Array<string>>([]);
  const [pageSize] = React.useState(24);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [sort, setSort] = React.useState<'asc' | 'desc'>('asc');
  const [dogIds, setDogIds] = React.useState<Array<string>>([]);
  const [dogs, setDogs] = React.useState<Array<Dog>>([]);

  React.useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    const breeds = await Dog.fetchBreeds();
    setBreeds(breeds);
  };

  React.useEffect(() => {
    searchDogIds();
  }, [pageSize, pageIndex, sort]);

  const searchDogIds = async () => {
    const dogIds = await Dog.searchDogIds();
    setDogIds(dogIds);
  };

  React.useEffect(() => {
    searchDogs();
  }, [dogIds]);

  const searchDogs = async () => {
    const dogs = await Dog.searchDogs(dogIds);
    setDogs(dogs);
  };

  return (
    <div className="container">
      <div className="navbar">
        <h2>DashBoard</h2>
        <LogOut />
      </div>

      <div className="main">
        <div className="breed-list flex">
          {breeds.map((breed, index) => (
            <button key={index}>{breed}</button>
          ))}
        </div>
        <div className="dog-list flex">
          {dogs.map((dog) => (
            <div key={dog.id} className="dog-item">
              <img src={dog.img} alt="" />
              <div>Id: {dog.id}</div>
              <div>Name: {dog.name}</div>
              <div>Age: {dog.age}</div>
              <div>Zip Code: {dog.zip_code}</div>
              <div>Breed: {dog.breed}</div>
            </div>
          ))}
          d
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
