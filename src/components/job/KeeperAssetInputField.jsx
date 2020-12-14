import React from 'react';
import {InputAdornment, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Store from "../../stores";

const store = Store.store

const styles = theme => ({
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
});

class KeeperAssetInputField extends React.Component{
    constructor(props) {
        super(props);
        const keeperAsset = store.getStore('keeperAsset')
        this.state = {
            keeperAsset,
            amount: "",
            error: ""
        }
    }

    render() {
        const { classes } = this.props;
        const {amount, error, keeperAsset} = this.state;
        return (
            <div className={ classes.inputContainer }>
                <Typography variant='h6' className={ classes.balance } onClick={this.maxClicked}>
                    { keeperAsset.balance.toFixed(4) } { keeperAsset.symbol }
                </Typography>
                <TextField
                    fullWidth
                    id='addLiquidityAmount'
                    variant='outlined'
                    color='primary'
                    className={ classes.textField }
                    placeholder='Liquidity amount'
                    value={ amount }
                    error={ error }
                    onChange={ this.onAmountChange }
                    InputProps={{
                        className: classes.inputField,
                        startAdornment: <InputAdornment position="start" className={ classes.inputAdornment }>
                            <img src={ require('../../assets/tokens/'+keeperAsset.logo) } width="30px" alt="" />
                        </InputAdornment>
                    }}
                />
            </div>
        );
    }

    onAmountChange = (event) => {
        let {value} = event.target;
        const keeperBalance = this.state.keeperAsset.balance
        if(value !== '' && isNaN(value)) {
            return false
        }
        if (value > keeperBalance) {
            value = keeperBalance;
        }
        this.props.onChange(value);
        this.setState({amount: value});
    }

    maxClicked = () => {
        const amount = this.state.keeperAsset.balance.toString();
        this.setState({amount})
        this.props.onChange(amount);

    }
}

export default withStyles(styles)(KeeperAssetInputField);
