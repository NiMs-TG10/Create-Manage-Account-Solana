// Transfer lamports from your account to another account
const { createMint } = require('@solana/spl-token');
const { Keypair, Connection, SystemProgram, Transaction } = require('@solana/web3.js');

const payer = Keypair.fromSecretKey(Uint8Array.from([26,172,115,95,81,76,119,77,37,143,228,208,189,122,98,0,103,140,146,210,251,207,5,170,0,129,125,10,214,96,150,9,80,188,5,80,123,223,16,10,80,94,41,63,36,194,252,37,79,159,109,140,112,92,153,51,158,87,174,46,31,246,126,46]));

const mintAthority = payer;

const connection = new Connection("https://api.devnet.solana.com");
async function main() {
    const newAccount = Keypair.generate();
    const TOTAL_BYTES = 165;
    const lamports = await connection.getMinimumBalanceForRentExemption(TOTAL_BYTES);
    const transaction = new Transaction();
    transaction.add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: newAccount.publicKey,
            lamports,
        }),
    );

    await connection.sendTransaction(transaction, [payer, newAccount]);
    console.log(`Transferred to  ${newAccount.publicKey.toBase58()}`);
}

main();

