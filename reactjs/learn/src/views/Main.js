import Todo from '../widgets/TodoWithReducer';
import { ThemeProvider } from "../context/useTheme";
import Greeting from '../widgets/Greeting';

function Main() {
  return (
    <ThemeProvider>
      <Greeting />
      <Todo />
    </ThemeProvider>
  );
}

export default Main;
