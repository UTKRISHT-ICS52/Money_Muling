let transactions = [];

function processCSV(){
  const file = document.getElementById("csvFile").files[0];
  if(!file){ alert("Upload CSV first"); return; }

  const reader = new FileReader();
  reader.onload = e => parseCSV(e.target.result);
  reader.readAsText(file);
}

function parseCSV(data){
  const rows = data.split("\n").slice(1);
  transactions = [];

  rows.forEach(row=>{
    const cols = row.split(",");
    if(cols.length >= 5){
      transactions.push({
        sender: cols[1],
        receiver: cols[2],
        amount: parseFloat(cols[3])
      });
    }
  });

  analyze();
}

function analyze(){
  const freq = {};
  transactions.forEach(t=>{
    freq[t.sender] = (freq[t.sender]||0)+1;
    freq[t.receiver] = (freq[t.receiver]||0)+1;
  });

  const suspicious = Object.entries(freq)
    .filter(([_,v])=>v>3)
    .map(([k,v])=>({
      id:k,
      score: Math.min(100, v*15),
      pattern:"High Velocity Transfers"
    }));

  document.getElementById("txCount").innerText = transactions.length;
  document.getElementById("susCount").innerText = suspicious.length;
  document.getElementById("ringCount").innerText = Math.floor(suspicious.length/3);

  const table = document.getElementById("resultTable");
  table.innerHTML="";

  suspicious.forEach(s=>{
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.score}</td>
        <td>${s.pattern}</td>
      </tr>
    `;
  });
}

