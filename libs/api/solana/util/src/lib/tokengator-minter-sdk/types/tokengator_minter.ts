export type TokengatorMinter = {
  "version": "0.1.0",
  "name": "tokengator_minter",
  "instructions": [
    {
      "name": "createMinter",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMinterArgs"
          }
        }
      ]
    },
    {
      "name": "createMinterWns",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "WNS ACCOUNTS"
          ]
        },
        {
          "name": "manager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "minterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wnsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMinterWNSArgs"
          }
        }
      ]
    },
    {
      "name": "mintMinterWns",
      "accounts": [
        {
          "name": "manager",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "WNS ACCOUNTS"
          ]
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wnsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MintMinterWNSArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "maxSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "minter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "communityId",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "authorities",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "minterConfig",
            "type": {
              "defined": "MinterConfig"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AddPresetAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAuthority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CreateMinterWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "community",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "CreateMinterArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "community",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "MintMinterWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemovePresetAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authorityToRemove",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "PaymentConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u16"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "days",
            "type": "u8"
          },
          {
            "name": "expiresAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MinterMetadataConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "metadata",
            "type": {
              "option": {
                "vec": {
                  "array": [
                    "string",
                    2
                  ]
                }
              }
            }
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "MinterInterestConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rate",
            "type": "i16"
          }
        ]
      }
    },
    {
      "name": "MinterTransferFeeConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "transferFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "maxFeeRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MinterApplicationConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "identities",
            "type": {
              "vec": {
                "defined": "IdentityProvider"
              }
            }
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          }
        ]
      }
    },
    {
      "name": "MinterConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "IdentityProvider",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Discord"
          },
          {
            "name": "GitHub"
          },
          {
            "name": "Google"
          },
          {
            "name": "Twitter"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAccountOwner",
      "msg": "Account not owned by program"
    },
    {
      "code": 6001,
      "name": "InvalidFeePayer",
      "msg": "Invalid Fee payer"
    },
    {
      "code": 6002,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6003,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6004,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6005,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6006,
      "name": "InvalidMinterTokenAccount",
      "msg": "Invalid minter token account"
    },
    {
      "code": 6007,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authority token account"
    },
    {
      "code": 6008,
      "name": "InvalidWNSGroup",
      "msg": "Invalid WNS group account"
    },
    {
      "code": 6009,
      "name": "InvalidWNSMember",
      "msg": "Invalid WNS member account"
    },
    {
      "code": 6010,
      "name": "InvalidWNSManager",
      "msg": "Invalid WNS manager account"
    },
    {
      "code": 6011,
      "name": "InvalidMinterName",
      "msg": "Invalid minter name"
    },
    {
      "code": 6012,
      "name": "InvalidMinterDescription",
      "msg": "Invalid minter description"
    },
    {
      "code": 6013,
      "name": "InvalidMinterImageURL",
      "msg": "Invalid Image Url"
    },
    {
      "code": 6014,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6015,
      "name": "InvalidMint",
      "msg": "Invalid mint account passed"
    },
    {
      "code": 6016,
      "name": "InvalidTokenProgram",
      "msg": "Token extensions program required"
    },
    {
      "code": 6017,
      "name": "CannotRemoveNonZeroSupplyMinter",
      "msg": "Cannot remove minter of non-zero supply"
    }
  ]
};

export const IDL: TokengatorMinter = {
  "version": "0.1.0",
  "name": "tokengator_minter",
  "instructions": [
    {
      "name": "createMinter",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMinterArgs"
          }
        }
      ]
    },
    {
      "name": "createMinterWns",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "WNS ACCOUNTS"
          ]
        },
        {
          "name": "manager",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "minterTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wnsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "CreateMinterWNSArgs"
          }
        }
      ]
    },
    {
      "name": "mintMinterWns",
      "accounts": [
        {
          "name": "manager",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "WNS ACCOUNTS"
          ]
        },
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "wnsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "MintMinterWNSArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "updateAuthority",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "size",
            "type": "u32"
          },
          {
            "name": "maxSize",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "minter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "communityId",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "authorities",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "minterConfig",
            "type": {
              "defined": "MinterConfig"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "AddPresetAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "newAuthority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "CreateMinterWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "community",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "CreateMinterArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "community",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "MintMinterWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "RemovePresetAuthorityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authorityToRemove",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "PaymentConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": "u16"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "days",
            "type": "u8"
          },
          {
            "name": "expiresAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MinterMetadataConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "symbol",
            "type": "string"
          },
          {
            "name": "metadata",
            "type": {
              "option": {
                "vec": {
                  "array": [
                    "string",
                    2
                  ]
                }
              }
            }
          },
          {
            "name": "uri",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "MinterInterestConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rate",
            "type": "i16"
          }
        ]
      }
    },
    {
      "name": "MinterTransferFeeConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "transferFeeBasisPoints",
            "type": "u16"
          },
          {
            "name": "maxFeeRate",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "MinterApplicationConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "identities",
            "type": {
              "vec": {
                "defined": "IdentityProvider"
              }
            }
          },
          {
            "name": "paymentConfig",
            "type": {
              "defined": "PaymentConfig"
            }
          }
        ]
      }
    },
    {
      "name": "MinterConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "applicationConfig",
            "type": {
              "defined": "MinterApplicationConfig"
            }
          },
          {
            "name": "metadataConfig",
            "type": {
              "defined": "MinterMetadataConfig"
            }
          },
          {
            "name": "interestConfig",
            "type": {
              "option": {
                "defined": "MinterInterestConfig"
              }
            }
          },
          {
            "name": "transferFeeConfig",
            "type": {
              "option": {
                "defined": "MinterTransferFeeConfig"
              }
            }
          }
        ]
      }
    },
    {
      "name": "IdentityProvider",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Discord"
          },
          {
            "name": "GitHub"
          },
          {
            "name": "Google"
          },
          {
            "name": "Twitter"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAccountOwner",
      "msg": "Account not owned by program"
    },
    {
      "code": 6001,
      "name": "InvalidFeePayer",
      "msg": "Invalid Fee payer"
    },
    {
      "code": 6002,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6003,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6004,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6005,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6006,
      "name": "InvalidMinterTokenAccount",
      "msg": "Invalid minter token account"
    },
    {
      "code": 6007,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authority token account"
    },
    {
      "code": 6008,
      "name": "InvalidWNSGroup",
      "msg": "Invalid WNS group account"
    },
    {
      "code": 6009,
      "name": "InvalidWNSMember",
      "msg": "Invalid WNS member account"
    },
    {
      "code": 6010,
      "name": "InvalidWNSManager",
      "msg": "Invalid WNS manager account"
    },
    {
      "code": 6011,
      "name": "InvalidMinterName",
      "msg": "Invalid minter name"
    },
    {
      "code": 6012,
      "name": "InvalidMinterDescription",
      "msg": "Invalid minter description"
    },
    {
      "code": 6013,
      "name": "InvalidMinterImageURL",
      "msg": "Invalid Image Url"
    },
    {
      "code": 6014,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6015,
      "name": "InvalidMint",
      "msg": "Invalid mint account passed"
    },
    {
      "code": 6016,
      "name": "InvalidTokenProgram",
      "msg": "Token extensions program required"
    },
    {
      "code": 6017,
      "name": "CannotRemoveNonZeroSupplyMinter",
      "msg": "Cannot remove minter of non-zero supply"
    }
  ]
};
