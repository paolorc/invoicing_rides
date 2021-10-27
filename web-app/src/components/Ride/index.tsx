import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';

import { tabNames } from '../../pages/Home';
import { useRides } from '../../hooks/useRides';
import { createInvoice } from '../../services/createInvoice';

export function Ride({ toggleTab }) {
  const { loading, rides } = useRides();
  const [pickAll, setPickAll] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [taxpayer, setTaxpayer] = useState('');
  const [creating, setCreating] = useState(false);

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

    setRows(currentRows);
  };

  const handleProcessInvoices = () => {
    setErrorMsg('');
    setCreating(true);

    const completedSelectedRides = rows
      .filter((row) => row.status === 'COMPLETED' && row.selected)
      .map((row) => row.id);

    console.log(completedSelectedRides, 'rides to send');

    createInvoice({
      companyName: company,
      taxpayerNumber: taxpayer,
      ridesId: completedSelectedRides,
    })
      .then(() => {
        // change tab
        toggleTab('', tabNames.Invoices);

        setCreating(false);
        toggleModal();
      })
      .catch((error) => {
        setCreating(false);
        setErrorMsg(error.message);

        console.log(error.message);
      });
  };

  const toggleModal = () => setOpen((prev) => !prev);

  const handleClose = () => {
    setCompany('');
    setTaxpayer('');
    toggleModal();
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
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Please complete the fields
                  </Typography>

                  <div>
                    <TextField
                      fullWidth
                      required
                      id="companyName"
                      label="Company Name"
                      margin="normal"
                      onChange={(e) => setCompany(e.target.value)}
                      value={company}
                    />
                  </div>

                  <div>
                    <TextField
                      fullWidth
                      required
                      id="Taxpayer Number"
                      label="Taxpayer Number"
                      margin="normal"
                      onChange={(e) => setTaxpayer(e.target.value)}
                      value={taxpayer}
                    />
                  </div>

                  <Box marginTop="10">
                    <Button
                      disabled={creating}
                      fullWidth
                      variant="contained"
                      color="info"
                      onClick={handleProcessInvoices}
                    >
                      Create Invoices
                    </Button>
                  </Box>
                </Box>
              </Modal>

              <div style={{ width: '100%' }}>
                <div style={{ padding: '20px' }}>
                  <Typography id="modal-modal-title">
                    Select one or more COMPLETED rides to start generating
                    invoices
                  </Typography>
                </div>

                {(pickAll || rows.some((ride) => ride.selected === true)) && (
                  <div style={{ padding: '20px' }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={toggleModal}
                    >
                      Create Invoice
                    </Button>
                  </div>
                )}

                {Boolean(errorMsg) && (
                  <div>
                    <Alert severity="error">{errorMsg}</Alert>
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
                        <TableCell>Passenger ID</TableCell>
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
                              {row.status === 'COMPLETED' ? (
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
                              ) : null}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {new Date(row.date).toLocaleString()}
                            </TableCell>

                            <TableCell component="th" scope="row">
                              {row.passengerId}
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
