import React, { Component } from "react";
import * as moment from 'moment';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
  Tooltip,
  Fab,
  MenuItem
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Store from "../../stores";
import { colors } from '../../theme'

import {
  ETHERSCAN_URL,
  ADDRESS,
  ERROR,
  CONNECTION_CONNECTED,
  START_LOADING,
  STOP_LOADING,
  GET_JOB_PROFILE,
  JOB_PROFILE_RETURNED,
  GET_BALANCES,
  BALANCES_RETURNED,
  ADD_LIQUIDITY_TO_JOB,
  ADD_LIQUIDITY_TO_JOB_RETURNED,
  REMOVE_LIQUIDITY_FROM_JOB,
  REMOVE_LIQUIDITY_FROM_JOB_RETURNED,
  APPLY_CREDIT_TO_JOB,
  APPLY_CREDIT_TO_JOB_RETURNED,
  UNBOND_LIQUIDITY_FROM_JOB,
  UNBOND_LIQUIDITY_FROM_JOB_RETURNED,
  // ADD_CREDITS,
  ADD_CREDITS_RETURNED,
  GET_GOVERNANCE_ADDRESS_RETURNED,
  GET_GOVERNANCE_ADDRESS,
  GET_KEEPER,
  KEEPER_RETURNED,
  GET_LIQUIDITY_PAIRS,
  LIQUIDITY_PAIRS_RETURNED,
  GET_JOB_BOND_UNBOND,
  JOB_BOND_UNBOND_RETURNED
} from '../../constants'
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
// import KeeperAssetDialog from "./KeeperAssetDialog";
import JobRefillDialog from "./JobRefillDialog";
import Web3 from "web3";

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  intro: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '900px'
  },
  topButton: {
    width: '100px',
    marginBottom: '24px',
  },
  disclaimer: {
    padding: '12px',
    // border: '1px solid rgb(174, 174, 174)',
    // borderRadius: '10px',
    marginBottom: '24px',
    background: colors.almostBlack,
  },
  JobContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '28px 30px',
    borderRadius: '10px',
    minWidth: '900px',
    border: '1px solid '+colors.borderBlue,
    margin: '20px',
    // background: colors.almostBlack,
  },
  liquidityContainer: {
    display: 'flex',
    width: '100%'
  },
  between: {
    width: '40px'
  },
  field: {
    paddingBottom: '20px',
    flex: '1'
  },
  fieldTitle: {
    paddingLeft: '20px'
  },
  titleInput: {
    borderRadius: '25px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },

  inputContainer: {
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  balance: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 1,
    right: '8px',
    top: '2px',
    letterSpacing: '0.1rem',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  textField: {
    flex: 1,
    width: '100%',
    marginBottom: '19px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '6px',
    }
  },
  titleHeading: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '52px',
    alignItems: 'center',
  },
  title: {
    cursor: 'pointer',
    display: 'inline-block',
    float: 'left',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  subTitle: {
    width: '100%',
    color: colors.lightGray,
  },
  stateNeutral: {
    border: '2px solid '+colors.lightGray,
    padding: '12px 24px',
    borderRadius: '10px',
    color: colors.lightGray+' !important',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },
  stateSuccess: {
    border: '2px solid '+colors.progressGreen,
    padding: '12px 24px',
    borderRadius: '10px',
    color: colors.progressGreen+' !important',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },
  stateFail: {
    border: '2px solid '+colors.progressRed,
    padding: '12px 24px',
    borderRadius: '10px',
    color: colors.progressRed+' !important',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center'
  },
  statusIconGreen: {
    fontSize: '20px',
    color: colors.progressGreen,
    marginLeft: '6px'
  },
  statusIconRed: {
    fontSize: '20px',
    color: colors.progressRed,
    marginLeft: '6px'
  },
  statusIconNeutral: {
    fontSize: '20px',
    color: colors.lightGray,
    marginLeft: '6px'
  },
  stakeButton: {
    width: '100%'
  },
  note: {
    fontSize: '12px',
    marginBottom: '24px'
  },
  notJobContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100px'
  },
  notJobInfo: {
    marginBottom: '12px'
  },
  jobMetadata: {
    minWidth: '100%',
    marginBottom: '40px',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gray: {
    color: colors.darkGray
  },
  textColorSecondary: {
    color: colors.lightGray
  },
  textColor: {
    color: colors.text
  },
  jobInfo: {
    marginBottom: '12px'
  },
  documentationPreview: {
    minWidth: '100%',
  },
  jobPreviewContainer: {
    width: '100%',
    marginTop: '24px'
  },
  assetSelectMenu: {
    display: 'flex',
    alignItems: 'center'
  },
  assetSelectIcon: {
    marginRight: '6px',
    display: 'flex'
  }
})

const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Job extends Component {

  constructor(props) {
    super()

    this.getJobAddress = () => {
      return (props && props.match && props.match.params && props.match.params.address) ? props.match.params.address : null
    }
    let jobAddress = this.getJobAddress();

    if(!jobAddress) {
      props.history.push('/relay3r/')
    }

    dispatcher.dispatch({ type: GET_JOB_PROFILE, content: { address: jobAddress } })
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })

    const account = store.getStore('account')
    const keeperAsset = store.getStore('keeperAsset')
    const liquidityPairs = store.getStore('liquidityPairs')
    const selectedLiquidityPair = liquidityPairs.length > 0 ? liquidityPairs[0] : null

    this.state = {
      loading: false,
      account: account,
      keeperAsset: keeperAsset,
      liquidityPairs: liquidityPairs,
      liquidityPair: selectedLiquidityPair ? selectedLiquidityPair.symbol : '',
      selectedLiquidityPair: selectedLiquidityPair,
      addLiquidityAmount: '',
      addLiquidityAmountError: false,
      job: {},
      addCreditsOpen: false,
      unbondLiquidityAmount: '',
      unbondLiquidityAmountError: false
    }

    this.loadData();
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(BALANCES_RETURNED, this.balancesReturned)
    emitter.on(JOB_PROFILE_RETURNED, this.jobProfileReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(ADD_LIQUIDITY_TO_JOB_RETURNED, this.addLiquidityToJobReturned)
    emitter.on(REMOVE_LIQUIDITY_FROM_JOB_RETURNED, this.removeLiquidityFromJobReturned)
    emitter.on(APPLY_CREDIT_TO_JOB_RETURNED, this.applyCreditToJobReturned)
    emitter.on(UNBOND_LIQUIDITY_FROM_JOB_RETURNED, this.unbondLiquidityFromJobReturned)
    emitter.on(ADD_CREDITS_RETURNED, this.reloadJobProfile);
    emitter.on(GET_GOVERNANCE_ADDRESS_RETURNED, this.governanceAddressReturned)
    emitter.on(KEEPER_RETURNED, this.keeperProfileReturned)
    emitter.on(LIQUIDITY_PAIRS_RETURNED, this.liquidityPairsReturned)
    emitter.on(JOB_BOND_UNBOND_RETURNED, this.jobBondUnbondReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(BALANCES_RETURNED, this.balancesReturned)
    emitter.removeListener(JOB_PROFILE_RETURNED, this.jobProfileReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(ADD_LIQUIDITY_TO_JOB_RETURNED, this.addLiquidityToJobReturned)
    emitter.removeListener(REMOVE_LIQUIDITY_FROM_JOB_RETURNED, this.removeLiquidityFromJobReturned)
    emitter.removeListener(APPLY_CREDIT_TO_JOB_RETURNED, this.applyCreditToJobReturned)
    emitter.removeListener(UNBOND_LIQUIDITY_FROM_JOB_RETURNED, this.unbondLiquidityFromJobReturned)
    emitter.removeListener(ADD_CREDITS_RETURNED, this.reloadJobProfile);
    emitter.removeListener(GET_GOVERNANCE_ADDRESS_RETURNED, this.governanceAddressReturned)
    emitter.removeListener(KEEPER_RETURNED, this.keeperProfileReturned)
    emitter.removeListener(LIQUIDITY_PAIRS_RETURNED, this.liquidityPairsReturned)
    emitter.removeListener(JOB_BOND_UNBOND_RETURNED, this.jobBondUnbondReturned)
  };

  jobBondUnbondReturned = (jobProfile) => {
    this.setState({ job: jobProfile })
  }

  liquidityPairsReturned = () => {
    const liquidityPairs = store.getStore('liquidityPairs')
    const selectedLiquidityPair = liquidityPairs.length > 0 ? liquidityPairs[0] : null
    this.setState({
      loading: false,
      liquidityPairs: liquidityPairs,
      liquidityPair: selectedLiquidityPair ? selectedLiquidityPair.symbol : '',
      selectedLiquidityPair: selectedLiquidityPair
    })
    emitter.emit(STOP_LOADING, GET_LIQUIDITY_PAIRS)

    let jobAddress = (this.props && this.props.match && this.props.match.params && this.props.match.params.address) ? this.props.match.params.address : null
    dispatcher.dispatch({ type: GET_JOB_BOND_UNBOND, content: { address: jobAddress } })
  }

  connectionConnected = () => {
    const account = store.getStore('account')
    const keeperAsset = store.getStore('keeperAsset')
    this.setState({account, keeperAsset});
    this.loadData();
  }

  loadData = () =>{
    emitter.emit(START_LOADING, GET_JOB_PROFILE)
    emitter.emit(START_LOADING, GET_KEEPER)
    emitter.emit(START_LOADING, GET_LIQUIDITY_PAIRS)

    let jobAddress = this.getJobAddress();

    dispatcher.dispatch({ type: GET_JOB_PROFILE, content: { address: jobAddress } })
    dispatcher.dispatch({ type: GET_GOVERNANCE_ADDRESS, content: {} })
    dispatcher.dispatch({ type: GET_BALANCES, content: {} })
    dispatcher.dispatch({ type: GET_KEEPER, content: {} })
    dispatcher.dispatch({ type: GET_LIQUIDITY_PAIRS, content: {} })
  }

  errorReturned = (source) => {
    emitter.emit(STOP_LOADING, source)
    this.setState({ loading: false })
  };

  balancesReturned = () => {
    this.setState({ keeperAsset: store.getStore('keeperAsset') })
  }

  keeperProfileReturned = () => {
    emitter.emit(STOP_LOADING, GET_KEEPER)

    this.setState({
      keeperAsset: store.getStore('keeperAsset'),
      loading: false
    })
  }

  jobProfileReturned = (jobProfile) => {
    emitter.emit(STOP_LOADING, GET_JOB_PROFILE)
    this.setState({ job: jobProfile })

    dispatcher.dispatch({ type: GET_JOB_BOND_UNBOND, content: { address: jobProfile.address } })
  }

  addLiquidityToJobReturned = () => {
    this.setState({ loading: false, addLiquidityAmount: '' })
    emitter.emit(STOP_LOADING, ADD_LIQUIDITY_TO_JOB)
  }

  removeLiquidityFromJobReturned = () => {
    this.setState({ loading: false })
    emitter.emit(STOP_LOADING, REMOVE_LIQUIDITY_FROM_JOB)
  }

  applyCreditToJobReturned = () => {
    this.setState({ loading: false })
    emitter.emit(STOP_LOADING, APPLY_CREDIT_TO_JOB)
  }

  unbondLiquidityFromJobReturned = () => {
    this.setState({ loading: false, unbondLiquidityAmount: '' })
    emitter.emit(STOP_LOADING, UNBOND_LIQUIDITY_FROM_JOB)
  }

  reloadJobProfile = () => {
    const {job} = this.state
    emitter.emit(START_LOADING, GET_JOB_PROFILE);
    dispatcher.dispatch({ type: GET_JOB_PROFILE, content: { address: job.address } })
  }

  governanceAddressReturned = (address) => {
    this.setState({governance: address})
  }

  copyAddressToClipboard = (event, address) => {
    event.stopPropagation();
    navigator.clipboard.writeText(address).then(() => {
      //show copied
    });
  };

  isOwner = () => {
    return this.state.job.owner === this.state.account;
  }

  canRefill = () => {
    const {address} = this.state.account;
    const govAddress = this.state.governance;
    if (address && govAddress){
      return Web3.utils.toChecksumAddress(address) === Web3.utils.toChecksumAddress(govAddress);
    }
    return false;
  }

  isJob = () => {
    return this.state.job && this.state.job.isJob;
  }

  render() {
    const { classes } = this.props;
    const {
      selectedLiquidityPair,
      keeperAsset,
      job,
      loading,
      addLiquidityAmount,
      addLiquidityAmountError,
      unbondLiquidityAmount,
      unbondLiquidityAmountError
    } = this.state
    let state = 'Inactive'
    let stateClass = classes.stateNeutral

    if(job.isJob) {
      state = 'Active'
      stateClass = classes.stateSuccess
    }

    let pendingLiquidityBonds = 0
    let pendingLiquidityUnbonds = 0
    let liquidityProvided = 0
    let pendingLiquidityBondsTime = 0
    let pendingLiquidityUnbondsTime = 0

    if(selectedLiquidityPair && job.bondUnbondPairs) {
      const sp = job.bondUnbondPairs.filter((p) => {
        return p.symbol === selectedLiquidityPair.symbol
      })

      if(sp && sp.length > 0) {
        pendingLiquidityBonds = sp[0].bonds
        pendingLiquidityUnbonds = sp[0].unbonds
        liquidityProvided = sp[0].provided
        pendingLiquidityBondsTime = sp[0].bondsActivatable
        pendingLiquidityUnbondsTime = sp[0].unbondsRemovable
      }
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.intro }>
          <div className={ classes.topButton }>
            <Tooltip title="Back" aria-label="add">
                  <Fab
                    size="medium"
                    disabled={ loading }
                    color="secondary"
                    onClick={ () => {  this.props.history.push('/relay3r') } }
                    aria-label="Back"
                  >
                    <KeyboardBackspaceIcon />
                  </Fab>
              </Tooltip>
          </div>
          <div></div>
          <div className={ classes.topButton }>
          </div>
        </div>
        <div className={ classes.JobContainer }>
          <div className={ classes.titleHeading }>
            <div>
              <Typography variant='h3' className={ classes.title } onClick={ () => { this.navigateEtherscan(job.address) } }>{ (job && job.address) ? job.address : 'N/A' }</Typography>
              <Tooltip title="Copy job addr" aria-label="jobaddrcopy">
              <Button size="small" width="5%" height="5%"onClick={(e) => { this.copyAddressToClipboard(e, job.address) } }><FileCopyIcon/></Button>
              </Tooltip>
              <Typography variant='h4' className={ classes.subTitle }> { (job && job.isJob ? ( job._name ? job._name : 'Job found') : 'Job not available') } </Typography>
            </div>
            <div>
              { job &&
                <Typography variant={ 'h5' } className={ stateClass }>{ state }
                  { state === 'Active' && <ThumbUpIcon className={ classes.statusIconGreen } /> }
                  { state === 'Inactive' && <CloseIcon className={ classes.statusIconNeutral } /> }
                </Typography>
              }
            </div>
          </div>

          {
            job && !job.isJob &&
            <div className={ classes.notJobContainer }>
              <Typography variant='h4' className={ classes.notJobInfo }>This address is not activated as a job</Typography>
              <Button
                variant="outlined"
                color="secondary"
                disabled={ loading }
                onClick={ () => { this.onAddJob() } }
              >
                <Typography variant={ 'h4'}>Add Job</Typography>
              </Button>
            </div>
          }
          {
            job && job.isJob &&
            <div className={ classes.jobMetadata }>
              <div className={ classes.jobInfo }>
                <Typography variant='h4'>{ job._added ? moment(job._added*1000).format("YYYY/MM/DD kk:mm") : 'Not set' }</Typography>
                <Typography variant='h4' className={ classes.textColorSecondary }>Job Added</Typography>
              </div>
              <div className={ classes.jobInfo }>
                <Typography variant='h4' className={ classes.textColorSecondary }>Total Credits</Typography>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography variant='h4'>
                    { job.credits ? job.credits.toFixed(2) : '0.00' } { keeperAsset ? keeperAsset.symbol : '' }
                  </Typography>
                  {
                    this.isJob() && this.canRefill() && (
                        <>
                          <IconButton style={{padding: 8}} onClick={this.onAddCredits}>
                            <AddCircleOutlineIcon/>
                          </IconButton>
                          <JobRefillDialog job={job} open={this.state.addCreditsOpen} closeModal={() => this.setState({addCreditsOpen: false})}/>
                        </>
                    )
                  }
                </Box>
              </div>
            </div>
          }
          {
            job && job.isJob &&
            <div className={ classes.jobMetadata }>
              <div className={ classes.jobInfo }>
                <Typography variant='h4'>{ pendingLiquidityBonds } { selectedLiquidityPair ? selectedLiquidityPair.symbol : '' }</Typography>
                { (pendingLiquidityBondsTime > 0) && <Typography variant='h4'>{ moment(pendingLiquidityBondsTime*1000).format("YYYY/MM/DD kk:mm") }</Typography> }
                <Typography variant='h4' className={ classes.textColorSecondary }>Pending Bonds</Typography>
              </div>
              <div className={ classes.jobInfo }>
                <Typography variant='h4'>{ pendingLiquidityUnbonds } { selectedLiquidityPair ? selectedLiquidityPair.symbol : '' }</Typography>
                { (pendingLiquidityUnbondsTime > 0) && <Typography variant='h4'>{ moment(pendingLiquidityUnbondsTime*1000).format("YYYY/MM/DD kk:mm") }</Typography> }
                <Typography variant='h4' className={ classes.textColorSecondary }>Pending Unbonds</Typography>
              </div>
            </div>
          }
          {
            job && job.isJob &&
            <div className={ classes.liquidityContainer }>
              <div className={ classes.field }>
                <div className={ classes.inputContainer }>
                  <Typography variant='h6' className={ classes.balance } onClick={ () => { this.maxClicked('addLiquidityAmount') } }>{ selectedLiquidityPair ? selectedLiquidityPair.balance.toFixed(4) : '0.0000' }{" LP"}</Typography>
                  <TextField
                    fullwidth
                    disabled={ loading }
                    id='addLiquidityAmount'
                    color='primary'
                    className={ classes.textField }
                    label='Provide liquidity'
                    value={ addLiquidityAmount }
                    error={ addLiquidityAmountError }
                    onChange={ this.onAmountChange }
                    InputProps={{
                      className: classes.inputField,
                      startAdornment: this.renderAssetSelect()
                    }}
                  />
                </div>
                <div className={ classes.buttonContainer}>
                  <Button
                    className={ classes.stakeButton }
                    variant="outlined"
                    color="secondary"
                    disabled={ loading }
                    onClick={ () => { this.onAddLiquidity() } }
                  >
                    Provide Liquidity
                  </Button>
                </div>
              </div>
              <div className={ classes.between }>

              </div>
              <div className={ classes.field }>
                <div className={ classes.inputContainer }>
                  <Typography variant='h6' className={ classes.balance } onClick={ () => { this.maxClicked('unbondLiquidityAmount') } }>{ liquidityProvided } { selectedLiquidityPair ? 'LP' : '' }</Typography>
                  <TextField
                    fullwidth
                    disabled={ loading }
                    id='unbondLiquidityAmount'
                    color='primary'
                    className={ classes.textField }
                    label='Unbond liquidity'
                    value={ unbondLiquidityAmount }
                    error={ unbondLiquidityAmountError }
                    onChange={ this.onAmountChange }
                    InputProps={{
                      className: classes.inputField,
                      startAdornment: this.renderAssetSelect()
                    }}
                  />
                </div>
                <div className={ classes.buttonContainer}>
                  <Button
                    className={ classes.stakeButton }
                    variant="outlined"
                    color="secondary"
                    disabled={ loading }
                    onClick={ () => { this.onUnbondLiquidity() } }
                  >
                    Unbond Liquidity
                  </Button>
                </div>
              </div>
            </div>
          }
          {
            job && job.isJob &&
            <div className={ classes.liquidityContainer }>
              <div className={ classes.field }>
                <div className={ classes.buttonContainer}>
                  <Button
                    className={ classes.stakeButton }
                    variant="outlined"
                    color="secondary"
                    disabled={ loading }
                    onClick={ () => { this.onApplyCredit() } }
                  >
                    Apply Credit
                  </Button>
                </div>
              </div>
              <div className={ classes.between }>

              </div>
              <div className={ classes.field }>
                <div className={ classes.buttonContainer}>
                  <Button
                    className={ classes.stakeButton }
                    variant="outlined"
                    color="secondary"
                    disabled={ loading }
                    onClick={ () => { this.onRemoveLiquidity() } }
                  >
                  Remove Liquidity
                  </Button>
                </div>
              </div>
            </div>
          }
          { job && job.isJob &&
            this.renderJobPreview()
          }
        </div>
      </div>
    )
  }

  renderJobPreview = () => {
    const {
      job,
    } = this.state

    const {
      classes
    } = this.props

    if(job._docs) {
      return (<div className={ classes.jobPreviewContainer }>
          <div className={ classes.jobInfo }>
            <Typography variant='h4'><a href={job._docs} target='_blank' rel="noopener noreferrer" className={ classes.textColor }>{ job._docs ? job._docs : 'Not set' }</a></Typography>
            <Typography variant='h4' className={ classes.textColorSecondary }>Documentation</Typography>
          </div>
          { job.fileContent &&
            <TextField
              value={ job.fileContent }
              multiline
              fullWidth
              variant='outlined'
            />
          }
        </div>)
    } else {
      return null
    }
  }


  renderAssetSelect = () => {
    const { loading, liquidityPairs, liquidityPair } = this.state
    const { classes } = this.props

    return (
      <TextField
        id={ 'liquidityPair' }
        name={ 'liquidityPair' }
        select
        value={ liquidityPair }
        onChange={ this.onAssetSelectChange }
        SelectProps={{
          native: false,
        }}
        fullWidth
        disabled={ loading }
        placeholder={ 'Select' }
        className={ classes.assetSelectRoot }
      >
        { liquidityPairs ? liquidityPairs.map(this.renderAssetOption) : null }
      </TextField>
    )
  }

  renderAssetOption = (option) => {
    const { classes } = this.props

    return (
      <MenuItem key={option.symbol} value={option.symbol} className={ classes.assetSelectMenu }>
        <div className={ classes.assetSelectIcon }>
          <img
            alt=""
            src={ this.getLogoForAsset(option) }
            height="30px"
          />
        </div>
        <div className={ classes.assetSelectIconName }>
          <Typography variant='h4'>{ option.symbol }</Typography>
        </div>
      </MenuItem>
    )
  }

  getLogoForAsset = (asset) => {
    try {
      return require('../../assets/tokens/'+asset.symbol+'-logo.png')
    } catch {
      return require('../../assets/tokens/unknown-logo.png')
    }
  }

  onAssetSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)

    const thePair = this.state.liquidityPairs.filter((pair) => {
      return pair.symbol === event.target.value
    })

    this.setState({
      selectedLiquidityPair: thePair[0]
    })
  }

  navigateEtherscan = (address) => {
    window.open(ETHERSCAN_URL+ADDRESS+address)
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  onAmountChange = (event) => {
    if(event.target.value !== '' && isNaN(event.target.value)) {
      return false
    }

    const { job, selectedLiquidityPair } = this.state
    if(event.target.id === 'addLiquidityAmount' && event.target.value > selectedLiquidityPair.balance) {
      event.target.value = selectedLiquidityPair.balance.toString()
    }
    if(event.target.id === 'removeLiquidityAmount' && event.target.value > job.unbonds) {
      event.target.value = job.unbonds.toString()
    }
    if(event.target.id === 'unbondLiquidityAmount' && event.target.value > job.bonds) {

      let liquidityProvided = 0

      if(selectedLiquidityPair && job.bondUnbondPairs) {
        const sp = job.bondUnbondPairs.filter((p) => {
          return p.symbol === selectedLiquidityPair.symbol
        })

        if(sp && sp.length > 0) {
          liquidityProvided = sp[0].provided
        }
      }

      event.target.value = liquidityProvided.toString()
    }

    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  maxClicked = (type) => {
    const {
      job,
      selectedLiquidityPair
    } = this.state

    switch (type) {
      case 'addLiquidityAmount':
        this.setState({ addLiquidityAmount: selectedLiquidityPair ? selectedLiquidityPair.balance.toString() : '' })
        break;
      case 'removeLiquidityAmount':
        this.setState({ removeLiquidityAmount: job.unbonds.toString() })
        break;
      case 'unbondLiquidityAmount':

        let liquidityProvided = 0

        if(selectedLiquidityPair && job.bondUnbondPairs) {
          const sp = job.bondUnbondPairs.filter((p) => {
            return p.symbol === selectedLiquidityPair.symbol
          })

          if(sp && sp.length > 0) {
            liquidityProvided = sp[0].provided
          }
        }

        this.setState({ unbondLiquidityAmount: liquidityProvided.toString() })
        break;
      default:
    }
  }

  onAddJob = () => {
    this.props.history.push('/relay3r/job')
  }

  onAddLiquidity = () => {
    this.setState({ addressError: false, addLiquidityAmountError: false })
    const { job, addLiquidityAmount, selectedLiquidityPair } = this.state

    let error = false

    if(!addLiquidityAmount || addLiquidityAmount === '') {
      this.setState({ addLiquidityAmountError: 'Liquidity amount is required' })
      error = true
    }

    if(!selectedLiquidityPair) {
      error = true
    }

    if(!error) {
      emitter.emit(START_LOADING, ADD_LIQUIDITY_TO_JOB)
      this.setState({ loading: true })
      dispatcher.dispatch({ type: ADD_LIQUIDITY_TO_JOB, content: { address: job.address, addLiquidityAmount: addLiquidityAmount, selectedLiquidityPair: selectedLiquidityPair } })
    }
  }

  onRemoveLiquidity = () => {
    this.setState({ addressError: false })
    const { job, selectedLiquidityPair } = this.state

    let error = false

    if(!selectedLiquidityPair) {
      error = true
    }

    if(!error) {
      emitter.emit(START_LOADING, REMOVE_LIQUIDITY_FROM_JOB)
      this.setState({ loading: true })
      dispatcher.dispatch({ type: REMOVE_LIQUIDITY_FROM_JOB, content: { address: job.address, selectedLiquidityPair: selectedLiquidityPair  } })
    }
  }

  onApplyCredit = () => {
    const { job, selectedLiquidityPair } = this.state

    let error = false

    if(!selectedLiquidityPair) {
      error = true
    }

    if(!error) {
      emitter.emit(START_LOADING, APPLY_CREDIT_TO_JOB)
      this.setState({ loading: true })
      dispatcher.dispatch({ type: APPLY_CREDIT_TO_JOB, content: { address: job.address, selectedLiquidityPair: selectedLiquidityPair } })
    }
  }

  onUnbondLiquidity = () => {
    this.setState({ addressError: false, unbondLiquidityAmountError: false })
    const { job, unbondLiquidityAmount, selectedLiquidityPair } = this.state

    let error = false

    if(!unbondLiquidityAmount || unbondLiquidityAmount === '') {
      this.setState({ unbondLiquidityAmountError: 'Liquidity amount is required' })
      error = true
    }

    if(!selectedLiquidityPair) {
      error = true
    }

    if(!error) {
      emitter.emit(START_LOADING, UNBOND_LIQUIDITY_FROM_JOB)
      this.setState({ loading: true })
      dispatcher.dispatch({ type: UNBOND_LIQUIDITY_FROM_JOB, content: { address: job.address, unbondLiquidityAmount: unbondLiquidityAmount, selectedLiquidityPair: selectedLiquidityPair } })
    }
  }

  onAddCredits = () => {
    this.setState({addCreditsOpen: true});
  }


}

export default withRouter(withStyles(styles)(Job));
