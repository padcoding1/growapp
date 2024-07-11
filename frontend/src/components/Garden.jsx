function Garden(props) {
  console.log(props);
  return (
    <main className="mx-4">
      <h1>Garden</h1>
      <ul>
        {props.plants.map((plant) => (
          <li className="m-2 p-4" key={plant._id}>
            <h2 className="my-2 text-2xl">{plant.commonName}</h2>
            <img className="w-1/4" src={plant.image} alt={plant.commonName} />
            <p>{plant.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Garden;
