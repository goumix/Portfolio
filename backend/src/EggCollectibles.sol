// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/console.sol";

/**
 * @title EggCollectibles
 * @dev Soulbound NFT contract for Portfolio Easter Eggs
 * @notice These NFTs are non-transferable and represent achievements in the labyrinth
 */
contract EggCollectibles {
    // Custom errors for better gas efficiency
    error NotOwner();
    error AlreadyMinted();
    error TokenDoesNotExist();
    error SoulboundToken();
    error NotTokenOwner();
    error InvalidEggType();
    error NotAuthorized();

    // Events
    event EggMinted(address indexed to, uint256 indexed tokenId, EggType eggType);
    event EggBurned(address indexed from, uint256 indexed tokenId);
    event UltimateEggUnlocked(address indexed to, uint256 indexed tokenId);
    event AuthorizedMinterAdded(address indexed minter);
    event AuthorizedMinterRemoved(address indexed minter);

    // Enum for different types of easter eggs
    enum EggType {
        AI_WHISPERER,     // Talked to AI
        MUSIC_LOVER,      // Listened to all songs
        EXPLORER,         // Fully explored labyrinth
        BUG_HUNTER,       // Found 404 page
        CONSOLE_HACKER,   // Found console message
        ULTIMATE_EGG      // Burned all other eggs
    }

    // Token data structure
    struct EggData {
        EggType eggType;
        uint256 mintTime;
        string achievement;
    }

    // Contract state
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => EggData) private _eggData;
    mapping(address => mapping(EggType => bool)) private _hasMinted;
    mapping(address => bool) private _authorizedMinters;

    uint256 private _currentTokenId;
    address public immutable deployer;

    // Metadata
    string private _name = "Portfolio Easter Eggs";
    string private _symbol = "PEGG";

    // Achievement descriptions
    mapping(EggType => string) private _achievements;

    modifier onlyOwner() {
        if (msg.sender != deployer) revert NotOwner();
        _;
    }

    modifier onlyAuthorized() {
        if (!_authorizedMinters[msg.sender] && msg.sender != deployer) {
            revert NotAuthorized();
        }
        _;
    }

    constructor() {
        deployer = msg.sender;
        _authorizedMinters[msg.sender] = true;
        _currentTokenId = 1;

        // Initialize achievement descriptions
        _achievements[EggType.AI_WHISPERER] = "AI Whisperer: Had a conversation with the AI";
        _achievements[EggType.MUSIC_LOVER] = "Music Lover: Listened to all songs";
        _achievements[EggType.EXPLORER] = "Explorer: Fully explored the labyrinth";
        _achievements[EggType.BUG_HUNTER] = "Bug Hunter: Found the 404 page";
        _achievements[EggType.CONSOLE_HACKER] = "Console Hacker: Found the hidden console message";
        _achievements[EggType.ULTIMATE_EGG] = "Ultimate Collector: Burned all eggs for the ultimate prize";
    }

    // ERC721-like functions (modified for soulbound behavior)
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) revert TokenDoesNotExist();
        return owner;
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    // Soulbound: transfers are disabled
    function transferFrom(address, address, uint256) public pure {
        revert SoulboundToken();
    }

    function safeTransferFrom(address, address, uint256) public pure {
        revert SoulboundToken();
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure {
        revert SoulboundToken();
    }

    function approve(address, uint256) public pure {
        revert SoulboundToken();
    }

    function setApprovalForAll(address, bool) public pure {
        revert SoulboundToken();
    }

    function getApproved(uint256) public pure returns (address) {
        return address(0); // No approvals allowed
    }

    function isApprovedForAll(address, address) public pure returns (bool) {
        return false; // No approvals allowed
    }

    // Custom minting functions
    function mintEgg(address to, EggType eggType) external onlyAuthorized returns (uint256) {
        if (eggType == EggType.ULTIMATE_EGG) revert InvalidEggType();
        if (_hasMinted[to][eggType]) revert AlreadyMinted();

        uint256 tokenId = _currentTokenId++;

        _owners[tokenId] = to;
        _balances[to]++;
        _hasMinted[to][eggType] = true;

        _eggData[tokenId] = EggData({
            eggType: eggType,
            mintTime: block.timestamp,
            achievement: _achievements[eggType]
        });

        emit EggMinted(to, tokenId, eggType);

        console.log("Easter egg minted:", uint256(eggType), "to:", to);

        return tokenId;
    }

    // Burn an egg (required for ultimate egg)
    function burnEgg(uint256 tokenId) external {
        if (_owners[tokenId] != msg.sender) revert NotTokenOwner();

        EggType eggType = _eggData[tokenId].eggType;

        delete _owners[tokenId];
        delete _eggData[tokenId];
        _balances[msg.sender]--;
        _hasMinted[msg.sender][eggType] = false;

        emit EggBurned(msg.sender, tokenId);
    }

    // Burn all eggs to unlock ultimate egg
    function burnAllForUltimate() external returns (uint256) {
        address sender = msg.sender;

        // Check if user has all basic eggs
        if (!_hasMinted[sender][EggType.AI_WHISPERER] ||
            !_hasMinted[sender][EggType.MUSIC_LOVER] ||
            !_hasMinted[sender][EggType.EXPLORER] ||
            !_hasMinted[sender][EggType.BUG_HUNTER] ||
            !_hasMinted[sender][EggType.CONSOLE_HACKER]) {
            revert InvalidEggType();
        }

        // Burn all basic eggs
        for (uint256 i = 1; i < _currentTokenId; i++) {
            if (_owners[i] == sender && _eggData[i].eggType != EggType.ULTIMATE_EGG) {
                EggType eggType = _eggData[i].eggType;
                delete _owners[i];
                delete _eggData[i];
                _balances[sender]--;
                _hasMinted[sender][eggType] = false;
                emit EggBurned(sender, i);
            }
        }

        // Mint ultimate egg
        uint256 ultimateTokenId = _currentTokenId++;

        _owners[ultimateTokenId] = sender;
        _balances[sender]++;
        _hasMinted[sender][EggType.ULTIMATE_EGG] = true;

        _eggData[ultimateTokenId] = EggData({
            eggType: EggType.ULTIMATE_EGG,
            mintTime: block.timestamp,
            achievement: _achievements[EggType.ULTIMATE_EGG]
        });

        emit UltimateEggUnlocked(sender, ultimateTokenId);

        return ultimateTokenId;
    }

    // Send all NFTs to a specific wallet (another way to unlock ultimate egg)
    function sendAllToWallet(address recipient) external returns (uint256) {
        address sender = msg.sender;

        // Check if user has all basic eggs
        if (!_hasMinted[sender][EggType.AI_WHISPERER] ||
            !_hasMinted[sender][EggType.MUSIC_LOVER] ||
            !_hasMinted[sender][EggType.EXPLORER] ||
            !_hasMinted[sender][EggType.BUG_HUNTER] ||
            !_hasMinted[sender][EggType.CONSOLE_HACKER]) {
            revert InvalidEggType();
        }

        // This is a special transfer only for the ultimate egg unlock
        for (uint256 i = 1; i < _currentTokenId; i++) {
            if (_owners[i] == sender && _eggData[i].eggType != EggType.ULTIMATE_EGG) {
                _owners[i] = recipient;
                _balances[sender]--;
                _balances[recipient]++;

                EggType eggType = _eggData[i].eggType;
                _hasMinted[sender][eggType] = false;
                _hasMinted[recipient][eggType] = true;
            }
        }

        // Mint ultimate egg for sender
        return _mintUltimateEgg(sender);
    }

    function _mintUltimateEgg(address to) private returns (uint256) {
        uint256 ultimateTokenId = _currentTokenId++;

        _owners[ultimateTokenId] = to;
        _balances[to]++;
        _hasMinted[to][EggType.ULTIMATE_EGG] = true;

        _eggData[ultimateTokenId] = EggData({
            eggType: EggType.ULTIMATE_EGG,
            mintTime: block.timestamp,
            achievement: _achievements[EggType.ULTIMATE_EGG]
        });

        emit UltimateEggUnlocked(to, ultimateTokenId);

        return ultimateTokenId;
    }

    // View functions
    function getEggData(uint256 tokenId) external view returns (EggData memory) {
        if (!exists(tokenId)) revert TokenDoesNotExist();
        return _eggData[tokenId];
    }

    function hasMintedEgg(address user, EggType eggType) external view returns (bool) {
        return _hasMinted[user][eggType];
    }

    function getUserEggs(address user) external view returns (uint256[] memory) {
        uint256 balance = _balances[user];
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;

        for (uint256 i = 1; i < _currentTokenId; i++) {
            if (_owners[i] == user) {
                tokens[index] = i;
                index++;
            }
        }

        return tokens;
    }

    function totalSupply() external view returns (uint256) {
        return _currentTokenId - 1;
    }

    function getAchievement(EggType eggType) external view returns (string memory) {
        return _achievements[eggType];
    }

    // Admin functions
    function addAuthorizedMinter(address minter) external onlyOwner {
        _authorizedMinters[minter] = true;
        emit AuthorizedMinterAdded(minter);
    }

    function removeAuthorizedMinter(address minter) external onlyOwner {
        _authorizedMinters[minter] = false;
        emit AuthorizedMinterRemoved(minter);
    }

    function isAuthorizedMinter(address minter) external view returns (bool) {
        return _authorizedMinters[minter];
    }

    // Generate simple on-chain metadata
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        if (!exists(tokenId)) revert TokenDoesNotExist();

        EggData memory egg = _eggData[tokenId];

        // Create a simple JSON metadata
        return string(abi.encodePacked(
            'data:application/json;utf8,{"name":"',
            egg.achievement,
            '","description":"Portfolio Easter Egg Achievement","attributes":[{"trait_type":"Type","value":"',
            _getEggTypeName(egg.eggType),
            '"},{"trait_type":"Mint Time","value":"',
            _toString(egg.mintTime),
            '"}]}'
        ));
    }

    function _getEggTypeName(EggType eggType) private pure returns (string memory) {
        if (eggType == EggType.AI_WHISPERER) return "AI Whisperer";
        if (eggType == EggType.MUSIC_LOVER) return "Music Lover";
        if (eggType == EggType.EXPLORER) return "Explorer";
        if (eggType == EggType.BUG_HUNTER) return "Bug Hunter";
        if (eggType == EggType.CONSOLE_HACKER) return "Console Hacker";
        if (eggType == EggType.ULTIMATE_EGG) return "Ultimate Collector";
        return "Unknown";
    }

    function _toString(uint256 value) private pure returns (string memory) {
        if (value == 0) return "0";

        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }

        return string(buffer);
    }
}
