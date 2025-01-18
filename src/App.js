import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';

const ITEMS_PER_PAGE = 5;

function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }, []);
  const maxPage = useMemo(() => {
    return Math.ceil(data.length / ITEMS_PER_PAGE);
  }, [data]);
  const isFirstPage = useMemo(() => {
    return page === 1;
  }, [page]);
  const isLastPage = useMemo(() => {
    return page === maxPage;
  }, [page, maxPage]);
  const handleNext = useCallback(() => {
    if (page + 1 <= maxPage) {
      setPage(page + 1);
    }
  }, [page, maxPage]);
  const handlePrev = useCallback(() => {
    if (page - 1 >= 1) {
      setPage(page - 1);
    }
  }, [page]);

  const start = useMemo(() => (page - 1) * ITEMS_PER_PAGE, [page]);
  const end = useMemo(() => page * ITEMS_PER_PAGE, [page]);
  return (
    <div className="App">
      <div className='title-div'>
        <h1>Highly-rated Kickstarter Projects</h1>
      </div>
      <div className='table-div'>
      <table data-testid="table">
        <thead>
          <tr>
            <th>
              S.no
            </th>
            <th>
            Percentage funded
            </th>
            <th>
            Amount pledged
            </th>
          </tr>
        </thead>
        <tbody>
        {
          data.slice(start, end).map(item => {
            return (
              <tr key={item["s.no"]}>
                <td>{item["s.no"]}</td>
                <td>{item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>
            )})
        }
        </tbody>
      </table>
      </div>
      <div className="pagination">
        <button data-testid="prev-btn" onClick={handlePrev} disabled={isFirstPage}>Prev</button>
        <button data-testid="next-btn" onClick={handleNext} disabled={isLastPage}>Next</button>
      </div>
    </div>
  );
}

export default App;
