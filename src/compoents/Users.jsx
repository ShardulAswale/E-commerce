import React from "react";

const Users = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    return () => {
      axios.get(`https://fakestoreapi.com/products`).then((res) => {
        const data = res.data;
        setProducts(data);
      });
    };
  }, []);
  return <div>Users</div>;
};

export default Users;
