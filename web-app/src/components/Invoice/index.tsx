import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Box } from '@mui/system';

import { useInvoices } from '../../hooks/useInvoices';
import { downloadInvoices } from '../../services/downloadInvoices';
import { useUser } from '../../hooks/useUser';

export function Invoice() {
  const { account } = useUser();
  const { loading, invoices } = useInvoices();
  const [rows, setRows] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!loading && invoices?.items?.length > 0) {
      setRows(invoices.items);
    }
  }, [loading]);

  const handleDownloadInvoice = () => {
    setCreating(true);
    // Only invoices with the status Created will be downloaded

    downloadInvoices()
      .then(() => {
        setCreating(false);
      })
      .catch((err) => {
        setCreating(false);
        setErrorMsg(err.message);

        console.log(err.message);
      });
  };

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
                  {account?.role === 'admin' && (
                    <Button
                      disabled={creating}
                      variant="contained"
                      color="success"
                      onClick={handleDownloadInvoice}
                    >
                      {!loading ? (
                        'Download New Invoices'
                      ) : (
                        <Grid
                          width="200px"
                          container
                          direction="column"
                          alignContent="center"
                        >
                          <CircularProgress color="secondary" />
                        </Grid>
                      )}
                    </Button>
                  )}

                  {Boolean(errorMsg) && (
                    <div>
                      <Alert severity="error">{errorMsg}</Alert>
                    </div>
                  )}
                </div>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Passenger ID</TableCell>
                        <TableCell>Ride ID</TableCell>
                        <TableCell>Ride Date</TableCell>
                        <TableCell>Pickup Address</TableCell>
                        <TableCell>Dropoff Address</TableCell>
                        <TableCell>Company Tax ID</TableCell>
                        <TableCell>Driver Tax ID</TableCell>
                        <TableCell>Total amount</TableCell>
                        <TableCell>Created At</TableCell>
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
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row?.passengerId}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.rideId}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {new Date(row.rideDate).toLocaleString()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.pickUp}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.dropOff}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.companyTaxpayerNumber}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.driverTaxPayerNumber}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.amount}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {new Date(row.createdAt).toLocaleString()}
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
