import { useTheme, ThemeAction} from "../context/useTheme";
import "./Greeting.css";

const Greeting = (props) => {
    const { state, dispatch } = useTheme();

    return (
        <div>
            <h1>Hello, {props.name}!</h1>
            <p>Welcome to my playground.</p>
            <p>Have fun exploring!</p>
            <button className="border bg-red-500 shaddow-lg" onClick={() => dispatch({type: ThemeAction.TOGLE_THEME})}>Change Theme</button>
        </div>
    )
}

export default Greeting;