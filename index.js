class BufferArray {
    #buf;
    constructor(entrySize, entries) {
        this.#buf = Buffer.alloc(entrySize * entries)
        this.length = 0
    }
    set(index, entry) {

    }
    push(entry) {

    }
}

class BufferArray_TYPE {
    #buf;
    #maxEntrySize;
    #lenSize;
    #entrySize;
    constructor(maxEntrySize, entries) {
        this.#maxEntrySize = maxEntrySize;
        this.#entrySize = maxEntrySize + this.#lenSize;
        this.#lenSize = Math.ceil(maxEntrySize.toString("hex").length/2);
        this.#buf = Buffer.alloc(this.#entrySize * entries);
        this.length = 0;
    }
    set(index, entry) {
        const entrySize = entry.length;
        if (entrySize > this.#maxEntrySize) throw new TypeError("Entry Size can not be larger than 'maxEntrySize'");
        let setIndex = 0;
        if (index >= this.length) {
            setIndex = this.length;
            this.length++;
        } else {
            setIndex = index;
        }
        const offset = this.#entrySize * setIndex;
        this.#buf.set(
            Buffer.from(entrySize.toString("hex").padStart(this.#lenSize * 2, "0")),
            offset
        );
        this.#buf.set(entry, offset + this.#lenSize);

        return setIndex;
    }
    push(entry) {
        set(this.length, entry)
    }
}
