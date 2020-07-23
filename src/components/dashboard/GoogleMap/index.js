import React from 'react';
import GoogleMapReact from 'google-map-react';
import supercluster from 'points-cluster';

import Marker from '../Marker';
import ClusterMarker from '../ClusterMarker';

import mapStyles from './mapStyles.json';

import MapWrapper from './MapWrapper';

import ExcelReader from '../readXcelFile/readXcelFile';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
//Action imports
import * as userActions from '../../../store/actions/userActionCreator';

const MAP = {
  defaultZoom: 5,
  defaultCenter: { lat: 17.387140, lng: 78.491684 },
  options: {
    styles: mapStyles,
    maxZoom: 12,
  },
};

export class GoogleMap extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isExcelReader: false,
      mapOptions: {
        center: MAP.defaultCenter,
        zoom: MAP.defaultZoom,
      },
      clusters: [],
      data: [],
      userDetails: []
    };
  }


  getClusters = () => {
    console.log('sate.data::', this.state.data);

    const clusters = supercluster(this.state.data, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = props => {
    console.log(props)
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
          lat: wy,
          lng: wx,
          numPoints,
          id: `${numPoints}_${points[0].id}`,
          points,
        }))
        : [],
    }, console.log(this.state.clusters));
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  componentDidMount(){
    if(this.props.googleMapLoaded){
      let tempData = this.setGoogleMapLatLongToCluster(this.props.userDetails);
      this.setState({
        data:tempData
      })
    }    
  }

  setGoogleMapLatLongToCluster(data){
    return data.map(result => {
      return {
        lat: result.OffsetLat1,
        lng: result.OffsetLong1,
        id: result.RequestId
      }
    });
  }

  readExcelData = (data) => {
    this.props.userActions.fetchUserDetails(data);
    let tempData = this.setGoogleMapLatLongToCluster(data);
    this.setState({
      data: tempData,
      userDetails: data,
      isExcelReader: true
    }, console.log(this.state.data));

  }

  render() {
    return (
      <React.Fragment>  
           { (this.state.isExcelReader || this.props.googleMapLoaded) ?  
           <React.Fragment>
              <MapWrapper>
              <GoogleMapReact
                defaultZoom={MAP.defaultZoom}
                defaultCenter={MAP.defaultCenter}
                options={MAP.options}
                onChange={this.handleMapChange}
                distanceToMouse={() => { }}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{ key: 'AIzaSyAS3ix4rVY4A-T4yPzWlEi766ycl2mY818' }}
              >
                {this.state.clusters.map(item => {
                  if (item.numPoints === 1) {
                    return (
                      <Marker
                        key={item.RequestId}
                        lat={item.OffsetLat1}
                        lng={item.OffsetLat1}
                      />
                    );
                  }

                  return (
                    <ClusterMarker
                      key={item.id}
                      lat={item.lat}
                      lng={item.lng}
                      points={item.points}
                    />
                  );
                })}
              </GoogleMapReact>
            </MapWrapper>
            </React.Fragment>        
            : <div className="row m-3">
              <div className="col-sm-4"></div>
              <div className="col-sm-4"><ExcelReader onClick={this.readExcelData}/></div>
              <div className="col-sm-4"></div>
            </div>}     
      </React.Fragment>

    );
  }
}

// Get state data from store to props
function mapStateToProps(state) {
  return {
    userDetails: state.userReducer.userDetails,
    googleMapLoaded:state.userReducer.googleMapLoaded
  }
}
// Get actions to handle store data
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}
// Wire it all up and export
export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);


