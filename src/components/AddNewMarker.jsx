import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const propTypes = {
  addPushpin: PropTypes.func,
  setPolyLocations: PropTypes.func,
  polyLocations: PropTypes.array,
  locations: PropTypes.array,
};

const AddNewMarker = ({
                        addPushpin,
                        setPolyLocations,
                        polyLocations,
                        locations
                      }) => {

  const [ cords, setCords ] = React.useState({
    lat: '',
    lng: ''
  });

  const onChange = (e, cordType) => {
    setCords({
      ...cords,
      [ cordType ]: e.target.value
    });
  };

  const setNewMarker = (cords) => {
      let index = 1;
      addPushpin(cords);
      if (locations.length > 0 && polyLocations.length < 4) {
        const newPolyElem = [ Number(cords.lat), Number(cords.lng) ];
        polyLocations.splice(index, 0, newPolyElem);
        index++;
        setPolyLocations(polyLocations);
      }
      setCords({
        lat: '',
        lng: ''
      });
    }
  ;

  const buttonDisabled = cords.lng === '' || cords.lat === '';

  return (
    <Paper
      classes={{
        root: styles.paper
      }}>
      <h1> Add new Coordinates </h1>
      <TextField
        classes={{
          root: styles.textField
        }}
        type='tel'
        placeholder='Set new lat coordinate'
        value={cords.lat}
        onChange={(e) => onChange(e, 'lat')}/>
      <TextField
        classes={{
          root: styles.textField
        }}
        type='tel'
        placeholder='Set new lng coordinate'
        value={cords.lng}
        onChange={(e) => onChange(e, 'lng')}/>
      <Button
        disabled={buttonDisabled}
        classes={{
          root: styles.button({ buttonDisabled })
        }}
        onClick={() => setNewMarker(cords)}> Add New Coordinate </Button>
    </Paper>
  );
};

const styles = {
  paper: css({
    '&.MuiPaper-root': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%'
    }
  }),
  textField: css({
    '&.MuiTextField-root': {
      marginBottom: 32,
      marginRight: 'auto',
      marginLeft: 45
    }
  }),
  button: ({ buttonDisabled }) => css({
    '&.MuiButton-root': {
      backgroundColor: '#0bead6',
      opacity: buttonDisabled ? 0.5 : 1,
      borderRadius: 20,
      paddingLeft: 28,
      paddingRight: 28,
      marginBottom: 16,
      '&:hover': {
        opacity: 0.88,
        backgroundColor: 'rgba(70, 220, 179, 0.8)',
      }
    }
  }),
};

AddNewMarker.propTypes = propTypes;

export default AddNewMarker;
