import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const Datatable = () => {
  // All Data handle for data
  const [data, setData] = useState([]);

  // handle for pagination data
  const [page, setPage] = useState(0);

  // handle for tables rows
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // pagination set new Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // handle Change Rows PerPage
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    axios.get(`https://qaapi.jahernotice.com/api/Epp`).then((response) => {
        setData(response.data.data);
      console.log("anuj",response.data.data)
    });
  }, []);

  return (
    <>
      {/* table */}
      <Paper sx={{ width: "100%", mb: 0 }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            className="table table-striped table-hover"
            size="small"
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>EPPCount</TableCell>
                <TableCell>EmailID</TableCell>
                <TableCell>FirstName</TableCell>
                <TableCell>LastName</TableCell>
                <TableCell>MobileNo</TableCell>
                <TableCell>UserID</TableCell>
                <TableCell> end_date</TableCell>
                <TableCell>group_id</TableCell>
                <TableCell>start_date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data,index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{data.EPPCount}</TableCell>
                    <TableCell>{data.EmailID}</TableCell>
                    <TableCell>{data.FirstName}</TableCell>
                    <TableCell>{data.LastName}</TableCell>
                    <TableCell>{data.MobileNo}</TableCell>
                    <TableCell>{data.UserID}</TableCell>
                    <TableCell>{data.end_date}</TableCell>
                    <TableCell>{data.group_id}</TableCell>
                    <TableCell>{data.start_date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* table pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Datatable;
