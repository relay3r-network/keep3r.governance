import React from 'react';
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import KeeperAssetInputField from "./KeeperAssetInputField";

class KeeperAssetDialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
        }
    }

    render(){
        const {open, closeModal, onConfirm} = this.props;
        return (
            <div>
                <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Refill contract</DialogTitle>
                    <DialogContent>
                        <KeeperAssetInputField
                            placeholder='Liquidity amount'
                            onChange={ this.onAmountChange }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} color={"primary"}
                                onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button onClick={() => onConfirm(this.state.amount)}
                                variant={"outlined"} color="primary">
                            Refill
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    onAmountChange = (amount) => {
        this.setState({amount})
    }

}

export default KeeperAssetDialog;
