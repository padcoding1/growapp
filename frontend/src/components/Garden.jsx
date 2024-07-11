function Garden(props) {
  console.log(props);
  return (
    <main>
      <h1>Garden</h1>
      <ul>
        {props.plants.map((plant) => (
          <li key={plant._id}>
            <h2 className="text-2xl">{plant.commonName}</h2>
            <p>{plant.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Garden;
