import "./App.css";
import logo from "./assets/svg/svgs";
function App() {
  return (
    <div className="App">
      <div className="container d-flex flex-column align-items-center mt-5">
        {logo}
        <h1 className="pt-4 mt-5 w-75 fs-1 fw-bold">ReactStrap Template</h1>
        <p className="pt-2 mt-1 w-75">
          This innovative template seamlessly integrates React and Bootstrap,
          providing a streamlined solution for individuals seeking to utilize
          the benefits of both technologies. By combining these powerful tools,
          it greatly simplifies the process for those who are already familiar
          with React and desire to incorporate the styling capabilities of
          Bootstrap into their projects.
        </p>
        <p className="lead footer mt-2 w-75">
          Sharp Circle Inc. proudly presents a creation expertly coded by Corey
          Jimenez
        </p>
      </div>
    </div>
  );
}

export default App;
