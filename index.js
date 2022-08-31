const { ChainedTokenCredential } = require("@azure/identity");
const { DefaultAzureCredential } = require("@azure/identity");
const { ClientSecretCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

// https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#chaining-credentials

function withChainedTokenCredential() {
    const clientId = "";
    const tentantId = "";
    const clientSecret = "";
    const keyVaultName = "";

    const credential = new ChainedTokenCredential(
        new DefaultAzureCredential(clientId),
        new ClientSecretCredential(tentantId, clientId, clientSecret)
    );
    
    return new SecretClient(`https://${keyVaultName}.vault.azure.net`, credential);
}

async function main() {

    const secretName = "AuthServer--BaseUrl";
    const client = withChainedTokenCredential();
    const mySecret = await client.getSecret(secretName);//.then(result => console.log(result));
    console.log(mySecret.value);
    console.log("raaagh!")
}

main(); 