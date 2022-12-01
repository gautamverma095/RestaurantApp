import { lightGreen } from "@material-ui/core/colors";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../Components/Pagination";
import RestaurantTable from "../Components/RestaurantTable";
import { AppContext } from "../Context/AppContext";

const getRestaurant = ({
  page
}) => {
  return fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/getrestaurants?page=${page}&limit=10`).then((res) => res.json())
}



function Dashboard() {
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState(null)

  let [searchParams, setSearchParams] = useSearchParams();
  let initialstate = Number(searchParams.get("page")) || 1
  const [page, setPage] = useState(initialstate)

  const { token, logoutUser } = useContext(AppContext)

  useEffect(() => {
    setSearchParams({ page })
  }, [page])



  useEffect(() => {

    getRestaurant({ page }).then((res) => {
      setData(res.data)
      setTotalPages(res.totalPages)
    })

  }, [page])

  const handlePageChange = (num) => {

    setPage(num)
  }


  return (
    <div>
      <h3>Dashboard</h3>
      <div>
        <button data-testid="logout-btn" onClick={logoutUser}>Logout</button>
        <p>

          <b data-testid="user-token"> {token}</b>
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>


        <RestaurantTable data={data} />
      </div>
      <div data-testid="pagination-container">
        <Pagination

          totalPages={totalPages}
          currentPage={page}
          handlePageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default Dashboard;
