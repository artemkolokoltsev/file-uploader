import './App.css'
import UploadCountersFrame from './components/UploadCountersFrame';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Resizable frame component with counters and rata table */}
      <UploadCountersFrame />
    </div>
  );
}

export default App
