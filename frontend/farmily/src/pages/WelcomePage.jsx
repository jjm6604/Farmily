import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../api/axios.jsx';

import sapling from '../assets/images/sapling.png';
import board from '../assets/images/mainboard.png';

import { useState, useEffect } from 'react';
import { getAccessToken } from '../store/auth.jsx';
import { setFamily } from '../store/family.jsx';

const welcomeMessage = 'Welcome Farmily';
const introTitle_1 = '가족과 함께';
const introTitle_2 = '나무를 키워보세요!';
const introContent_1 = '가족과의 추억을 기록하고';
const introContent_2 = '열매를 맺어 수확하세요.';

export default function WelcomePage() {
  const dispatch = useDispatch();

  const cookies = document.cookie.split(';');
  const cookie = cookies.find((c) => c.startsWith('accessToken='));
  const accessToken = cookie.split('accessToken=')[1];

  useEffect(() => {
    dispatch(getAccessToken({ accessToken: accessToken }));
    axios
      .get(`/family/1`)
      .then((res) => {
        const familyData = {
          id: res.data.id,
          name: res.data.name,
          motto: res.data.motto,
          tree: res.data.tree,
          challengesIds: res.data.challengesIds,
          sprintId: res.data.sprintId,
        };
        dispatch(setFamily(familyData));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="w-2/6 mb-60 pl-36">
        <p className="text-3xl font-bold mb-4">{welcomeMessage}</p>
        <p className="text-2xl">{introTitle_1}</p>
        <p className="text-2xl">{introTitle_2}</p>
        <br />
        <p className="">{introContent_1}</p>
        <p className="">{introContent_2}</p>
        <br />
      </div>
      <div className="w-5/12">
        <img className="mb-28" src={sapling} alt="" />
      </div>
      <div className="w-1/6 mr-32 mb-28 relative">
        <p className="text-white text-4xl absolute top-16 left-12">시작하기</p>
        <img src={board} alt="" />
      </div>
    </>
  );
}