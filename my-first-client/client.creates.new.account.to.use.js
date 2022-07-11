/**********************************************************************
* This program assumes you have deployed your on-chain program.
* You should see the on-chain entry point message in the terminal
* running 'solana logs' when you run this client.
*
* To find out if your program is deployed on the test validator,
* make sure you're running it in one window, and in another window,
* Enter:   "solana program show --programs"
**********************************************************************/
const solanaWeb3 = require('@solana/web3.js');
const Connection = solanaWeb3.Connection;
const Keypair = solanaWeb3.Keypair;
const Transaction = solanaWeb3.Transaction;
const TransactionInstruction = solanaWeb3.TransactionInstruction;
const PublicKey = solanaWeb3.PublicKey;

// fill this by copy-pasting what you have in your wallet keypair json file, but
// DONT copy the brackets, just the numbers and commas
// my-first-wallet/my-keypair.json
const wallet = Keypair.fromSecretKey(
  new Uint8Array([
    //the numbers go here (343, 234, 23, etc)
  ])
);

// fill this by copy-pasting what you have in your wallet keypair json file, but
// DONT copy the brackets, just the numbers and commas
// the deployed program keypair json file should have same name as and be in
// same directory as the deployed eBPF  blahblah.so lib file.
//deployed program keypair
const program = Keypair.fromSecretKey(
  new Uint8Array([
    //the numbers go here (343, 234, 23, etc)
  ])
);

(async () => {
  console.log('Establishing Connection...');
  let rpcUrl = 'http://localhost:8899';
  let connection = new Connection(rpcUrl, 'confirmed');

  console.log('Get Version...');
  const version = await connection.getVersion()
  console.log('Version: ', version);

  console.log('Creating A New Account(Not Our Wallet)...');
  let newAccount = Keypair.generate();

  console.log('Get New Account\'s Balance ...');
  let balanceB = await connection.getBalance(newAccount.publicKey);
  console.log(newAccount.publicKey.toString());
  console.log('Balance Before: ', balanceB);

  // try using different amounts to see the response
  // on both client and 'solana logs' terminal.
  console.log('Request Airdrop For New Account...');
  airdropSignature = await connection.requestAirdrop(
    newAccount.publicKey,
    //0,
    //10,
    //100000,
    1000000
  )
  console.log('Await Confirmation Of Airdrop Request For New Account...');
  await connection.confirmTransaction(airdropSignature);

  console.log('Get New Account\'s Balance ...');
  let balanceI = await connection.getBalance(newAccount.publicKey);
  console.log(newAccount.publicKey.toString());
  console.log('Balance Intermediate:  ', balanceI);

  let instruction = new TransactionInstruction({
    programId: program.publicKey,
    keys: [],
    data: []
  });
  let transaction = new Transaction();
  transaction.add(instruction);

  //multiple requests is just to see funds drop
  await connection.sendTransaction(transaction, [newAccount]);
  await connection.sendTransaction(transaction, [newAccount]);
  await connection.sendTransaction(transaction, [newAccount]);
  await connection.sendTransaction(transaction, [newAccount]);

  console.log('Get New Account\'s Balance ...');
  let balanceA = await connection.getBalance(newAccount.publicKey);
  console.log(newAccount.publicKey.toString());
  console.log('Balance After:  ', balanceA);

  console.log('Done.');

})()
