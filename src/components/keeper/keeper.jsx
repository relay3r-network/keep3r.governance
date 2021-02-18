import React, { Component } from "react";
import * as moment from "moment";
import { withRouter } from "react-router-dom";
import Countdown from 'react-countdown';

import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import SearchIcon from '@material-ui/icons/Search';

import Store from "../../stores";
import { colors } from "../../theme";

import {
  ERROR,
  START_LOADING,
  STOP_LOADING,
  CONNECTION_CONNECTED,
  ACCOUNT_CHANGED,
  GET_CURRENT_BLOCK,
  GET_CHAIN_ID,
  CHAIN_ID_RETURNED,
  CURRENT_BLOCK_RETURNED,
  GET_KEEPER,
  KEEPER_RETURNED,
  GET_JOBS,
  JOBS_RETURNED,
  GET_KEEPERS,
  KEEPERS_RETURNED,
  ADD_BOND,
  ADD_BOND_RETURNED,
  REMOVE_BOND,
  REMOVE_BOND_RETURNED,
  ACTIVATE_BOND,
  ACTIVATE_BOND_RETURNED,
  WITHDRAW_BOND,
  WITHDRAW_BOND_RETURNED,
  SWAP_APPROVE,
  SWAP_EXECUTE,
  SWAP_APPROVE_RETURNED,
  SWAP_EXECUTE_RETURNED, TRANSFER_RIGHTS, TRANSFER_RIGHTS_RETURNED
} from '../../constants'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Web3 from "web3";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
  root: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "900px",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: "60px",
  },
  grid: {
    flexGrow: 1,
  },
  between: {
    width: "40px",
  },
  intro: {
    width: "100%",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "900px",
    marginBottom: "20px",
    // background: colors.white,
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "10px",
    },
  },
  topButton: {
    width: "160px",
    marginBottom: "24px",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90vw",
    },
  },
  disclaimer: {
    padding: "12px",
    border: "1px solid rgb(174, 174, 174)",
    borderRadius: "10px",
    marginBottom: "24px",
    background: colors.almostBlack,
    [theme.breakpoints.down("sm")]: {
      minWidth: "90vw",
    },
  },
  keeperLayout: {
    display: "flex",
    maxWidth: "1200px",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  profileContainer: {
    display: "flex",
    width: "300px",
    border: "1px solid " + colors.borderBlue,
    borderRadius: "10px",
    padding: "24px",
    marginRight: "20px",
    flexDirection: "column",
    background: colors.almostBlack,
    alignSelf: "flex-start",
    [theme.breakpoints.down("sm")]: {
      minWidth: "90vw",
      marginRight: "0px",
      marginBottom: "25px",
    },
  },
  valueContainer: {
    width: "100%",
    margin: "12px 0px",
    position: "relative",
  },
  valueTitle: {
    color: colors.lightGray,
    marginBottom: "6px",
  },
  valueValue: {},
  valueAction: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  valueActionBonds: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
  },
  valueActionBondsAction: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "100%",
  },
  jobsContainer: {
    display: "flex",
    flex: 1,
    // border: '1px solid '+colors.borderBlue,
    borderRadius: "10px",
    padding: "24px",
    marginLeft: "20px",
    flexDirection: "column",
    alignSelf: "flex-start",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0px",
      maxWidth: "90vw",
      marginBottom: "20px",
    },
    // background: colors.almostBlack,
  },
  cardActions: {
    // zIndex: 2,
    // display: 'flex',
    alignItems: "flex-start",
    justifyContent: "flex-end",
    // flexWrap: 'wrap',
    // padding: 0,
  },
  title: {
    width: "100%",
    // borderBottom: "1px solid " + colors.borderBlue,
    paddingBottom: "12px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: "40px",
  },
  inputContainer: {
    flex: 1,
    display: "flex",
    position: "relative",
  },
  balance: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    cursor: "pointer",
    position: "absolute",
    zIndex: 1,
    right: "8px",
    top: "2px",
    letterSpacing: "0.1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  textField: {
    flex: 1,
    width: "100%",
  },
  valueActionButtons: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },
  searchInputAdornment: {
    cursor: "pointer",
  },
  actionInput: {
    // background: colors.white
  },
  jobContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    // padding: "10px 0px",
    // marginBottom: "8px"
    // "&:hover": {
    //   background: colors.darkGray
    // },
  },
  gray: {
    color: colors.darkGray,
  },
  totalCredits: {
    textAlign: "right",
  },
});

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

class Keeper extends Component {
  constructor(props) {
    super();

    const account = store.getStore("account");
    const keeperAsset = store.getStore("keeperAsset");
    const jobs = store.getStore("jobs").filter((job) => {
      return job.credits > 0;
    });
    const now = store.getStore("currentBlock");

    this.state = {
      loading: true,
      account: account,
      keeperAsset: keeperAsset,
      jobs: jobs,
      bondAmount: "",
      bondAmountError: false,
      removeBondAmount: "",
      removeBondAmountError: false,
      currentBlock: now,
      approved:false,
      swapped:false,
      transferTo: "",
    };
    //First get chain id before any other data
    emitter.emit(START_LOADING, GET_CHAIN_ID);
    dispatcher.dispatch({ type: GET_CHAIN_ID, content: {} });
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(CHAIN_ID_RETURNED,this.chainIdReturned);
    emitter.on(KEEPER_RETURNED, this.keeperProfileReturned);
    emitter.on(JOBS_RETURNED, this.jobsReturned);
    emitter.on(KEEPERS_RETURNED, this.keepersReturned);
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.on(ACCOUNT_CHANGED, this.connectionConnected);
    emitter.on(ADD_BOND_RETURNED, this.addBondReturned);
    emitter.on(REMOVE_BOND_RETURNED, this.removeBondReturned);
    emitter.on(ACTIVATE_BOND_RETURNED, this.activateBondReturned);
    emitter.on(WITHDRAW_BOND_RETURNED, this.withdrawBondReturned);
    emitter.on(SWAP_APPROVE_RETURNED, this.swapApproveReturned);
    emitter.on(SWAP_EXECUTE_RETURNED, this.swapExecuteReturned);
    emitter.on(CURRENT_BLOCK_RETURNED, this.currentBlockReturned);
    emitter.on(TRANSFER_RIGHTS_RETURNED, this.transferRightsReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(KEEPER_RETURNED, this.keeperProfileReturned);
    emitter.removeListener(JOBS_RETURNED, this.jobsReturned);
    emitter.removeListener(KEEPERS_RETURNED, this.keepersReturned);
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected);
    emitter.removeListener(ACCOUNT_CHANGED, this.connectionConnected);
    emitter.removeListener(ADD_BOND_RETURNED, this.addBondReturned);
    emitter.removeListener(REMOVE_BOND_RETURNED, this.removeBondReturned);
    emitter.removeListener(ACTIVATE_BOND_RETURNED, this.activateBondReturned);
    emitter.removeListener(WITHDRAW_BOND_RETURNED, this.withdrawBondReturned);
    emitter.removeListener(CURRENT_BLOCK_RETURNED, this.currentBlockReturned);
    emitter.removeListener(TRANSFER_RIGHTS_RETURNED, this.transferRightsReturned)
    emitter.removeListener(CHAIN_ID_RETURNED, this.chainIdReturned)
  }

  connectionConnected = () => {
    emitter.emit(START_LOADING, GET_CHAIN_ID);
    emitter.emit(START_LOADING, GET_CURRENT_BLOCK);

    //Finally get the approval status
    dispatcher.dispatch({ type: GET_CHAIN_ID, content: {} });
    dispatcher.dispatch({ type: GET_CURRENT_BLOCK, content: {} });

  };

  errorReturned = (source) => {
    emitter.emit(STOP_LOADING, source);
    this.setState({ loading: false });
  };

  keeperProfileReturned = () => {
    emitter.emit(STOP_LOADING, GET_KEEPER)

    this.setState({
      keeperAsset: store.getStore("keeperAsset"),
      loading: false,
    });
  };

  chainIdReturned = () => {
    //Start loading and dispatch only if we got supported chainid
    emitter.emit(START_LOADING, GET_KEEPER);
    emitter.emit(START_LOADING, GET_JOBS);
    emitter.emit(START_LOADING, GET_KEEPERS);

    dispatcher.dispatch({ type: GET_KEEPER, content: {} });
    dispatcher.dispatch({ type: GET_JOBS, content: {} });
    dispatcher.dispatch({ type: GET_KEEPERS, content: {} });
  };

  jobsReturned = () => {
    emitter.emit(STOP_LOADING, GET_JOBS);
    this.setState({
      jobs: store.getStore("jobs").filter((job) => {
        return job.credits > 0;
      }),
    });
  };

  keepersReturned = () => {
    emitter.emit(STOP_LOADING, GET_CHAIN_ID)
    emitter.emit(STOP_LOADING, GET_KEEPERS);
    this.setState({ keepers: store.getStore("keepers") });
  };

  addBondReturned = () => {
    this.setState({
      loading: false,
      onBond: false,
    });
    emitter.emit(STOP_LOADING, ADD_BOND);
  };

  removeBondReturned = () => {
    this.setState({
      loading: false,
      onBondRemove: false,
    })
    emitter.emit(STOP_LOADING, REMOVE_BOND)
  }

  activateBondReturned = () => {
    this.setState({
      loading: false,
    });
    emitter.emit(STOP_LOADING, ACTIVATE_BOND_RETURNED);
  };

  withdrawBondReturned = () => {
    this.setState({
      loading: false,
    })
    emitter.emit(STOP_LOADING, WITHDRAW_BOND)
  }

  swapApproveReturned = () => {
    this.setState({
      loading: false,
      approved:true
    })
    emitter.emit(STOP_LOADING, SWAP_APPROVE)
  }

  swapExecuteReturned = () => {
    this.setState({
      loading: false,
      swapped:true
    })
    emitter.emit(STOP_LOADING, SWAP_EXECUTE)
  }

  currentBlockReturned = () => {
    emitter.emit(STOP_LOADING, GET_CURRENT_BLOCK);
    this.setState({ currentBlock: store.getStore("currentBlock") });
  };

  transferRightsReturned = () => {
    emitter.emit(STOP_LOADING, TRANSFER_RIGHTS);
  }

  render() {
    const { classes } = this.props;
    const {
      keeperAsset,
      onBond,
      onBondRemove,
      loading
    } = this.state

    // var delegates = 'Self';
    // if (keeperAsset.delegates && keeperAsset.delegates !== '0x0000000000000000000000000000000000000000') {
    //   delegates = keeperAsset.delegates.substring(0,6)+'...'+keeperAsset.delegates.substring(keeperAsset.delegates.length-4,keeperAsset.delegates.length)
    // }

    return (
      <div className={ classes.root }>
        <div className={ classes.keeperLayout }>
          <Card className={ classes.profileContainer }>
            <Typography variant='h3' className={ classes.title }>Profile</Typography>
            <div className={ classes.valueContainer }>
              <Typography variant='h4' className={ classes.valueTitle }>Balance</Typography>
              <Typography variant='h3' className={ classes.valueValue }> { keeperAsset.balance ? keeperAsset.balance.toFixed(2) : '0.00' } { keeperAsset.symbol } </Typography>
            </div>
            <div className={classes.valueContainer}>
              <Typography variant="h4" className={classes.valueTitle}>
                Bonds
              </Typography>
              {!onBond && !onBondRemove && this.renderBond()}
              {onBond && this.renderBondAdd()}
              {onBondRemove && this.renderBondRemove()}
            </div>
            { this.renderPendingBonds() }
            { this.renderActivateBonds(loading) }
            { this.renderPendingUnbonds() }
            { this.renderWithdrawBonds() }
            { this.renderWorkCompleted() }
            { this.renderFirstSeen() }
            { this.renderTransferButton() }
            { this.renderSearch() }
            { this.renderSwap() }
          </Card>
          <Card className={classes.jobsContainer}>
            <CardHeader
              title={
                // <div className={classes.title}>
                <Typography variant="h3">Jobs</Typography>
              }
              action={
                <Tooltip title="Add Job" aria-label="add">
                  <Fab
                    color="primary"
                    size="medium"
                    onClick={this.onAddJob}
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              }
            ></CardHeader>
            <CardContent>
              <List component="nav" aria-label="main mailbox folders">
                {this.renderJobs()}
              </List>
            </CardContent>
            <CardActions className={classes.cardActions}>
              {/* <Button
                variant="contained"
                size="medium"
                color="primary"
                onClick={this.onAddJob}
              >
                Add
              </Button> */}
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }

  renderSearch = () => {
    const { classes } = this.props
    const { loading, searchKeeper, searchKeeperError } = this.state

    return (
      <div className={ classes.valueContainer }>
        <TextField
          fullWidth
          disabled={ loading }
          className={ classes.actionInput }
          id={ 'searchKeeper' }
          value={ searchKeeper }
          error={ searchKeeperError }
          onChange={ this.onSearchChange }
          label="Search relay3r"
          onKeyDown= { this.onSearchKeyDown }
          InputProps={{
            endAdornment: <InputAdornment position="end" className={ classes.searchInputAdornment } onClick={ this.onSearch }><SearchIcon /></InputAdornment>,
          }}
        />
      </div>
    )
  }

  renderSwap = () => {
    const { classes } = this.props
    const { approved,keeperAsset,loading} = this.state
    let timeRemaining = (moment(1605550155*1000) -  moment().valueOf() )/ 1000;
    if(keeperAsset.balanceRLRV2 >0 && timeRemaining <=0){
      return(
        <div className={ classes.valueContainer }>
          <Typography variant="h4" className={classes.valueTitle}>
                Swap to RelayerV3
            </Typography>
          <Button onClick={this.onSwapApprove} disabled={loading} variant="contained" color="primary" size="medium">Approve</Button>
          <Button onClick={this.onSwapExecute} disabled={loading} variant="contained" color="primary" size="medium">Swap</Button>
        </div>
      )
    }
    else if (keeperAsset.balanceRLRV2 >0 && timeRemaining >0){
      return (
        <div>
        <Typography variant="h4" className={classes.valueTitle}>
          Swap to RelayerV3
        </Typography>
        <Typography variant="h4" className={classes.valueTitle}>
          Time Remaining <Countdown date={1605550155*1000} />
        </Typography>
        </div>
      )
    }

  }

   removeDuplicates = (originalArray, prop) =>{
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
  }

  renderJobs = () => {
    const { classes } = this.props;
    var { jobs, keeperAsset } = this.state;
    jobs = this.removeDuplicates(jobs,"address");
    if (jobs.length === 0) {
      return (
        <div>
          <Typography variant="h4">There are no jobs</Typography>
        </div>
      );
    }

    return jobs.map((job) => {
      var address = null;
      if (job.address) {
        address =
          job.address.substring(0, 6) +
          "..." +
          job.address.substring(job.address.length - 4, job.address.length);
      }

      return (
        <ListItem
          alignItems="flex-start"
          button
          onClick={() => {
            this.navJob(job.address);
          }}
        >
          <ListItemText
            className={classes.jobContainer}
            key={job.address}
            primary={
              <React.Fragment>
                <div>
                  <Typography variant="h4">{job._name}</Typography>
                  <Typography
                    variant="h4"
                    className={classes.textColorSecondary}
                  >
                    {address}
                  </Typography>
                </div>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <div className={classes.totalCredits}>
                  <Typography
                    variant="h4"
                    className={classes.textColorSecondary}
                  >
                    Total Credits
                  </Typography>
                  <Typography variant="h4">
                    {job.credits ? job.credits.toFixed(2) : "0.00"}{" "}
                    {keeperAsset ? keeperAsset.symbol : ""}
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  };

  renderFirstSeen = () => {
    const { classes } = this.props
    const { keeperAsset } = this.state

    if(keeperAsset.isActive) {
      return (
        <React.Fragment>
          <div className={ classes.valueContainer }>
            <Typography variant='h4' className={ classes.valueTitle }>First Seen</Typography>
            <Typography variant='h3' className={ classes.valueValue }> { moment(keeperAsset.firstSeen*1000).format("YYYY/MM/DD kk:mm") }</Typography>
          </div>
          <div className={classes.valueContainer}>
            <Typography variant="h4" className={classes.valueTitle}>
              Last Job
            </Typography>
            <Typography variant="h3" className={classes.valueValue}>
              {" "}
              {moment(keeperAsset.lastJob * 1000).format("YYYY/MM/DD kk:mm")}
            </Typography>
          </div>
        </React.Fragment>
      )
    } else {
      return null
    }
  };

  renderTransferButton = () => {
    const { classes } = this.props
    const { keeperAsset,loading } = this.state
    const {transfertDialogOpen } = this.state
    const { transferTo } = this.state
    const openTransferDialog = () => {
      this.setState({
        transfertDialogOpen: true,
      });
    }

    const closeDialog = () => {
      this.setState({
        transfertDialogOpen: false,
        transferTo: "",
      });
    }

    const setTransferTo = (value) => {
      this.setState({
        transferTo: value,
      });
    }
    if(keeperAsset.isActive) {
      return (
          <React.Fragment>
            <div className={ classes.valueContainer }>
              <Typography variant='h4' className={ classes.valueTitle }>Transfer relayer rights</Typography>

              <Button color={"primary"} variant={"contained"} onClick={openTransferDialog}>Transfer</Button>

            </div>
            <Dialog onClose={closeDialog} aria-labelledby="transfer-relayer-rights-dialog-title" open={!!transfertDialogOpen}>
              <DialogTitle id="transfer-relayer-rights-dialog-title">Transfer your relayer rights</DialogTitle>
              <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="to"
                    label="To address"
                    disabled={loading}
                    fullWidth
                    value={transferTo}
                    onChange={e => setTransferTo(e.target.value)}
                    error={this.state.transferToError}
                    helperText={this.state.transferToError}
                    style={{width:500}}
                />
                <Box textAlign={"center"} my={2}>
                  <Button color="primary" variant="contained" size="small" disabled={loading} onClick={this.onTransfer}>
                    Transfer
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </React.Fragment>
      )
    } else {
      return null
    }

  }

  renderWorkCompleted = () => {
    const { classes } = this.props
    const { keeperAsset } = this.state

    return (
      <div className={ classes.valueContainer }>
        <Typography variant='h4' className={ classes.valueTitle }>Work Rewards</Typography>
        <Typography variant='h3' className={ classes.valueValue }>{ (keeperAsset.workCompleted ? keeperAsset.workCompleted.toFixed(4) : '0') + ` ${keeperAsset.symbol}` }</Typography>
      </div>
    )

  }

  renderBond = () => {
    const { classes } = this.props;
    const { keeperAsset } = this.state;

    return (
      <div className={classes.valueActionBonds}>
        <Typography variant="h3" className={classes.valueValue}>
          {" "}
          {keeperAsset.bonds ? keeperAsset.bonds.toFixed(2) : "0.00"}{" "}
          {keeperAsset.symbol}{" "}
        </Typography>
        <Grid container className={classes.grid} spacing={4}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Grid key={"bond"} item>
                <Button size="small" color="primary" onClick={this.onBondAdd}>
                  Bond
                </Button>
              </Grid>
              <Grid key={"unbond"} item>
                <Button size="small" color="primary" onClick={this.onBondRemove}>
                  Unbond
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  renderPendingBonds = () => {
    const { classes } = this.props;
    const { keeperAsset } = this.state;

    if(keeperAsset.isActive && keeperAsset.pendingBonds === 0) {
      return null
    } else if(parseInt(keeperAsset.bondings) - parseInt(keeperAsset.bondingDelay) > 0) {
      return (
        <div className={ classes.valueContainer }>
          <Typography variant='h4' className={ classes.valueTitle }>Bonds pending</Typography>
          <div className={ classes.valueAction }>
            <Typography variant='h3' className={ classes.valueValue }> { keeperAsset.pendingBonds ? keeperAsset.pendingBonds.toFixed(2) : '0.00' } { keeperAsset.symbol } </Typography>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderActivateBonds = (loading) => {
    const { classes } = this.props
    const {
      keeperAsset,
    } = this.state

    if(keeperAsset.isActive && keeperAsset.pendingBonds === 0) {
      return null
    } else if(parseInt(keeperAsset.bondings) - parseInt(keeperAsset.bondingDelay) > 0 && moment(keeperAsset.bondings*1000).valueOf() < moment().valueOf() && keeperAsset.pendingBonds) {
      return (
        <div className={ classes.valueContainer }>
          <Typography variant='h4' className={ classes.valueTitle }>Activate</Typography>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={ this.onActivate }
            disabled={loading}
          >
            Activate Bonds
          </Button>
        </div>
      )
    } else if (parseInt(keeperAsset.bondings) - parseInt(keeperAsset.bondingDelay) > 0 && keeperAsset.pendingBonds) {
      return (
        <div className={ classes.valueContainer }>
          <Typography variant='h4' className={ classes.valueTitle }>Activatable at</Typography>
          <div className={ classes.valueAction }>
            <Typography variant='h3' className={ classes.valueValue }> { moment(keeperAsset.bondings*1000).format("YYYY/MM/DD kk:mm") } </Typography>
          </div>
        </div>
      )
    }
  }

  renderPendingUnbonds = () => {
    const { classes } = this.props
    const {
      keeperAsset,
    } = this.state

    if(parseInt(keeperAsset.unbondings) - parseInt(keeperAsset.unbondingDelay) > 0 && keeperAsset.partialUnbonding) {
      return (
        <div className={ classes.valueContainer }>
          <Typography variant='h4' className={ classes.valueTitle }>Unbonds pending</Typography>
          <div className={ classes.valueAction }>
            <Typography variant='h3' className={ classes.valueValue }> { keeperAsset.partialUnbonding ? keeperAsset.partialUnbonding.toFixed(2) : '0.00' } { keeperAsset.symbol } </Typography>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  renderWithdrawBonds = () => {
    const { classes } = this.props
    const {
      keeperAsset,
    } = this.state

    if((parseInt(keeperAsset.unbondings) - parseInt(keeperAsset.unbondingDelay)) > 0 && moment(keeperAsset.unbondings*1000).valueOf() < moment().valueOf() && keeperAsset.partialUnbonding) {
      return (
        <div>
          <div className={ classes.valueActionButtons }>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={ this.onWithdraw }
            >
              withdraw
            </Button>
          </div>
        </div>
      )
    } else if ((parseInt(keeperAsset.unbondings) - parseInt(keeperAsset.unbondingDelay) ) >0 && keeperAsset.partialUnbonding) {
      return (
        <div className={ classes.valueContainer }>
          <Typography variant='h4' className={ classes.valueTitle }>Withdrawable at</Typography>
          <div className={ classes.valueAction }>
            <Typography variant='h3' className={ classes.valueValue }> { moment(keeperAsset.unbondings*1000).format("YYYY/MM/DD kk:mm") } </Typography>
          </div>
        </div>
      )
    }
  }

  renderBondAdd = () => {
    const { classes } = this.props;
    const { keeperAsset, bondAmount, bondAmountError, loading } = this.state;

    return (
      <div>
        <div className={classes.inputContainer}>
          <Typography
            variant="h6"
            className={classes.balance}
            onClick={() => {
              this.maxClicked("bond");
            }}
          >
            {keeperAsset.balance.toFixed(4)} {keeperAsset.symbol}
          </Typography>
          <TextField
            fullwidth
            disabled={loading}
            id="bondAmount"
            variant="outlined"
            color="primary"
            className={classes.textField}
            placeholder="Amount to bond"
            value={bondAmount}
            error={bondAmountError}
            onChange={this.onChange}
            InputProps={{
              className: classes.inputField,
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.inputAdornment}
                >
                  <img
                    src={require("../../assets/tokens/" + keeperAsset.logo)}
                    width="30px"
                    alt=""
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.valueActionButtons}>
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={this.onBondAddClose}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={this.onBond}
          >
            bond
          </Button>
        </div>
      </div>
    );
  };

  renderBondRemove = () => {
    const { classes } = this.props;
    const {
      keeperAsset,
      removeBondAmount,
      removeBondAmountError,
      loading,
    } = this.state;

    return (
      <div>
        <div className={ classes.inputContainer }>
          <Typography variant='h6' className={ classes.balance } onClick={ () => { this.maxClicked('bondRemove') } }>{ keeperAsset.bonds.toFixed(2)} { keeperAsset.symbol }</Typography>
          <TextField
            fullwidth
            disabled={loading}
            id="removeBondAmount"
            variant="outlined"
            color="primary"
            className={classes.textField}
            placeholder="Amount to unbond"
            value={removeBondAmount}
            error={removeBondAmountError}
            onChange={this.onChange}
            InputProps={{
              className: classes.inputField,
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.inputAdornment}
                >
                  <img
                    src={require("../../assets/tokens/" + keeperAsset.logo)}
                    width="30px"
                    alt=""
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.valueActionButtons}>
          <Button
            variant="text"
            size="small"
            color="primary"
            onClick={this.onBondRemoveClose}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={this.onCallBondRemove}
          >
            unbond
          </Button>
        </div>
      </div>
    );
  };

  maxClicked = (type) => {
    const { keeperAsset } = this.state;

    switch (type) {
      case "bond":
        this.setState({ bondAmount: keeperAsset.balance });
        break;
      case "bondRemove":
        this.setState({ removeBondAmount: keeperAsset.bonds});
        break;
      case 'bondWithdraw':
        this.setState({ withdrawBondAmount: keeperAsset.bonds })
        break;
      case 'swapTokens':
          this.setState({ swapAmount: keeperAsset.balance })
          break;
      default:
    }
  };

  onSearchChange = (event) => {
    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  onSearchKeyDown = (event) => {
    if (event.which === 13) {
      this.onSearch();
    }
  };

  onSearch = () => {
    this.setState({ searchKeeperError: false });
    const { searchKeeper } = this.state;

    let error = false;

    if (!searchKeeper || searchKeeper === "") {
      this.setState({ searchKeeperError: "Invalid" });
      error = true;
    }

    if (!error) {
      this.props.history.push("/relay3r/" + searchKeeper);
    }
  };

  onChange = (event) => {
    if (event.target.value !== "" && isNaN(event.target.value)) {
      return false;
    }

    const { keeperAsset } = this.state;
    if (
      event.target.id === "bondAmount" &&
      event.target.value > keeperAsset.balance
    ) {
      event.target.value = keeperAsset.balance;
    }
    if (
      event.target.id === "removeBondAmount" &&
      event.target.value > keeperAsset.bonds
    ) {
      event.target.value = keeperAsset.bonds;
    }

    let val = [];
    val[event.target.id] = event.target.value;
    this.setState(val);
  };

  onBond = () => {
    this.setState({ bondAmountError: false });
    const { keeperAsset, bondAmount } = this.state;

    let error = false;

    if (bondAmount > keeperAsset.balance) {
      error = true;
      this.setState({ bondAmountError: "Amount > balance" });
    }

    if (!error) {
      emitter.emit(START_LOADING, ADD_BOND);
      this.setState({ loading: true });
      dispatcher.dispatch({ type: ADD_BOND, content: { amount: bondAmount } });
    }
  };

  onWithdraw = () => {
      emitter.emit(START_LOADING, WITHDRAW_BOND);
      this.setState({ loading: true });
      dispatcher.dispatch({ type: WITHDRAW_BOND});
  };

  onSwapApprove = () => {
    let error = false;

    if (!error) {
      emitter.emit(START_LOADING, SWAP_APPROVE);
      this.setState({ loading: true });
      dispatcher.dispatch({ type: SWAP_APPROVE});
    }
  };

  onSwapExecute = () => {
    let error = false;

    if (!error) {
      emitter.emit(START_LOADING, SWAP_EXECUTE);
      this.setState({ loading: true });
      dispatcher.dispatch({ type: SWAP_EXECUTE});
    }
  };

  onCallBondRemove = () => {
    this.setState({ bondAmountError: false });
    const { keeperAsset, removeBondAmount } = this.state;

    let error = false;

    if(removeBondAmount > keeperAsset.bonds) {
      error = true
      this.setState({ removeBondAmountError: 'Amount > bonded balance' })
    }

    if (!error) {
      emitter.emit(START_LOADING, REMOVE_BOND);
      this.setState({ loading: true });
      dispatcher.dispatch({
        type: REMOVE_BOND,
        content: { amount: removeBondAmount },
      });
    }
  };

  onBondAdd = () => {
    this.setState({ onBond: true });
  };

  onBondAddClose = () => {
    this.setState({ onBond: false });
  };

  onBondRemove = () => {
    this.setState({ onBondRemove: true });
  };

  onBondRemoveClose = () => {
    this.setState({ onBondRemove: false });
  };

  onActivate = () => {
    emitter.emit(START_LOADING, ACTIVATE_BOND);
    this.setState({ loading: true });
    dispatcher.dispatch({ type: ACTIVATE_BOND, content: {} });
  };

  onAddJob = () => {
    this.props.history.push("/relay3r/job");
  };

  onTransfer = () => {
    let error = false;
    if (!Web3.utils.isAddress(this.state.transferTo)){
      error = true;
      this.setState({transferToError: "This is not a valid address"});
    }
    if (!error) {
      emitter.emit(START_LOADING, TRANSFER_RIGHTS);
      this.setState({ loading: true, transferToError: null });
      dispatcher.dispatch({ type: TRANSFER_RIGHTS, content: { to: this.state.transferTo } });
    }
  }

  navJob = (address) => {
    this.props.history.push("/relay3r/job/" + address);
  };
}

export default withRouter(withStyles(styles)(Keeper));
