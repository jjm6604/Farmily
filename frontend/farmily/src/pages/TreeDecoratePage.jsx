import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Tree from '../components/tree/DecorateTree.jsx';
import Board from '../components/tree/Board.jsx';
import FruitItem from '../components/tree/FruitItem.jsx';
import axios from '../api/axios.jsx';

export default function TreeDecoratePage() {
  const family = useSelector((state) => state.family.value);
  const [treeFruits, setTreeFruits] = useState(
    family.tree.mainRecordFruitDtoList
  );
  const [inventoryFruits, setInventoryFruits] = useState([
    {
      id: 0,
      type: '',
      title: '',
    },
  ]);

  useEffect(() => {
    axios
      .get(`family/${family.id}/inventory/${family.mainSprint.sprintId}`)
      .then((response) => {
        setInventoryFruits(response.data.recordFruitList);
        console.log(response.data.recordFruitList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInventoryFruitClick = (e, fruitIndex) => {
    const updatedInventoryFruits = inventoryFruits.filter(
      (item, index) => index !== fruitIndex
    );
    const newTreeFruit = {
      recordId: inventoryFruits[fruitIndex].id,
      recordTitle: inventoryFruits[fruitIndex].title,
      position: {
        row: 0,
        col: 0,
      },
      type: inventoryFruits[fruitIndex].type,
    };
    const updatedTreeFruits = [...treeFruits, newTreeFruit];
    setTreeFruits(updatedTreeFruits);
    setInventoryFruits(updatedInventoryFruits);
  };

  return (
    <div className="flex items-end">
      <div className="w-28 h-28 ml-5"></div>
      <div className="w-28 h-28 ml-5"></div>
      <div className="w-28 h-28 ml-5"></div>
      <Tree treeFruits={treeFruits} setTreeFruits={setTreeFruits} />
      <div>
        <div className="flex bg-gray-200 w-80 h-80">
          {inventoryFruits.map((fruit, index) => (
            <div
              key={index}
              className="w-10 h-10"
              draggable="true"
              data-fruit-index={index}
              onClick={(e) => handleInventoryFruitClick(e, index)}
            >
              <FruitItem />
            </div>
          ))}
        </div>
        <Board />
      </div>
    </div>
  );
}
