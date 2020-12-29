import React from 'react';
import {ADD_CREDITS, START_LOADING, STOP_LOADING} from "../../constants";
import Store from '../../stores'
import KeeperAssetDialog from "./KeeperAssetDialog";

const emitter = Store.emitter
const dispatcher = Store.dispatcher


class JobRefillDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    addCreditsReturned = () => {
        emitter.emit(STOP_LOADING, ADD_CREDITS);
    }

    render() {
        const {open, closeModal} = this.props;
        return (
            <KeeperAssetDialog
                open={open}
                closeModal={closeModal}
                onConfirm={this.onRefill}
            />
        );
    }


    onRefill = (amount) => {
        const { job } = this.props;
        emitter.emit(START_LOADING, ADD_CREDITS);
        dispatcher.dispatch({type: ADD_CREDITS, content: {address: job.address, amount}})
        this.props.closeModal();
    }

}

export default JobRefillDialog;
