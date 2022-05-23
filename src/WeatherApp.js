import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

import useWeatherApi from './useWeatherApi';

import { findLocation } from './utils';

import WeatherCard from './WeatherCard';
import WeatherSetting from './WeatherSetting';

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregouundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregouundColor: '#121416',
    boxShadow: '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getMoment = (locationName) => {
  // 可以设置根据 地名 判断的日出、日落时间

  return new Date().getHours() >= 6 && new Date().getHours() <= 18 ? 'day' : 'night';
}

const WeatherApp = () => {
  console.log('--- invoke function component ---');
  const storageCity = localStorage.getItem('cityName');

  const [currentCity, setCurrentCity] = useState(storageCity || '花蓮縣');

  const currentLocation = findLocation(currentCity) || {};

  const [weatherElement, fetchData] = useWeatherApi(currentLocation);
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('WeatherCard');

  // const { locationName } = weatherElement;

  const moment = useMemo(() => getMoment(currentCity.sunriseCityName), [
    currentCity.sunriseCityName,
  ]);

  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark');
  }, [moment]);

  useEffect(() => {
    localStorage.setItem('cityName', currentCity);
  }, [currentCity]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      {console.log('render')}
      <Container>
        {currentPage === 'WeatherCard' && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'WeatherSetting' && (
          <WeatherSetting
            cityName={currentLocation.cityName}
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default WeatherApp;