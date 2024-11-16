const { expect } = require("chai");
const { ethers } = require("hardhat");

const NAME = "ChainTix";
const SYMBOL = "CT";

const OCCASION_NAME = "The Weeknd Live";
const OCCASION_COST = ethers.utils.parseUnits('1', 'ether');
const OCCASION_MAX_TICKETS = 100;
const OCCASION_DATE = "Fri, December 1";
const OCCASION_TIME = "8:00PM";
const OCCASION_LOCATION = "Mumbai";

describe("ChainTix", () => {
    let ChainTix;
    let deployer, buyer;
    let chaintix;

    beforeEach(async () => {
        [deployer, buyer] = await ethers.getSigners();

        // Make sure to get the contract factory
        ChainTix = await ethers.getContractFactory("ChainTix");
        chaintix = await ChainTix.deploy(NAME, SYMBOL);

        const transaction = await chaintix.connect(deployer).list(
            OCCASION_NAME,
            OCCASION_COST,
            OCCASION_MAX_TICKETS,
            OCCASION_DATE,
            OCCASION_TIME,
            OCCASION_LOCATION
        );

        await transaction.wait();
    });

    describe("Deployment", () => {
        it("should set the correct name", async () => {
            let name = await chaintix.name();
            expect(name).to.equal(NAME);
        });

        it("should set the correct symbol", async () => {
            let symbol = await chaintix.symbol();
            expect(symbol).to.equal(SYMBOL);
        });

        it("should set the correct owner", async () => {
            expect(await chaintix.owner()).to.equal(deployer.address);
        });
    });

    describe("Occasions", () => {
        it("should list a new occasion", async () => {
            const totalOccasions = await chaintix.totalOccasions();
            expect(totalOccasions).to.be.equal(1);
        });

        it("should return correct occasion data", async () => {
            const occasion = await chaintix.getOccasion(1);
            expect(occasion.name).to.equal(OCCASION_NAME);
            expect(occasion.cost).to.equal(OCCASION_COST);
            expect(occasion.maxTickets).to.equal(OCCASION_MAX_TICKETS);
            expect(occasion.date).to.equal(OCCASION_DATE);
            expect(occasion.time).to.equal(OCCASION_TIME);
            expect(occasion.location).to.equal(OCCASION_LOCATION);
        });
    });

    describe("Minting", () => {
        const ID = 1;
        const SEAT = 50;
        const AMOUNT = ethers.utils.parseUnits('1', 'ether');

        beforeEach(async () => {
            const transaction = await chaintix.connect(buyer).mint(ID, SEAT, { value: AMOUNT });
            await transaction.wait();
        });

        it("should update the ticket count", async () => {
            const occasion = await chaintix.getOccasion(ID);
            expect(occasion.tickets).to.be.equal(OCCASION_MAX_TICKETS - 1);
        });

        it("should mark the buyer as having bought a ticket", async () => {
            const status = await chaintix.hasBought(ID, buyer.address);
            expect(status).to.equal(true);
        });

        it("should assign the correct seat", async () => {
            const owner = await chaintix.seatTaken(ID, SEAT);
            expect(owner).to.equal(buyer.address);
        });

        it("should update the seatsTaken array", async () => {
            const seats = await chaintix.getSeatsTaken(ID);
            expect(seats.length).to.equal(1);
            expect(seats[0]).to.equal(SEAT);
        });

        it("should update the contract balance", async () => {
            const balance = await ethers.provider.getBalance(chaintix.address);
            expect(balance).to.be.equal(AMOUNT);
        });
    });

    describe("Withdrawing", () => {
        const ID = 1;
        const SEAT = 50;
        const AMOUNT = ethers.utils.parseUnits("1", 'ether');
        let balanceBefore;

        beforeEach(async () => {
            balanceBefore = await ethers.provider.getBalance(deployer.address);

            let transaction = await chaintix.connect(buyer).mint(ID, SEAT, { value: AMOUNT });
            await transaction.wait();

            transaction = await chaintix.connect(deployer).withdraw();
            await transaction.wait();
        });

        it("should update the owner balance", async () => {
            const balanceAfter = await ethers.provider.getBalance(deployer.address);
            expect(balanceAfter).to.be.greaterThan(balanceBefore);
        });

        it("should update the contract balance", async () => {
            const balance = await ethers.provider.getBalance(chaintix.address);
            expect(balance).to.equal(0);
        });
    });
});
