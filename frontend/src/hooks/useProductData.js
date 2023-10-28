import { useEffect, useState } from 'react';
import productApi from '../api/productApi';

const useProductData = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await productApi.getAll({
          _page: page,
          _limit: limit,
        });
        setProductList(data);
        console.log(data);
      } catch (error) {
        if (error.response && error.response.status) {
          console.log('Error fetching product list: ' + error.message);
        } else {
          console.log('Error fetching product list: Unexpected error');
        }
      }
    };

    fetchData();
  }, [page, limit]);

  return { productList };
};

export default useProductData;
