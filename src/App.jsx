import Body from "./components/Body";
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";
import store from "./utils/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Body />
        {/* <SidebarMenu /> */}
      </div>
    </Provider>
  )
}

export default App;