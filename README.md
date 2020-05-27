# miner
This project contains the code for the miner needed by the APDF-blockchain/node.
This code can be found at https://github.com/APDF-blockchain/miner

# Run the application
To run this application, run 'npm start' in the root of the project. Or run 'node dist/miner.js' after 
you run 'npm run-script build' command.

## Command line args
After a build, one can supply command line args to start the application:
1. --url=<url of the blockchain node>
2. --address=<miner address that you wish to use instead of the default 28Fcf7997E56f1Fadd4FA39fD834e5B96cb13b2B>

# JSDoc
1. run npm i typedoc
2. The command in 1. is only required once.
3. Run 'mkdir docs' in the root directory.
4. cd to src
5. run '../node_modules/.bin/typedoc --out ../docs --mode modules .'
6. This will create .html files in the /docs directory.  You can open the index.html file to view 
    the documentation.
