import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import { colors } from '../../theme'

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import SecurityIcon from '@material-ui/icons/Security';
import DescriptionIcon from '@material-ui/icons/Description';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import ForumIcon from '@material-ui/icons/Forum';
import BarChartIcon from '@material-ui/icons/BarChart';
import BuildIcon from '@material-ui/icons/Build';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import OpacityIcon from '@material-ui/icons/Opacity';
import Store from "../../stores";
const store = Store.store

const styles = theme => ({
  footer: {
    padding: '48px',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    background: colors.almostBlack,
    marginTop: '48px',
    flexWrap: 'wrap',
    borderTop: '1px solid '+colors.borderBlue,
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
      flexDirection: 'column'
    }
  },
  heading: {
    marginBottom: '12px',
    paddingBottom: '9px',
    borderBottom: "3px solid "+colors.borderBlue,
    width: 'fit-content',
    marginLeft: '30px'
  },
  link: {
    paddingBottom: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  icon: {
    fill: colors.borderBlue,
    marginRight: '6px'
  },
  yearnIcon: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  builtWith:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  builtWithLink: {
    paddingTop: '12px'
  },
  builtHeading: {
    marginBottom: '12px',
    paddingBottom: '9px',
    borderBottom: "3px solid "+colors.borderBlue,
    width: 'fit-content',
  },
  products: {
    padding: '0px 22px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '24px'
    }
  },
  community: {
    padding: '0px 24px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '24px'
    }
  },
  socials: {
    padding: '0px 24px'
  }
});


class Footer extends Component {

  constructor(props) {
    super()
  }

  render() {
    const { classes, t, location } = this.props;

    return (
      <div className={classes.footer}>
          <div  className={ classes.link } onClick={()=> window.open("https://liquidity.relay3r.network/", "_blank")} >
          <OpacityIcon className={ classes.icon }/>
            <Typography variant={ 'h4'} >Liquidity Rewards</Typography>
          </div>
          <div  className={ classes.link } onClick={()=> window.open("https://t.me/relay3r", "_blank")} >
            <TelegramIcon className={ classes.icon }/>
            <Typography variant={ 'h5'} >Telegram</Typography>
          </div>
          <div  className={ classes.link } onClick={()=> window.open("https://discord.gg/UAnFfAexQ6", "_blank")} >
          <img alt="" src={ require('../../assets/discord.svg') } height='24px' className={ classes.icon } />
          <Typography variant={ 'h5'} >Discord</Typography>
          </div>
          <div  className={ classes.link } onClick={()=> window.open("https://twitter.com/RelayerNetwork", "_blank")} >
          <TwitterIcon className={ classes.icon }/>
          <Typography variant={ 'h5'} >Twitter</Typography>
          </div>
          <div  className={ classes.link } onClick={()=> window.open("https://docs.relay3r.network/", "_blank")} >
            <DescriptionIcon height='15px' className={ classes.icon } />
            <Typography variant={ 'h4'} >docs.relay3r.network</Typography>
          </div>
          <div  className={ classes.link } onClick={()=> window.open("https://github.com/relay3r-network", "_blank")} >
            <img alt="" src={ require('../../assets/github.svg') } height='24px' className={ classes.icon } />
            <Typography variant={ 'h4'} >relay3r-network</Typography>
          </div>
          {/* <div  className={ classes.link } onClick={()=> window.open("https://docs.relay3r.network/registry", "_blank")} >
            <DescriptionIcon height='15px' className={ classes.icon } />
            <Typography variant={ 'h4'} >registry</Typography>
          </div> */}
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Footer));
