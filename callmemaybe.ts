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
type IResult = {[variable: string]: any}[]

interface ICallMeMaybe {
    transact: (tx: ITransaction) => void;
    query: (q: IQuery) => IResult;
}

// I think that will suffice.
//
// Let's write a test case first, implement later.

function test(db: ICallMeMaybe): void {
    db.transact([
        {name: "Oddmund", spiller: "Ukelele"},
        {name: "Teodor", spiser: "Brokkoli"}
    ])

    // Kanskje litt stygt -- men vi må skille på variabler (_name) og
    // string-verdier (Ukelele).
    //
    // Her velger vi å si at strings som begynner på _ er variabler. Godt nok
    // for oss for nå - neppe lurt hvis du skal skrive din egen grafdatabase.

    // Hvem spiller ukelele?
    t.assertArrayIncludes(
        db.query({
            find: ["_name"],
            where: [["_name", "spiller", "Ukelele"]]
        }).map(o => o._name) ,
        "Oddmund"
    )

    // Hva spiser Teodor?
    t.assertArrayIncludes(
        db.query({
            find: ["_spiser"],
            where: [["_p", "name", "Teodor"],
                    ["_p", "spiser", "_spiser"]]
        }).map(o => o._spiser),
        "Brokkoli"
    )
}
