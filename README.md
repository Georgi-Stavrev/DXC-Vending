# Running the webapp server
First run: `npm install`

Afterwards: `npm run dev`

# Running the API server
First run: `npm install -g json-server`

Afterwards: `json-server --watch db.json`

# Product Overview
`The machine takes data from the mock-api, which reads db.json.`

`Accepted denominations carry the isAccepted flag and are rendered within the wallet.`

`The Reset button returns any inserted coins to the wallet. The Change button collects any leftover coins.`
