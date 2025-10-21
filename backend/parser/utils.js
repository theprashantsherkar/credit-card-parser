import { parseAmex } from "./amexParser.js";
import { parseAXIS } from "./axisParser.js";
import { parseHDFC } from "./hdfcParser.js";
import { parseICICI } from "./iciciParser.js";
import { parseSBI } from "./sbiParser.js";

export function detectProvider(text) {
    if (text.includes("HDFC Bank")) return "HDFC";
    if (text.includes("ICICI Bank")) return "ICICI";
    if (text.includes("SBI Card")) return "SBI";
    if (text.includes("Axis Bank")) return "AXIS";
    if (text.includes("American Express")) return "AMEX";
    return "UNKNOWN";
}

export function parseStatement(provider, text) {
    switch (provider) {
        case "HDFC": return parseHDFC(text);
        case "ICICI": return parseICICI(text);
        case "SBI": return parseSBI(text);
        case "AXIS": return parseAXIS(text);
        case "AMEX": return parseAmex(text);
        default: return { error: "Provider not supported" };
    }
}
