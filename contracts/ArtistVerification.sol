// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArtistVerification {
    enum Status { Pending, Verified, Rejected }
    
    struct Artist {
        Status status;
        string ipfsHash;
        uint256 timestamp;
        bool exists;
    }
    
    address public admin;
    mapping(address => Artist) public artists;
    address[] public verifiedArtists;
    
    event ArtistProfileSubmitted(address indexed artist, string ipfsHash);
    event ArtistVerified(address indexed artist);
    event ArtistRejected(address indexed artist);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function submitArtistProfile(string memory ipfsHash) external {
        require(!artists[msg.sender].exists, "Artist profile already exists");
        
        artists[msg.sender] = Artist({
            status: Status.Pending,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            exists: true
        });
        
        emit ArtistProfileSubmitted(msg.sender, ipfsHash);
    }
    
    function verifyArtist(address artist) external onlyAdmin {
        require(artists[artist].exists, "Artist profile does not exist");
        require(artists[artist].status != Status.Verified, "Artist already verified");
        
        artists[artist].status = Status.Verified;
        verifiedArtists.push(artist);
        
        emit ArtistVerified(artist);
    }
    
    function rejectArtist(address artist) external onlyAdmin {
        require(artists[artist].exists, "Artist profile does not exist");
        require(artists[artist].status != Status.Rejected, "Artist already rejected");
        
        artists[artist].status = Status.Rejected;
        
        emit ArtistRejected(artist);
    }
    
    function getVerificationStatus(address artist) external view returns (Status, uint256) {
        require(artists[artist].exists, "Artist profile does not exist");
        return (artists[artist].status, artists[artist].timestamp);
    }
    
    function getVerifiedArtists() external view returns (address[] memory) {
        return verifiedArtists;
    }
    
    function getArtistIPFSHash(address artist) external view returns (string memory) {
        require(artists[artist].exists, "Artist profile does not exist");
        return artists[artist].ipfsHash;
    }
}