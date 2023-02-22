// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlobStars_dev is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  string public metaDataFolder = "metadata/";
  uint256 public cost = .01 ether;
  uint256 public maxSupply = 4844;
  uint256 public maxMintAmount = 10;
  bool public paused = false;
  mapping(address => bool) public allowlist;

  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    mint(msg.sender, 1);
  }

  // internal
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  // public
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    require(!paused, "Contract is paused");
    require(_mintAmount > 0, "Must mint at least 1");
    require(_mintAmount <= maxMintAmount, "Cannot mint more than 10 at once");
    require(supply + _mintAmount <= maxSupply, "Mint amount exceeds max supply");


    if (msg.sender != owner()) {
        if (allowlist[msg.sender] == true) {
          require(_mintAmount == 1, "Allowlist members can only mint 1 BlobStar");
        }
        if (allowlist[msg.sender] != true) {
          require(msg.value >= cost * _mintAmount, "Not enough ETH sent");
        }
        allowlist[msg.sender] = false;
    }

    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, metaDataFolder, tokenId.toString(), baseExtension))
        : "";
  }

  //only owner
  function setCost(uint256 _newCost) public onlyOwner() {
    cost = _newCost;
  }

  function setMaxMintAmount(uint256 _newMaxMintAmount) public onlyOwner() {
    maxMintAmount = _newMaxMintAmount;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  function togglePause(bool _state) public onlyOwner {
    paused = _state;
  }

  function allowlistUser(address[] memory _arr) public onlyOwner {
    for (uint256 i; i < _arr.length; i++) {
      allowlist[_arr[i]] = true;
    }
  }

  function removeAllowlistUser(address[] memory _arr) public onlyOwner {
    for (uint256 i; i < _arr.length; i++) {
      allowlist[_arr[i]] = false;
    }
  }

  function withdraw() public payable onlyOwner {
    (bool success, ) = msg.sender.call{value: address(this).balance}("");
    require(success, "Transfer failed.");
  }
}
