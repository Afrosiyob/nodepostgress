
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestData } from './redux/test/action';
import Routes from './routes/Routes';

function App () {
  const dispatch = useDispatch()
  const { loading, data } = useSelector( state => state.getTestReducer )

  useEffect( () => {
    dispatch( getTestData() )
  }, [ dispatch ] )

  useEffect( () => {
    console.log( loading, data );
  }, [ loading, data ] )

  return (
    <Routes />
  );
}

export default App;
