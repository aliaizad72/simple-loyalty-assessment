import "./global.css";

const input = [
  { "Index #": "A1", Value: "41" },
  { "Index #": "A2", Value: "18" },
  { "Index #": "A3", Value: "21" },
  { "Index #": "A4", Value: "63" },
  { "Index #": "A5", Value: "2" },
  { "Index #": "A6", Value: "53" },
  { "Index #": "A7", Value: "5" },
  { "Index #": "A8", Value: "57" },
  { "Index #": "A9", Value: "60" },
  { "Index #": "A10", Value: "93" },
  { "Index #": "A11", Value: "28" },
  { "Index #": "A12", Value: "3" },
  { "Index #": "A13", Value: "90" },
  { "Index #": "A14", Value: "39" },
  { "Index #": "A15", Value: "80" },
  { "Index #": "A16", Value: "88" },
  { "Index #": "A17", Value: "49" },
  { "Index #": "A18", Value: "60" },
  { "Index #": "A19", Value: "26" },
  { "Index #": "A20", Value: "28" },
];

document.body.onload = () => {
  createHeaders();

  input.forEach((obj) => {
    createCell(obj["Index #"], null);
    createCell(obj["Value"], obj["Index #"]);
  });

  const vals = [...document.querySelectorAll(".table-1-cells")];

  document.querySelectorAll("input").forEach((text_inp) => {
    text_inp.oninput = (e) => {
      vals.forEach((elem) => {
        elem.classList.remove("font-bold", "text-green-400");
      });

      // if value matches index
      const indices = e.target.value.match(/(A\d+)/g);

      if (indices) {
        const val = vals.filter((val) => indices.includes(val.dataset.index));
        val.forEach((elem) => {
          elem.classList.add("font-bold", "text-green-400");
        });
      }
    };

    text_inp.onkeydown = (e) => {
      vals.forEach((elem) => {
        elem.classList.remove("font-bold", "text-green-400");
      });

      // if press Enter
      if (e.code === "Enter") {
        const current_input = e.target.value;
        const indices = current_input.match(/(A\d+)/g);

        if (!indices) {
          e.target.value = "Check input";
          return;
        }

        const operations = current_input.match(/[+\-*/]/g);

        const val = vals.filter((val) => indices.includes(val.dataset.index));
        const numbers = val.map((elem) => elem.textContent);

        if (!operations && indices.length === 1) {
          e.target.value = numbers[0];
          return;
        }

        let toEval = "";
        let n = operations.length;

        for (let i = 0; i < n; i++) {
          if (i === 0) {
            toEval += numbers.shift();
          }

          toEval += operations.shift();
          toEval += numbers.shift();
        }

        e.target.value = eval(toEval);
      }
    };
  });
};

function createCell(val, key) {
  const cell = document.createElement("div");
  cell.textContent = val;
  cell.classList = "py-1 border-b ";

  if (!isNaN(Number(val))) {
    cell.dataset.index = key;
    cell.classList.add("table-1-cells");
  }

  document.getElementById("table-1").appendChild(cell);
}

function createHeaders() {
  const headers = Object.keys(input[0]);
  headers.forEach((header, i) => {
    const cell = document.createElement("div");
    cell.textContent = header;
    cell.classList = "p-3 border-b";

    document.getElementById("table-1").appendChild(cell);
  });
}
