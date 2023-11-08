import { Provider } from "react-redux";
import { memo, FC } from "react";
import MainScreen from "./MainScreen";
import store from "./redux/store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default memo(App);
