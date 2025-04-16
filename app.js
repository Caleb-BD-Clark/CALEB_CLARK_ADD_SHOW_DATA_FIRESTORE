// console.log(firebase);

document.querySelector("#submit").addEventListener("click", () => {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let color = document.querySelector("#favcolor").value;

  let user = {
    name: name,
    age: age,
    color: color,
  };

  //   console.log(user);

  // save the user into the DB
  db.collection("mypeople")
    .add(user)
    .then(() => {
      alert("New user added!");
    });
});

// show people stored in our DB

function show_people() {
  // data retrieval
  db.collection("mypeople")
    .get()
    .then((mydata) => {
      let docs = mydata.docs;

      let html = ``;
      //   loop though the docs array
      docs.forEach((d) => {
        // console.log(d.data().name);
        html += `<p class="p-3">${d.data().name} is ${
          d.data().age
        } years old. <span class="subtitle m-4">${d.id}</span> 
        <button class="button is-danger is-pulled-right" onclick="del_doc('${
          d.id
        }')">X</button>
        
        </p>`;
      });
      //   console.log(html);

      document.querySelector("#all_people").innerHTML += html;
    });
}

// Soccer teams data
let teams = [
  {
    teamName: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    worldwideFansInMillions: 798,
  },
  {
    teamName: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    worldwideFansInMillions: 738,
  },
  {
    teamName: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    worldwideFansInMillions: 755,
  },
  {
    teamName: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    worldwideFansInMillions: 537,
  },
  {
    teamName: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    worldwideFansInMillions: 950,
  },
  {
    teamName: "Argentina National Team",
    city: "Not applicable",
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    worldwideFansInMillions: 888,
  },
  {
    teamName: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torez"],
    worldwideFansInMillions: 400,
  },
];

// Save all teams to the 'teams' collection in Firestore


// Uncomment this line to run the function once:
function add_teams_to_firestore() {
  teams.forEach((team) => {
    db.collection("teams")
      .add(team)
      .then(() => {
        console.log(`${team.teamName} added to Firestore`);
      })
      .catch((error) => {
        console.error("Error adding team:", error);
      });
  });
}
show_people();
const outputEl = document.querySelector("#queryResults");

function renderResults(title, docs) {
  let html = `<h3 class="title is-4 mt-4">${title}</h3>`;
  if (docs.length === 0) {
    html += `<p>No results found.</p>`;
  } else {
    docs.forEach((doc) => {
      const data = doc.data();
      html += `<p><strong>${data.teamName}</strong> - ${data.city}, ${data.country} - ${data.worldwideFansInMillions}M fans<br>
        Top scorers: ${data.topScorers.join(", ")}</p>`;
    });
  }
  outputEl.innerHTML += html;
}


function query1() {
  db.collection("teams")
    .where("country", "==", "Spain")
    .get()
    .then((snapshot) => {
      console.log("Teams in Spain:", snapshot.docs);
      renderResults("1. Teams in Spain", snapshot.docs);
    });
}


function query2() {
  db.collection("teams")
    .where("country", "==", "Spain")
    .where("city", "==", "Madrid")
    .get()
    .then((snapshot) => {
      console.log("Teams in Madrid, Spain:", snapshot.docs);
      renderResults("2. Teams in Madrid, Spain", snapshot.docs);
    });
}


function query3() {
  db.collection("teams")
    .where("city", "==", "Not applicable")
    .get()
    .then((snapshot) => {
      console.log("National Teams:", snapshot.docs);
      renderResults("3. National Teams", snapshot.docs);
    });
}


function query4() {
  db.collection("teams")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter((doc) => doc.data().country !== "Spain");
      console.log("Teams NOT in Spain:", filtered);
      renderResults("4. Teams NOT in Spain", filtered);
    });
}


function query5() {
  db.collection("teams")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter(
        (doc) => !["Spain", "England"].includes(doc.data().country)
      );
      console.log("Teams NOT in Spain or England:", filtered);
      renderResults("5. Teams NOT in Spain or England", filtered);
    });
}

function query6() {
  db.collection("teams")
    .where("country", "==", "Spain")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter(
        (doc) => doc.data().worldwideFansInMillions > 700
      );
      console.log("Teams in Spain with >700M fans:", filtered);
      renderResults("6. Spanish Teams with >700M Fans", filtered);
    });
}


function query7() {
  db.collection("teams")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter((doc) => {
        const fans = doc.data().worldwideFansInMillions;
        return fans >= 500 && fans <= 600;
      });
      console.log("Teams with 500M–600M fans:", filtered);
      renderResults("7. Teams with 500M–600M Fans", filtered);
    });
}

function query8() {
  db.collection("teams")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter((doc) =>
        doc.data().topScorers.includes("Ronaldo")
      );
      console.log("Teams with Ronaldo:", filtered);
      renderResults("8. Teams where Ronaldo is a Top Scorer", filtered);
    });
}


function query9() {
  const legends = ["Ronaldo", "Messi", "Maradona"];
  db.collection("teams")
    .get()
    .then((snapshot) => {
      const filtered = snapshot.docs.filter((doc) =>
        doc.data().topScorers.some((player) => legends.includes(player))
      );
      console.log("Teams with Ronaldo, Maradona or Messi:", filtered);
      renderResults("9. Teams with Ronaldo, Maradona or Messi", filtered);
    });
}

function runAllQueries() {
  outputEl.innerHTML = "";
  query1();
  query2();
  query3();
  query4();
  query5();
  query6();
  query7();
  query8();
  query9();
}

// Call this when needed
runAllQueries();

// delete the user test
// delete()

// db.collection("mypeople")
//   .doc("F4DmmZabc1234")
//   .delete()
//   .then(() => {
//     alert("user deleted");
//   });

function del_doc(docid) {}
