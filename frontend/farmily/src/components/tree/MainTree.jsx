import { useState, useEffect } from 'react';
import maintree from '../../assets/images/maintree.png';
import FruitItem from './FruitItem.jsx';
import MottoBoard from '../../assets/images/motto.png';

import { useSelector } from 'react-redux';

export default function MainTree() {
  // 임시데이터, 연결 후 열매에 대한 데이터 받아오기
  const [isMotto, setIsMotto] = useState(false);
  const [mainRecordFruitDtoList, setMainRecordFruitDtoList] = useState([
    {
      recordId: 1,
      recordTitle: 'string',
      position: { row: 300, col: 100 },
      type: 'DAILY',
    },
    {
      recordId: 2,
      recordTitle: 'string',
      position: { row: 220, col: 150 },
      type: 'DAILY',
    },
    {
      recordId: 3,
      recordTitle: 'string',
      position: { row: 170, col: 200 },
      type: 'DAILY',
    },
  ]);
  const [mainAccessoryFruitDtoList, setMainAccessoryFruitDtoList] = useState([
    {
      id: 7,
      position: {
        row: 220,
        col: 50,
      },
      accessoryType: 'HIDDEN_FRUIT',
    },
    {
      id: 7,
      position: {
        row: 200,
        col: 100,
      },
      accessoryType: 'HIDDEN_FRUIT',
    },
  ]);

  const family = useSelector((state) => state.family.value);

  const onClickHandler = () => {
    setIsMotto(!isMotto);
  };

  return (
    <div className="relative overflow-hidden">
      <img className="" src={maintree} alt="MainTree" />
      {mainRecordFruitDtoList.map((fruit, index) => (
        <div
          key={index}
          className="absolute w-10 h-10"
          style={{
            top: fruit.position.col,
            left: fruit.position.row,
          }}
        >
          <FruitItem />
        </div>
      ))}
      {mainAccessoryFruitDtoList.map((fruit, index) => (
        <div
          key={index}
          className="absolute w-10 h-10"
          style={{
            top: fruit.position.col,
            left: fruit.position.row,
          }}
        >
          <FruitItem />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-32 flex justify-center">
        <div
          className="h-32 opacity-100 text-opacity-100 w-16 hover:cursor-pointer"
          onClick={onClickHandler}
        ></div>
      </div>
      {
        <div className="flex h-28 items-center justify-center">
          {isMotto && (
            <div className={`relative animate-fade-up`}>
              <img src={MottoBoard} />
              <p className="absolute text-xl text-black text inset-x-10 bottom-5 flex justify-center">
                {family.motto}
              </p>
            </div>
          )}
        </div>
      }
    </div>
  );
}
