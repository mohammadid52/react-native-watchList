import Home from './Main/Home';
import Content from './Main/Content';
import Settings from './Main/Settings';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import GetStarted from './Auth/GetStarted';
import Loading from './Loading';

const Auth = {Login, Signup, GetStarted};
const Main = {Home, Content, Settings};

export {Main, Auth, Loading};
