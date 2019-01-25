import {
    CancellationToken,
    Hover,
    HoverProvider,
    MarkedString,
    Position,
    TextDocument,
} from "vscode";

import { Utils } from "../utils/utils";

type Nullable<T> = T | null;

export class MiniZincHoverProvider implements HoverProvider {
    constructor() {}

    public provideHover(
        doc: TextDocument, pos: Position, _token: CancellationToken): Nullable<Hover> {

        const wordRange: any = doc.getWordRangeAtPosition(pos);
        const contents: MarkedString[] = [];

        if (wordRange) {
            const word = doc.getText(wordRange);
            const desc = Utils.getPredDescriptions(word);

            if (desc) {
                contents.push({
                    language: "minizinc",
                    value: desc,
                });
            }
        }

        return contents === [] ? null : new Hover(contents);
    }
}
