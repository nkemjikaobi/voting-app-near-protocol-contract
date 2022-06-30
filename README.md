voting-app-near-protocol
==================

LIVE URL => https://voting-app-near-protocol-frontend.vercel.app/

## Smart contract for the Voting app

- Contract can be found inside the ``` contract/assembly ``` path

To run tests,

```
cd contract

```

Then run the command below

```
 yarn test

 ```

 OR

 ```
 npm run test

 ```

 Models can be found inside the <b>Models</b> foler in this path ```contract/assembly```

 Database can be found inside the <b>utils</b> foler in this path ```contract/assembly```

 Tests can be found inside the <b>__tests__</b> folder in this path ```contract/assembly```
 ### Overview

 - This is a voting decentralised application whereby users can create elections, add contestants to a particular election and also vote for the contestant of their choice.



- This project is made up of two repositories as shown above. One houses the smart contract while the other houses the front end. 



- The smart contract is built with Assembly Script. It made use of <b>Persistent Map</b> and ,<b>Persistent Deque</b> to store information on-chain. Unit tests were also written to ensure all our functions work as expected.



- The front end was bult with NextJs and Typescript. Context API was used to manage the application-level state. Tailwind CSS was used for styling.



- Upon the arrival of the website, you are required to sign in, if you have an active login session, the sign-in button changes to the dashboard. Once you are in your dashboard, you can view all your elections if any have been created.



- When you create an election, you can click on the election card to view contestants and also add contestants to that election. Once you add contestants, you can begin voting.



- P.S:  The application and smart contract can be modified further and made better as it was more like an MVP due to time constraints.