// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import "../src/EggCollectibles.sol";

contract EggCollectiblesTest is Test {
    EggCollectibles public eggContract;
    address public deployer;
    address public user1;
    address public user2;
    address public minter;

    function setUp() public {
        deployer = address(this);
        user1 = makeAddr("user1");
        user2 = makeAddr("user2");
        minter = makeAddr("minter");

        eggContract = new EggCollectibles();
    }

    function testDeployment() public {
        assertEq(eggContract.deployer(), deployer);
        assertEq(eggContract.name(), "Portfolio Easter Eggs");
        assertEq(eggContract.symbol(), "PEGG");
        assertEq(eggContract.totalSupply(), 0);
        assertTrue(eggContract.isAuthorizedMinter(deployer));
    }

    function testMintEgg() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        assertEq(tokenId, 1);
        assertEq(eggContract.ownerOf(tokenId), user1);
        assertEq(eggContract.balanceOf(user1), 1);
        assertTrue(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.AI_WHISPERER));
        assertEq(eggContract.totalSupply(), 1);
    }

    function testCannotMintSameEggTwice() public {
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        vm.expectRevert(EggCollectibles.AlreadyMinted.selector);
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
    }

    function testCannotMintUltimateEggDirectly() public {
        vm.expectRevert(EggCollectibles.InvalidEggType.selector);
        eggContract.mintEgg(user1, EggCollectibles.EggType.ULTIMATE_EGG);
    }

    function testUnauthorizedCannotMint() public {
        vm.prank(user1);
        vm.expectRevert(EggCollectibles.NotAuthorized.selector);
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
    }

    function testAuthorizedMinter() public {
        eggContract.addAuthorizedMinter(minter);
        assertTrue(eggContract.isAuthorizedMinter(minter));

        vm.prank(minter);
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);

        assertEq(eggContract.ownerOf(tokenId), user1);
    }

    function testRemoveAuthorizedMinter() public {
        eggContract.addAuthorizedMinter(minter);
        eggContract.removeAuthorizedMinter(minter);
        assertFalse(eggContract.isAuthorizedMinter(minter));

        vm.prank(minter);
        vm.expectRevert(EggCollectibles.NotAuthorized.selector);
        eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);
    }

    function testSoulboundProperties() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        // All transfer functions should revert
        vm.expectRevert(EggCollectibles.SoulboundToken.selector);
        eggContract.transferFrom(user1, user2, tokenId);

        vm.expectRevert(EggCollectibles.SoulboundToken.selector);
        eggContract.safeTransferFrom(user1, user2, tokenId);

        vm.expectRevert(EggCollectibles.SoulboundToken.selector);
        eggContract.safeTransferFrom(user1, user2, tokenId, "");

        vm.expectRevert(EggCollectibles.SoulboundToken.selector);
        eggContract.approve(user2, tokenId);

        vm.expectRevert(EggCollectibles.SoulboundToken.selector);
        eggContract.setApprovalForAll(user2, true);

        // Approval functions should return false/zero
        assertEq(eggContract.getApproved(tokenId), address(0));
        assertFalse(eggContract.isApprovedForAll(user1, user2));
    }

    function testBurnEgg() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        vm.prank(user1);
        eggContract.burnEgg(tokenId);

        assertEq(eggContract.balanceOf(user1), 0);
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.AI_WHISPERER));
        assertFalse(eggContract.exists(tokenId));

        vm.expectRevert(EggCollectibles.TokenDoesNotExist.selector);
        eggContract.ownerOf(tokenId);
    }

    function testCannotBurnOthersEgg() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        vm.prank(user2);
        vm.expectRevert(EggCollectibles.NotTokenOwner.selector);
        eggContract.burnEgg(tokenId);
    }

    function testBurnAllForUltimate() public {
        // Mint all basic eggs for user1
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.EXPLORER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.BUG_HUNTER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.CONSOLE_HACKER);

        assertEq(eggContract.balanceOf(user1), 5);

        vm.prank(user1);
        uint256 ultimateTokenId = eggContract.burnAllForUltimate();

        // All basic eggs should be burned, ultimate egg should be minted
        assertEq(eggContract.balanceOf(user1), 1);
        assertEq(eggContract.ownerOf(ultimateTokenId), user1);
        assertTrue(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.ULTIMATE_EGG));

        // Basic eggs should no longer be owned
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.AI_WHISPERER));
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.MUSIC_LOVER));
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.EXPLORER));
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.BUG_HUNTER));
        assertFalse(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.CONSOLE_HACKER));
    }

    function testCannotBurnAllForUltimateWithoutAllEggs() public {
        // Mint only some eggs
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);

        vm.prank(user1);
        vm.expectRevert(EggCollectibles.InvalidEggType.selector);
        eggContract.burnAllForUltimate();
    }

    function testSendAllToWallet() public {
        // Mint all basic eggs for user1
        eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.EXPLORER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.BUG_HUNTER);
        eggContract.mintEgg(user1, EggCollectibles.EggType.CONSOLE_HACKER);

        vm.prank(user1);
        uint256 ultimateTokenId = eggContract.sendAllToWallet(user2);

        // user1 should have ultimate egg, user2 should have all basic eggs
        assertEq(eggContract.balanceOf(user1), 1);
        assertEq(eggContract.balanceOf(user2), 5);
        assertEq(eggContract.ownerOf(ultimateTokenId), user1);
        assertTrue(eggContract.hasMintedEgg(user1, EggCollectibles.EggType.ULTIMATE_EGG));

        // user2 should have all basic eggs
        assertTrue(eggContract.hasMintedEgg(user2, EggCollectibles.EggType.AI_WHISPERER));
        assertTrue(eggContract.hasMintedEgg(user2, EggCollectibles.EggType.MUSIC_LOVER));
        assertTrue(eggContract.hasMintedEgg(user2, EggCollectibles.EggType.EXPLORER));
        assertTrue(eggContract.hasMintedEgg(user2, EggCollectibles.EggType.BUG_HUNTER));
        assertTrue(eggContract.hasMintedEgg(user2, EggCollectibles.EggType.CONSOLE_HACKER));
    }

    function testGetUserEggs() public {
        uint256 token1 = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);
        uint256 token2 = eggContract.mintEgg(user1, EggCollectibles.EggType.MUSIC_LOVER);

        uint256[] memory userEggs = eggContract.getUserEggs(user1);
        assertEq(userEggs.length, 2);
        assertEq(userEggs[0], token1);
        assertEq(userEggs[1], token2);
    }

    function testGetEggData() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        EggCollectibles.EggData memory eggData = eggContract.getEggData(tokenId);
        assertEq(uint256(eggData.eggType), uint256(EggCollectibles.EggType.AI_WHISPERER));
        assertEq(eggData.mintTime, block.timestamp);
        assertEq(eggData.achievement, "AI Whisperer: Had a conversation with the AI");
    }

    function testTokenURI() public {
        uint256 tokenId = eggContract.mintEgg(user1, EggCollectibles.EggType.AI_WHISPERER);

        string memory uri = eggContract.tokenURI(tokenId);
        assertTrue(bytes(uri).length > 0);
        // Should start with data:application/json
        assertEq(bytes(uri)[0], bytes1('d'));
        assertEq(bytes(uri)[1], bytes1('a'));
        assertEq(bytes(uri)[2], bytes1('t'));
        assertEq(bytes(uri)[3], bytes1('a'));
    }

    function testGetAchievement() public {
        string memory achievement = eggContract.getAchievement(EggCollectibles.EggType.AI_WHISPERER);
        assertEq(achievement, "AI Whisperer: Had a conversation with the AI");
    }

    function testOnlyOwnerCanAddMinter() public {
        vm.prank(user1);
        vm.expectRevert(EggCollectibles.NotOwner.selector);
        eggContract.addAuthorizedMinter(minter);
    }

    function testOnlyOwnerCanRemoveMinter() public {
        vm.prank(user1);
        vm.expectRevert(EggCollectibles.NotOwner.selector);
        eggContract.removeAuthorizedMinter(deployer);
    }
}
