import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import XRayProcessor from './components/XRayProcessor/XRayProcessor';

function App() {

  return (
    <ConfigProvider>
      <div className="app">
        <XRayProcessor />
      </div>
    </ConfigProvider>
  );
}

export default App
