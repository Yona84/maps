import React from 'react';
import { css } from 'emotion';
import './App.css';
import { ReactBingmaps } from 'react-bingmaps';
import AddNewMarker from './components/AddNewMarker';

const bingMapsKey = 'ArFCjgI-Fn4uvKNKd3bifsO5gHYWV7ZI4LGeUcyumB7jf7Is8ZB12V__C5pi4UJD';

function App () {

  const [ locations, addLocation ] = React.useState([]);
  const [ polyLocations, setPolyLocations ] = React.useState([]);

  React.useEffect(() => {
    if (locations.length === 1) {
      const basePolyLocations = [
        [ locations[ 0 ].location[ 0 ], locations[ 0 ].location[ 1 ] ],
        [ locations[ 0 ].location[ 0 ], locations[ 0 ].location[ 1 ] ]
      ];
      setPolyLocations(basePolyLocations);
    }
  }, [ locations ]);

  const addPushpin = (cords) => {
    const newMarker = {
      'location': [ Number(cords.lat), Number(cords.lng) ]
    };
    addLocation([ ...locations, newMarker ]);
  };

  return (
    <div className={styles.root}>
      <div className={styles.addMarker}>
        <AddNewMarker
          addPushpin={addPushpin}
          setPolyLocations={setPolyLocations}
          polyLocations={polyLocations}
          locations={locations}/>
      </div>
      <ReactBingmaps
        className={styles.map}
        bingmapKey={bingMapsKey}
        navigationBarMode={'compact'}
        center={[ 13, 13 ]}
        pushPins={locations}
        polyline={locations.length > 0 ? {
          'location': polyLocations,
          'option': { strokeColor: 'red', strokeThickness: 10 }
        } : null}


      >
      </ReactBingmaps>
    </div>
  );
}

const styles = {
  root: css({
    display: 'flex',
    width: '100%',
    backgroundColor: '#1d1d1d',
  }),
  map: css({
    height: '100vh',
    width: '100%',
  }),
  addMarker: css({
    width: '50%',
    height: 500,
  })
};

export default App;
