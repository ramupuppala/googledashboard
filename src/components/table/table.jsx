//imports node modules
import React, { Component } from 'react';
//import router link
import { Link } from "react-router-dom";
//imports prop types from react
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//Action imports
import * as userActions from '../../store/actions/userActionCreator';
/**
 * This class used for diplay User list 
 */

class TableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: []
        }
    }
    componentDidMount(){
        this.props.userActions.receiveUserDetails();
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <h2 className="m2">User Details</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>RequestId</th>
                                <th>Address</th>
                                <th>District</th>
                                <th>Village</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.userDetails.map((userDetail, id) => <tr key={id}>
                                <td>{userDetail.RequestId}</td>
                                <td>{userDetail.Address}</td>
                                <td>{userDetail.District}</td>
                                <td>{userDetail.Village}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

// Get state data from store to props
function mapStateToProps(state) {
    return {
        userDetails: state.userReducer.userDetails,      
    }
  }

// Get actions to handle store data
function mapDispatchToProps(dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
    };
  }
  // Wire it all up and export
  export default connect(mapStateToProps, mapDispatchToProps)(TableView);