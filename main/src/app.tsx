import React, { Suspense } from "react";
import ReactDOM from "react-dom";
const Todo = React.lazy(() => import("todo/App"));

import "./styles/index.scss";

const App = () => {
  return <div className="grid grid-cols-5 grid-rows-5 gap-4">
            <div className="col-span-4 row-span-5">
            <h1>This is the main app</h1>
          </div>
          <div className="row-span-5 col-start-5">
              <Suspense fallback={"loading..."}>
                <Todo/>
              </Suspense>
          </div>
        </div>


};

export default App;

