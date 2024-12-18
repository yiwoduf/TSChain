import * as crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPreviousHash() {
    if (this.blocks.length === 0) {
      // IF: First Block
      return "";
    } else {
      // New Blocks
      return this.blocks[this.blocks.length - 1].hash;
    }
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPreviousHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();

blockchain.addBlock("First One");
blockchain.addBlock("Second One");
blockchain.addBlock("Third One");

blockchain.getBlocks().push(new Block("123", 4, "Fourth One"));

console.log(blockchain.getBlocks());
