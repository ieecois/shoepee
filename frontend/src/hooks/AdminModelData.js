import { useEffect, useState } from 'react';
import adminModelApi from '../api/adminModelApi';

const AdminModelData = () => {
  const [modelList, setModelList] = useState([]);
  const [page] = useState(1);
  const [limit] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await adminModelApi.getAll({
          _page: page,
          _limit: limit,
        });

        // Filtering logic
        const filteredData = data.filter((model) => {
          // Filter out entire model if the brand status is unavailable
          if (model.brandDto && model.brandDto.status === 'unavailble') {
            return false;
          }

          // Filter individual shoes within the model
          if (model.shoes && model.shoes.length) {
            model.shoes = model.shoes.filter(
              (shoe) => shoe.status === 'available'
            );
          }

          return true;
        });

        setModelList(filteredData);
      } catch (error) {
        console.error('Error fetching product list:', error.message);
      }
    };

    fetchData();
  }, [page, limit]);

  const deleteModel = async (id) => {
    try {
      await adminModelApi.remove(id);
      setModelList((prevModelList) =>
        prevModelList.filter((model) => model.id !== id)
      );
    } catch (error) {
      console.error('Error deleting model: ' + error.message);
    }
  };

  const addModel = async (id) => {
    try {
      const response = await adminModelApi.add(id);
      return response.data;
    } catch (error) {
      console.error('Error adding model: ' + error.message);
    }
  };

  return { modelList, deleteModel, addModel };
};

export default AdminModelData;
