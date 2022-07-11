const solanaWeb3 = require('@solana/web3.js');
const Connection = solanaWeb3.Connection;


(async () => {
  console.log('Establishing Connection...');
  let rpcUrl = 'http://localhost:8899';
  let connection = new Connection(rpcUrl, 'confirmed');

  console.log('Get Version...');
  const version = await connection.getVersion()
  console.log('Version: ', version);

  console.log('Done.');

})()
