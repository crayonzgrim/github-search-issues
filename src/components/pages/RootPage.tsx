import React, { useState, useEffect } from 'react';
import { css, styled } from '@mui/material';
import axios from 'axios';

import { SearchField } from '../molecules/SearchField';
import { SearchableList } from '../molecules/SearchableList';
import { SearchedList } from '../organisms/SearchedList';
import { Header } from '../molecules/Header';
import { Banner } from '../molecules/Banner';
import { Layout } from '../molecules';

export const RootPage = styled((props) => {
  /** Property */
  const { ...others } = props;

  // 전체 Repositories 데이터
  const [allRepoDatas, setAllRepoDatas] = useState([]);

  // 검색 가능한 이름 목록
  const [repoNames, setRepoNames] = useState(undefined);

  // 검색을 통해 찾은 데이터
  const [searchedRepoData, setSearchedRepoData] = useState([]);

  // LocalStorage 저장 데이터
  const [saveStorage, setSaveStorage] = useState([]);

  /** Function */
  useEffect(() => {
    axios
      .get('https://api.github.com/repositories')
      .then((res) => {
        setRepoNames(res.data.map((data: Record<string, any>) => data.name));

        setAllRepoDatas(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  /** Render */
  return (
    <Layout {...others}>
      <Header />

      <Banner />

      <SearchField
        allRepoDatas={allRepoDatas}
        setSearchedRepoData={setSearchedRepoData}
      />

      {searchedRepoData && searchedRepoData.length > 0 ? (
        <SearchedList
          searchedRepoData={searchedRepoData}
          saveStorage={saveStorage}
          setSaveStorage={setSaveStorage}
        />
      ) : (
        <SearchableList names={repoNames} />
      )}
    </Layout>
  );
})(({ theme }) => {
  return css``;
});
