import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { useRides } from '../../hooks/useRides';

export function Ride() {
  const { loading, rides } = useRides();
  const [pickAll, setPickAll] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && rides?.items?.length > 0) {
      setRows(rides?.items?.map((item) => ({ ...item, selected: false })));
    }
  }, [loading]);

  const handlePickAll = () => {
    // add delay on response, due to possible multi checks in min time
    setPickAll((prevState) => {
      if (prevState) {
        setRows(rows.map((row) => ({ ...row, selected: false })));
      } else {
        setRows(rows.map((row) => ({ ...row, selected: true })));
      }

      return !prevState;
    });
  };

  const handlePickOne = (id: string, value: boolean) => {
    const currentRows = [...rows];
    const idx = currentRows.findIndex((rows) => rows.id === id);
    const newRowItem = { ...currentRows[idx], selected: value };
    currentRows[idx] = newRowItem;

    console.log(currentRows);

    setRows(currentRows);
  };

  const handleCreateInvoice = () => {};

  return (
    <div>
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          {loading ? (
            <Grid container direction="column" alignContent="center">
              <CircularProgress color="secondary" />
            </Grid>
          ) : (
            <Box sx={{ width: '100%' }} flexGrow={1}>
              <div style={{ width: '100%' }}>
                <div style={{ padding: '20px' }}>
                  <Typography id="modal-modal-title">
                    Select one or more rides to start generating invoices
                  </Typography>
                </div>

                {(pickAll || rows.some((ride) => ride.selected === true)) && (
                  <div style={{ padding: '20px' }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleCreateInvoice}
                    >
                      Create Invoice
                    </Button>
                  </div>
                )}

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Checkbox
                            color="primary"
                            checked={pickAll}
                            onClick={handlePickAll}
                          />
                        </TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Pickup Address</TableCell>
                        <TableCell>Dropoff Address</TableCell>
                        <TableCell>Fare</TableCell>
                        <TableCell>Service Fee</TableCell>
                        <TableCell>Total amount</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {rows.length > 0 &&
                        rows.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              padding="checkbox"
                              align="center"
                            >
                              <Checkbox
                                color="primary"
                                checked={row.selected}
                                // inputProps={{
                                //   'aria-labelledby': labelId,
                                // }}
                                onClick={(e: any) =>
                                  handlePickOne(row.id, e.target.checked)
                                }
                              />
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {new Date(row.date).toLocaleString()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.pickupAddress}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.dropoffAddress}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.fare}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.serviceFee}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.amount}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.status}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
