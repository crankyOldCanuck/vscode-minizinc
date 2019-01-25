import {ExtensionContext} from "vscode";

interface ISnippet {
    [predIndicator: string]: {
        prefix: string;
        body: string[];
        description: string;
    };
}

import * as fs from "fs";

type Nullable<T> = T | null;

export class Utils {
    public static init(context: ExtensionContext) {
        Utils.loadSnippets(context);
    }

    public static getPredDescriptions(pred: string): string {
        const re: RegExp = /\${ ?[0-9]+ ?: ?(\w+) ?}/g;
        let desc: string = "";

        for (const key in Utils.snippets) {
            if (key === pred) {
                desc = Utils.snippets[key].body.toString().replace(re, "$1");
                desc += "\n\n";
                desc += Utils.snippets[key].description;
                break;
            }
        }
        return desc;
    }

    private static snippets: Nullable<ISnippet> = null;

    private static loadSnippets(context: ExtensionContext) {
        if (Utils.snippets) {
            return;
        }

        const snippetsPath = context.extensionPath + "/snippets/minizinc.json";
        const snippets = fs.readFileSync(snippetsPath, "utf8").toString();
        Utils.snippets = JSON.parse(snippets);
    }
}
