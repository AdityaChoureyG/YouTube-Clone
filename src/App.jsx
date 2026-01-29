import Body from "./components/Body";
import Header from "./components/Header";
import store from "./utils/store";
import { Provider } from "react-redux";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarBody from "./components/SidebarBody";
import SearchBody from "./components/SearchBody";

const AppLayout = () => { 
  return (
    <>
      <Provider store={store}>
        <Header />
        <div className='flex gap-0 mt-16 h-[calc(100vh-64px)]'>
            <SidebarBody />
            <Outlet />
        </div>
      </Provider>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Body />} />
          <Route path="/search" element={<SearchBody />} />
          <Route path="/watch/:videoId" element={<Body />} />
          <Route path="/feed/subscriptions" element={<Body />} />
          <Route path="/account" element={<Body />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;