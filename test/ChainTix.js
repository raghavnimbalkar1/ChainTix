const { except, expect } = require ("chai");

describe("ChainTix", ()=>{

    let ChainTix

    beforeEach(async()=>{
        const ChainTix = await ethers.getContractFactory("ChainTix");
        chaintix = await ChainTix.deploy("ChainTix", "CT");
    })

    describe("Deployment", ()=>{
        
        it("The Name", async()=>{
            let name = await chaintix.name();
            expect(name).to.equal("ChainTix");
        })

        it("The Symbol", async()=>{
            let symbol = await chaintix.symbol();
            expect(symbol).to.equal("CT");
        })

    })
})