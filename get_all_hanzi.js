(await(async () => {
    const HANZI_UNICODE_BLOCKS = [
        [0x4E00, 0x9FFF], // common
        [0x3400, 0x4DBF], // rare
        [0x20000, 0x2A6DF], // rare, historic
        [0x2A700, 0x2B73F], // rare, historic
        [0x2B740, 0x2B81F], // uncommon, some in current use
        [0x2B820, 0x2CEAF], // rare, historic
        [0x2CEB0, 0x2EBEF], // rare, historic
        [0x30000, 0x3134F], // rare, historic
        [0x31350, 0x323AF], // rare, historic
        [0xF900, 0xFAFF], // duplicates, unifiable variants, corporate characters
        [0x2F800, 0x2FA1F] // unifiable variants
    ];
    const BLOCK_START = 0;
    const BLOCK_END = 1;
    const hanzi = new Set();

    async function run() {
        for (const character of document.querySelector("body").innerHTML) {
            if (!(await isHanzi(character))) {
                continue
            }
            hanzi.add(character);
        }
    }

    async function isHanzi(character) {
        for (const unicodeBlock of HANZI_UNICODE_BLOCKS) {
            const unicodeNumber = character.charCodeAt(0);
            const isInRange = unicodeNumber >= unicodeBlock[BLOCK_START] && unicodeNumber <= unicodeBlock[BLOCK_END];
            if (isInRange) {
                return true;
            }
        }
        return false;
    }

    await run();

    console.log(JSON.stringify([...hanzi]));
}))();