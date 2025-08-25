// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from '../services/api';
// import Pagination from '../components/Pagination'; // Make sure you have this component
// import './UserDetails.css';

// function UserDetails() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // State for filters and pagination
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [currentPage, setCurrentPage] = useState(1);

//   const { userId } = useParams();

//   // Memoized function to fetch all data for the user based on filters
//   const fetchUserDetails = useCallback(async (pageToFetch) => {
//     setLoading(true);
//     try {
//       const response = await api.get(`/admin/users/${userId}`, {
//         params: {
//           year: selectedYear,
//           month: selectedMonth,
//           page: pageToFetch,
//         }
//       });
//       setUserData(response.data);
//       setCurrentPage(response.data.currentPage);
//     } catch (error) {
//       console.error('Failed to fetch user details:', error);
//       alert('Could not fetch user details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, selectedYear, selectedMonth, currentPage]);

//   // Effect to fetch data when filters change (resets to page 1)
//   useEffect(() => {
//     fetchUserDetails(1);
//   }, [userId, selectedYear, selectedMonth, fetchUserDetails]);

//   const handlePageChange = (page) => {
//     fetchUserDetails(page);
//   };

//   if (loading && !userData) {
//     return <div className="loading-message">Loading user data...</div>;
//   }

//   if (!userData) {
//     return <div>User not found or failed to load data.</div>;
//   }

//   const { user, summary, transactions, totalPages } = userData;
//   const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

//   return (
//     <div className="user-details-container">
//       <div className="user-details-header">
//         <div>
//           <Link to="/users" className="back-link">&larr; Back to User List</Link>
//           <h1>Financial Overview for {user.name}</h1>
//           <p>{user.email}</p>
//         </div>
//         <div className="date-filters-admin">
//           <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//             {Array.from({ length: 12 }, (_, i) => (
//               <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en-IN', { month: 'long' })}</option>
//             ))}
//           </select>
//           <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//             {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//           </select>
//         </div>
//       </div>

//       <div className="summary-cards">
//         <div className="card income">
//           <h3>Income for Period</h3>
//           <p>₹{summary.totalIncome.toFixed(2)}</p>
//         </div>
//         <div className="card expense">
//           <h3>Expense for Period</h3>
//           <p>₹{summary.totalExpense.toFixed(2)}</p>
//         </div>
//         <div className={`card balance ${summary.balance >= 0 ? 'income' : 'expense'}`}>
//           <h3>Net Balance for Period</h3>
//           <p>₹{summary.balance.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="transactions-section">
//         <h2>Transactions for Selected Period</h2>
//         <table className="user-transactions-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Category</th>
//               <th>Amount</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map(t => (
//                 <tr key={t._id} className={t.type}>
//                   <td>{new Date(t.date).toLocaleDateString('en-IN')}</td>
//                   <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
//                   <td>{t.category}</td>
//                   <td>₹{t.amount.toFixed(2)}</td>
//                   <td>{t.description}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No transactions for this period.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <Pagination 
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserDetails;


// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from '../services/api';
// import Pagination from '../components/Pagination';
// import './UserDetails.css';

// function UserDetails() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // State for filters and pagination
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [currentPage, setCurrentPage] = useState(1);

//   const { userId } = useParams();

//   // Memoized function to fetch all data for the user based on filters
//   const fetchUserDetails = useCallback(async (pageToFetch) => {
//     setLoading(true);
//     try {
//       const response = await api.get(`/admin/users/${userId}`, {
//         params: {
//           year: selectedYear,
//           month: selectedMonth,
//           page: pageToFetch || currentPage,
//         }
//       });
//       setUserData(response.data);
//       setCurrentPage(response.data.currentPage);
//     } catch (error) {
//       console.error('Failed to fetch user details:', error);
//       alert('Could not fetch user details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, selectedYear, selectedMonth, currentPage]);

//   // Effect to fetch data when filters change (resets to page 1)
//   useEffect(() => {
//     // We pass 1 to reset the page when a filter is changed
//     fetchUserDetails(1); 
//   }, [userId, selectedYear, selectedMonth, fetchUserDetails]);

//   const handlePageChange = (page) => {
//     fetchUserDetails(page);
//   };

//   const handleRefresh = () => {
//     // Simply call the existing fetch function for the current page
//     fetchUserDetails(currentPage);
//   };

//   if (loading && !userData) {
//     return <div className="loading-message">Loading user data...</div>;
//   }

//   if (!userData) {
//     return <div>User not found or failed to load data.</div>;
//   }

//   const { user, summary, transactions, totalPages } = userData;
//   const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

//   return (
//     <div className="user-details-container">
//       <div className="user-details-header">
//         <div>
//           <Link to="/users" className="back-link">&larr; Back to User List</Link>
//           <h1>Financial Overview for {user.name}</h1>
//           <p>{user.email}</p>
//         </div>
//         <div className="header-controls">
//           <button onClick={handleRefresh} className="refresh-btn">Refresh Data</button>
//           <div className="date-filters-admin">
//             <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en-IN', { month: 'long' })}</option>
//               ))}
//             </select>
//             <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//               {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="summary-cards">
//         <div className="card income">
//           <h3>Income for Period</h3>
//           <p>₹{summary.totalIncome.toFixed(2)}</p>
//         </div>
//         <div className="card expense">
//           <h3>Expense for Period</h3>
//           <p>₹{summary.totalExpense.toFixed(2)}</p>
//         </div>
//         <div className={`card balance ${summary.balance >= 0 ? 'income' : 'expense'}`}>
//           <h3>Net Balance for Period</h3>
//           <p>₹{summary.balance.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="transactions-section">
//         <h2>Transactions for Selected Period</h2>
//         <table className="user-transactions-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Category</th>
//               <th>Amount</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map(t => (
//                 <tr key={t._id} className={t.type}>
//                   <td>{new Date(t.date).toLocaleDateString('en-IN')}</td>
//                   <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
//                   <td>{t.category}</td>
//                   <td>₹{t.amount.toFixed(2)}</td>
//                   <td>{t.description}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No transactions for this period.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <Pagination 
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserDetails;


// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import api from '../services/api';
// import Pagination from '../components/Pagination';
// import './UserDetails.css';

// function UserDetails() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [currentPage, setCurrentPage] = useState(1);

//   const { userId } = useParams();

//   // This function is now the single source of truth for fetching data
//   const fetchUserDetails = useCallback(async (pageToFetch) => {
//     setLoading(true);
//     try {
//       const response = await api.get(`/admin/users/${userId}`, {
//         params: {
//           year: selectedYear,
//           month: selectedMonth,
//           page: pageToFetch,
//         }
//       });
//       setUserData(response.data);
//       setCurrentPage(response.data.currentPage); // Always update the current page from the response
//     } catch (error) {
//       console.error('Failed to fetch user details:', error);
//       alert('Could not fetch user details.');
//     } finally {
//       setLoading(false);
//     }
//   }, [userId, selectedYear, selectedMonth]); // currentPage is removed from here

//   // Effect to fetch data when filters change
//   useEffect(() => {
//     fetchUserDetails(1); // Always fetch page 1 when filters change
//   }, [userId, selectedYear, selectedMonth, fetchUserDetails]);

//   const handlePageChange = (page) => {
//     // When the page changes, just call fetchUserDetails with the new page
//     fetchUserDetails(page);
//   };

//   const handleRefresh = () => {
//     // When refreshing, just call fetchUserDetails with the *current* page state
//     fetchUserDetails(currentPage);
//   };

//   if (loading && !userData) {
//     return <div className="loading-message">Loading user data...</div>;
//   }

//   if (!userData) {
//     return <div>User not found or failed to load data.</div>;
//   }

//   const { user, summary, transactions, totalPages } = userData;
//   const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

//   return (
//     <div className="user-details-container">
//       <div className="user-details-header">
//         <div>
//           <Link to="/users" className="back-link">&larr; Back to User List</Link>
//           <h1>Financial Overview for {user.name}</h1>
//           <p>{user.email}</p>
//         </div>
//         <div className="header-controls">
//           <button onClick={handleRefresh} className="refresh-btn">Refresh Data</button>
//           <div className="date-filters-admin">
//             <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
//               {Array.from({ length: 12 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en-IN', { month: 'long' })}</option>
//               ))}
//             </select>
//             <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
//               {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="summary-cards">
//         <div className="card income">
//           <h3>Income for Period</h3>
//           <p>₹{summary.totalIncome.toFixed(2)}</p>
//         </div>
//         <div className="card expense">
//           <h3>Expense for Period</h3>
//           <p>₹{summary.totalExpense.toFixed(2)}</p>
//         </div>
//         <div className={`card balance ${summary.balance >= 0 ? 'income' : 'expense'}`}>
//           <h3>Net Balance for Period</h3>
//           <p>₹{summary.balance.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="transactions-section">
//         <h2>Transactions for Selected Period</h2>
//         <table className="user-transactions-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Type</th>
//               <th>Category</th>
//               <th>Amount</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map(t => (
//                 <tr key={t._id} className={t.type}>
//                   <td>{new Date(t.date).toLocaleDateString('en-IN')}</td>
//                   <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
//                   <td>{t.category}</td>
//                   <td>₹{t.amount.toFixed(2)}</td>
//                   <td>{t.description}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No transactions for this period.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <Pagination 
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserDetails;


import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import './UserDetails.css';

function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for filters and pagination
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const { userId } = useParams();

  // This is the single, reliable function for fetching data
  const fetchUserDetails = useCallback(async (page) => {
    setLoading(true);
    setLoading(true);
    try {
      const response = await api.get(`/admin/users/${userId}`, {
        params: {
          year: selectedYear,
          month: selectedMonth,
          page: page, // Use the page number passed to the function
        }
      });
      setUserData(response.data);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      alert('Could not fetch user details.');
    } finally {
      setLoading(false);
    }
  }, [userId, selectedYear, selectedMonth]); // Dependencies for refetching

  // This effect runs when the component mounts or when filters change
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
    fetchUserDetails(1);
  }, [selectedYear, selectedMonth, userId]); // Note: fetchUserDetails is not needed here

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUserDetails(page);
  };

  const handleRefresh = () => {
    // Simply call the fetch function with the current page
    fetchUserDetails(currentPage);
  };

  if (loading && !userData) {
    // <div className="loading-message">Loading user data...</div>;
    return <Spinner />;
  } 

  if (!userData) {
    return <div>User not found or failed to load data.</div>;
  }
  

  const { user, summary, transactions, totalPages } = userData;
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="user-details-container">
      <div className="user-details-header">
        <div>
          <Link to="/users" className="back-link">&larr; Back to User List</Link>
          <h1>Financial Overview for {user.name}</h1>
          <p>{user.email}</p>
        </div>
        <div className="header-controls">
          <button onClick={handleRefresh} className="refresh-btn">Refresh Data</button>
          <div className="date-filters-admin">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en-IN', { month: 'long' })}</option>
              ))}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {yearOptions.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="summary-cards">
        <div className="card income">
          <h3>Income for Period</h3>
          <p>₹{summary.totalIncome.toFixed(2)}</p>
        </div>
        <div className="card expense">
          <h3>Expense for Period</h3>
          <p>₹{summary.totalExpense.toFixed(2)}</p>
        </div>
        <div className={`card balance ${summary.balance >= 0 ? 'income' : 'expense'}`}>
          <h3>Net Balance for Period</h3>
          <p>₹{summary.balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="transactions-section">
        <h2>Transactions for Selected Period</h2>
        <table className="user-transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(t => (
                <tr key={t._id} className={t.type}>
                  <td>{new Date(t.date).toLocaleDateString('en-IN')}</td>
                  <td style={{ textTransform: 'capitalize' }}>{t.type}</td>
                  <td>{t.category}</td>
                  <td>₹{t.amount.toFixed(2)}</td>
                  <td>{t.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No transactions for this period.</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default UserDetails;