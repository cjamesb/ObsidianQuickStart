import { React, ReactDOMServer, ObsidianWrapper } from '../clientDeps.ts';
import MainContainer from './Components/MainContainer.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
      h1: any;
      p: any;
    }
  }
}

const App = () => {
  return (
    <ObsidianWrapper>
      <div className="one">
        <MainContainer />
      </div>
    </ObsidianWrapper>
  );
};

export default App;
