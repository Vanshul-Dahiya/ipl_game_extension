async function getMatchData() {
  return await fetch(
    "https://api.cricapi.com/v1/currentMatches?apikey=744e05dc-0a78-44fd-bbde-700bc2c92367&offset=0"
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.status != "success") return;

      const matchesList = data.data;
      //   if list is empty..return empty array
      if (!matchesList) return [];

      // get generic info
      const relevantData = matchesList
        .filter(
          (match) => match.series_id == "c75f8952-74d4-416f-b7b4-7da4b4e3ae6e"
        )
        .map(
          (match) =>
            `${match.name} , ${match.status}, \n ` +
            "\n" +
            match.score[0].inning +
            " , \n" +
            match.score[0].r +
            " / \n" +
            match.score[0].w +
            " , over - \t" +
            match.score[0].o +
            " \n"
        );

      // display generic info
      document.getElementById("matches").innerHTML = relevantData
        .map((match) => `<li>  ${match} </li>`)
        .join("");

      return relevantData;
    })
    .catch((e) => console.log(e));
}

getMatchData();
