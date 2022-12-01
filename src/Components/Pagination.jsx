function createArrayOfSize(n) {
  return new Array(n).fill(0);
}

function Pagination({

  totalPages,
  currentPage,
  handlePageChange
}){


  let pages = createArrayOfSize(totalPages).map((a,index) => {

    return (
    <button data-testid="page-btn"
    key ={Math.random()}
    disabled = {currentPage === index+1}
    onClick ={ () => handlePageChange(index+1)}
    >

     {index+1}

     </button>
    )
  });

  return <div>{pages}</div>;
}

export default Pagination;
