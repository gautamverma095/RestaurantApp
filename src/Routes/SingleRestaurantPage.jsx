import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const getSingleRestaurant = (id) => {
  return fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants/${id}`).then((res) => res.json())
}

function SingleRestaurantPage() {
  const [data,setData] = useState({})

  const [load,setLoad] = useState(false)

  const param = useParams()


  useEffect(() => {
    setLoad(true)
    getSingleRestaurant(param.id).then((res) => {
      setData(res.data)
      setLoad(false)
    }).catch((err)=>{
      console.log(err)
      setLoad(false)
    })
  },[])
if(load){
 return <h1>..Loading</h1>
}


  return (
    <div data-testid="restaurant-container">
      <div>
        <h3 data-testid="restaurant-name">{data.name}</h3>
      </div>
      <div data-testid="restaurant-type">Type:{data.type}</div>
      <div data-testid="restaurant-rating">Rating:{data.rating}</div>
      <div data-testid="restaurant-votes"> Votes:{data.number_of_votes}</div>
      <div data-testid="restaurant-price">Starting Price:{data.price_starts_from}</div>
      <div>
        <img data-testid="restaurant-image" src={data.image} alt ={data.name} width={"100px"} />
      </div>
    </div>
  );
}
export default SingleRestaurantPage;
