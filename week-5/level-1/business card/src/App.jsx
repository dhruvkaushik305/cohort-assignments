// import './App.css'

function App() {
  //the props are name, description, social media buttons, interests
  const props = {
    name: "Lokeshwar",
    description: "A TA in the 100xDevs Cohort 2.0",
    interests: ["Ionic", "Open Source", "App Dev"],
    socials: ["LinkedIn", "Twitter"],
  };
  return (
    <div>
      <Card
        name={props.name}
        description={props.description}
        interests={props.interests}
        socials={props.socials}
      />
    </div>
  );
}
function Card(props) {
  console.log(props);
  return (
    <div>
      <h1>{props.name}</h1>
      <h3>{props.description}</h3>
      <h2>Interests</h2>
      {props.interests.map((interest) => (
        <div>{interest}</div>
      ))}
      {props.socials.map((social) => (
        <button>{social}</button>
      ))}
    </div>
  );
}

export default App;
