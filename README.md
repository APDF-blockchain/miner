# miner
This project contains the code for the miner needed by the APDF-blockchain/node.
This code can be found at https://github.com/APDF-blockchain/miner

# Run the application
To run this application, run 'npm start' in the root of the project. Or run 'node dist/miner.js' after 
you run 'npm run-script build' command.

# JSDoc
1. run npm i typedoc
2. The command in 1. is only required once.
3. Run 'mkdir docs' in the root directory.
4. cd to src
5. run '../node_modules/.bin/typedoc --out ../docs --mode modules .'
6. This will create .html files in the /docs directory.  You can open the index.html file to view 
    the documentation.

# How to start things up
1. To start the miner run 'HTTP_PORT=5001 P2P_PORT=7001 npm start' or 'npm start' which defaults 
    to the 5001 and 7001 ports respectively.
2. These instructions are subject to change as I learn more about how this miner is supposed to work.