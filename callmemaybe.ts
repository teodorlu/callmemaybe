import * as t from "https://deno.land/std@0.112.0/testing/asserts.ts";

// sette korrekt LSP i Emacs: M-x +lsp/switch-client RET deno-ls RET RET
// sette korrekt LSP i VSCode: TODO (Oddmund hjelp?)

interface Booyah {
    fwiw: string;
}

console.log("Printing out stuff!!!")

// Vi prøver oss på å skrive testdrevet og "literate". Det betyr at du skal
// kunne lese denne filen som en bok, og vi kontrollerer underveis at ting
// funker med asserts.

t.assertEquals(1, 1);

// Bah, new we have to write a bunch of types.

type ITransaction = {[prop: string]: any}[]
interface IQuery {
    find: string[];
    where: [any, string, any][];
}
type IResult = {[variable: string]: any}

interface ICallMeMaybe {
    transact: (tx: ITransaction) => void;
    find: (q: IQuery) => IResult;
}
