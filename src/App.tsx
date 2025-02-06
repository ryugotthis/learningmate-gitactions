// App 컴포넌트
import './App.css';
const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default App;
