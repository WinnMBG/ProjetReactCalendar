import Calendar from './components/Calendar'

function App() {
  document.body.style = "background: gray"
  document.title = "ProjetReact"

  return (
    <div>
      <h1 style={{textAlign:'center', marginTop:'3em', color:'whitesmoke'}}> Projet React Calendar </h1>
      <div className="container">
        <Calendar/>
      </div>
    </div>
  );
}

export default App;
