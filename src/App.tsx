import './App.css'
import { Box } from '@mui/material';
import TodoList from './components/TodoList';

function App() {
  return (
    <Box component="div"  minWidth={'100vw'} minHeight={'100vh'}>
<TodoList/>
    </Box>
  )
}

export default App
