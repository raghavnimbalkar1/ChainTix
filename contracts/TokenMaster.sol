// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ChainTix is ERC721 {
    address public owner;
    uint256 public totalOccasions; // Total occasions listed
    uint256 public totalSupply; // Track total NFT supply

    struct Occasion {
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
    }

    // Mappings to track occasion data, purchases, and seats
    mapping(uint256 => Occasion) public occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought; // User's purchase status
    mapping(uint256 => mapping(uint256 => address)) public seatTaken; // Mapping for seats
    mapping(uint256 => uint256[]) public seatsTaken; // List of taken seats

    // Constructor to initialize the contract with a name and symbol
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // Function to list a new occasion
    function list(
        string memory _name,
        uint256 _cost,
        uint256 _maxTickets,
        string memory _date,
        string memory _time,
        string memory _location
    ) public onlyOwner {
        totalOccasions++; // Increment total occasions count

        // Save the new occasion details in the mapping
        occasions[totalOccasions] = Occasion(
            totalOccasions,
            _name,
            _cost,
            _maxTickets,
            _maxTickets, // Set the initial tickets as max tickets
            _date,
            _time,
            _location
        );
    }

    // Function to mint a ticket
    function mint(uint256 _id, uint256 _seat) public payable {
        // Ensure the occasion ID is valid
        require(_id != 0, "Invalid occasion ID");
        require(_id <= totalOccasions, "Occasion does not exist");

        // Ensure enough Ether is sent for the ticket purchase
        require(msg.value >= occasions[_id].cost, "Insufficient funds");

        // Ensure the seat is available
        require(seatTaken[_id][_seat] == address(0), "Seat is already taken");
        require(_seat <= occasions[_id].maxTickets, "Seat does not exist");

        // Decrement the available tickets
        occasions[_id].tickets -= 1;

        // Mark the user as having bought the ticket
        hasBought[_id][msg.sender] = true;

        // Assign the seat to the buyer
        seatTaken[_id][_seat] = msg.sender;
        seatsTaken[_id].push(_seat); // Update the list of taken seats

        totalSupply++; // Increase total NFT supply

        // Mint the NFT ticket
        _safeMint(msg.sender, totalSupply);
    }

    // Function to get the details of an occasion
    function getOccasion(uint256 _id) public view returns (Occasion memory) {
        return occasions[_id];
    }

    // Function to get a list of taken seats for an occasion
    function getSeatsTaken(uint256 _id) public view returns (uint256[] memory) {
        return seatsTaken[_id];
    }

    // Withdraw function to transfer contract balance to the owner
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdraw failed");
    }
}
