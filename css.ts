import { debounce } from "@std/async";
import { bundle } from "lightningcss";

// From https://oscarehrling.com/2023/lightningcss-with-deno

const HAS_BUILD_FLAG = Deno.args.includes("--build");

async function buildStyles(minify = false) {
    const { code } = bundle({
        filename: "stylesheets/main.css",
        minify,
    });

    await Deno.writeTextFile("css/main.css", new TextDecoder().decode(code));
}

if (HAS_BUILD_FLAG) {
    console.info("> Building styles for production");
    buildStyles(true);
} else {
    await buildStyles();
    console.info("> Watching styles");
    const watcher = Deno.watchFs(["stylesheets/"]);
    const buildCall = debounce(buildStyles, 150);

    for await (const _event of watcher) {
        buildCall();
    }
}
