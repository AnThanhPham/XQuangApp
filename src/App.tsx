import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import XRayApp from './components/XRayProcessor/XRayApp';

function App() {
  return (
    <ConfigProvider>
      <div className="app">
        <XRayApp />
      </div>
    </ConfigProvider>
  );
}

export default App;