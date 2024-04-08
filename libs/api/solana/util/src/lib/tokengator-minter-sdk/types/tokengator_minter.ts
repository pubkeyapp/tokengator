export type TokengatorMinter = {
  "version": "0.1.0",
  "name": "tokengator_minter",
  "instructions": [
    {
      "name": "prepareForPayment",
      "accounts": [
        {
          "name": "receipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
            "defined": "PrepareForPaymentArgs"
          }
        }
      ]
    },
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
          "name": "receipt",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
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
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentMint",
          "isMut": false,
          "isSigner": false
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
      "name": "addMinterAuthority",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "AddMinterAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "removeMinterAuthority",
      "accounts": [
        {
          "name": "minter",
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
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveMinterAuthorityArgs"
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
          "name": "receipt",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiverTokenAccount",
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
          "name": "receiver",
          "isMut": false,
          "isSigner": false
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
    },
    {
      "name": "updateMemberMetdata",
      "accounts": [
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateMemberMetadataArgs"
          }
        }
      ]
    },
    {
      "name": "updateMemberMetadataWns",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateMemberMetadataWNSArgs"
          }
        }
      ]
    },
    {
      "name": "removeMinter",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "args": []
    },
    {
      "name": "createActivity",
      "accounts": [
        {
          "name": "activity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "CreateActivityArgs"
          }
        }
      ]
    },
    {
      "name": "appendActivityEntry",
      "accounts": [
        {
          "name": "activity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "AppendActivityEntryArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "activity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "minter",
            "type": "publicKey"
          },
          {
            "name": "member",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": "Entry"
              }
            }
          }
        ]
      }
    },
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
            "name": "group",
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
    },
    {
      "name": "receipt",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "paymentType",
            "type": {
              "defined": "ReceiptType"
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "paymentAmount",
            "type": "u64"
          },
          {
            "name": "sender",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "senderTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "receiverTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PaymentConfigArgs",
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
          }
        ]
      }
    },
    {
      "name": "AppendActivityEntryArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "url",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "points",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "CreateActivityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "endDate",
            "type": {
              "option": "i64"
            }
          }
        ]
      }
    },
    {
      "name": "AddMinterAuthorityArgs",
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
      "name": "RemoveMinterAuthorityArgs",
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
      "name": "PrepareForPaymentArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paymentAmount",
            "type": "u64"
          },
          {
            "name": "paymentType",
            "type": {
              "defined": "ReceiptType"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateMemberMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "endDate",
            "type": {
              "option": "i64"
            }
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
              "defined": "PaymentConfigArgs"
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
          }
        ]
      }
    },
    {
      "name": "UpdateMemberMetadataWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "newValue",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "url",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "points",
            "type": "u8"
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
    },
    {
      "name": "ReceiptType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "User"
          },
          {
            "name": "Community"
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
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6003,
      "name": "InvalidReceiver",
      "msg": "Invalid receiver"
    },
    {
      "code": 6004,
      "name": "InvalidReceipt",
      "msg": "Invalid receipt"
    },
    {
      "code": 6005,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6006,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6007,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6008,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6009,
      "name": "InvalidMinterTokenAccount",
      "msg": "Invalid minter token account"
    },
    {
      "code": 6010,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authority token account"
    },
    {
      "code": 6011,
      "name": "InvalidWNSGroup",
      "msg": "Invalid WNS group account"
    },
    {
      "code": 6012,
      "name": "InvalidWNSMember",
      "msg": "Invalid WNS member account"
    },
    {
      "code": 6013,
      "name": "InvalidWNSManager",
      "msg": "Invalid WNS manager account"
    },
    {
      "code": 6014,
      "name": "InvalidMinterName",
      "msg": "Invalid minter name"
    },
    {
      "code": 6015,
      "name": "InvalidMinterDescription",
      "msg": "Invalid minter description"
    },
    {
      "code": 6016,
      "name": "InvalidMinterImageURL",
      "msg": "Invalid Image Url"
    },
    {
      "code": 6017,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6018,
      "name": "InvalidMint",
      "msg": "Invalid mint account passed"
    },
    {
      "code": 6019,
      "name": "InvalidTokenProgram",
      "msg": "Token extensions program required"
    },
    {
      "code": 6020,
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
      "name": "prepareForPayment",
      "accounts": [
        {
          "name": "receipt",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
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
            "defined": "PrepareForPaymentArgs"
          }
        }
      ]
    },
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
          "name": "receipt",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
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
          "name": "authorityTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentMint",
          "isMut": false,
          "isSigner": false
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
      "name": "addMinterAuthority",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "AddMinterAuthorityArgs"
          }
        }
      ]
    },
    {
      "name": "removeMinterAuthority",
      "accounts": [
        {
          "name": "minter",
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
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "RemoveMinterAuthorityArgs"
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
          "name": "receipt",
          "isMut": true,
          "isSigner": false,
          "docs": [
            ""
          ]
        },
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiverTokenAccount",
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
          "name": "receiver",
          "isMut": false,
          "isSigner": false
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
    },
    {
      "name": "updateMemberMetdata",
      "accounts": [
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateMemberMetadataArgs"
          }
        }
      ]
    },
    {
      "name": "updateMemberMetadataWns",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "args",
          "type": {
            "defined": "UpdateMemberMetadataWNSArgs"
          }
        }
      ]
    },
    {
      "name": "removeMinter",
      "accounts": [
        {
          "name": "minter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
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
      "args": []
    },
    {
      "name": "createActivity",
      "accounts": [
        {
          "name": "activity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "minter",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "member",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "CreateActivityArgs"
          }
        }
      ]
    },
    {
      "name": "appendActivityEntry",
      "accounts": [
        {
          "name": "activity",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feePayer",
          "isMut": true,
          "isSigner": true
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
            "defined": "AppendActivityEntryArgs"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "activity",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "feePayer",
            "type": "publicKey"
          },
          {
            "name": "minter",
            "type": "publicKey"
          },
          {
            "name": "member",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "entries",
            "type": {
              "vec": {
                "defined": "Entry"
              }
            }
          }
        ]
      }
    },
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
            "name": "group",
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
    },
    {
      "name": "receipt",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "paymentType",
            "type": {
              "defined": "ReceiptType"
            }
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "paymentAmount",
            "type": "u64"
          },
          {
            "name": "sender",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "senderTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "receiverTokenAccount",
            "type": "publicKey"
          },
          {
            "name": "paymentMint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "PaymentConfigArgs",
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
          }
        ]
      }
    },
    {
      "name": "AppendActivityEntryArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "url",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "points",
            "type": {
              "option": "u8"
            }
          }
        ]
      }
    },
    {
      "name": "CreateActivityArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "endDate",
            "type": {
              "option": "i64"
            }
          }
        ]
      }
    },
    {
      "name": "AddMinterAuthorityArgs",
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
      "name": "RemoveMinterAuthorityArgs",
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
      "name": "PrepareForPaymentArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "paymentAmount",
            "type": "u64"
          },
          {
            "name": "paymentType",
            "type": {
              "defined": "ReceiptType"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateMemberMetadataArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "label",
            "type": "string"
          },
          {
            "name": "startDate",
            "type": {
              "option": "i64"
            }
          },
          {
            "name": "endDate",
            "type": {
              "option": "i64"
            }
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
              "defined": "PaymentConfigArgs"
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
          }
        ]
      }
    },
    {
      "name": "UpdateMemberMetadataWNSArgs",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "field",
            "type": "string"
          },
          {
            "name": "newValue",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "Entry",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "url",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "points",
            "type": "u8"
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
    },
    {
      "name": "ReceiptType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "User"
          },
          {
            "name": "Community"
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
      "name": "InvalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6003,
      "name": "InvalidReceiver",
      "msg": "Invalid receiver"
    },
    {
      "code": 6004,
      "name": "InvalidReceipt",
      "msg": "Invalid receipt"
    },
    {
      "code": 6005,
      "name": "UnAuthorized",
      "msg": "Account unauthorized to perform this action"
    },
    {
      "code": 6006,
      "name": "AuthorityAlreadyExists",
      "msg": "Authority already exists"
    },
    {
      "code": 6007,
      "name": "AuthorityNonExistant",
      "msg": "Authority does not exist"
    },
    {
      "code": 6008,
      "name": "CannotRemoveSoloAuthority",
      "msg": "Cannot remove last remaining authority"
    },
    {
      "code": 6009,
      "name": "InvalidMinterTokenAccount",
      "msg": "Invalid minter token account"
    },
    {
      "code": 6010,
      "name": "InvalidAuthorityTokenAccount",
      "msg": "Invalid authority token account"
    },
    {
      "code": 6011,
      "name": "InvalidWNSGroup",
      "msg": "Invalid WNS group account"
    },
    {
      "code": 6012,
      "name": "InvalidWNSMember",
      "msg": "Invalid WNS member account"
    },
    {
      "code": 6013,
      "name": "InvalidWNSManager",
      "msg": "Invalid WNS manager account"
    },
    {
      "code": 6014,
      "name": "InvalidMinterName",
      "msg": "Invalid minter name"
    },
    {
      "code": 6015,
      "name": "InvalidMinterDescription",
      "msg": "Invalid minter description"
    },
    {
      "code": 6016,
      "name": "InvalidMinterImageURL",
      "msg": "Invalid Image Url"
    },
    {
      "code": 6017,
      "name": "MaxSizeReached",
      "msg": "Array reached max size"
    },
    {
      "code": 6018,
      "name": "InvalidMint",
      "msg": "Invalid mint account passed"
    },
    {
      "code": 6019,
      "name": "InvalidTokenProgram",
      "msg": "Token extensions program required"
    },
    {
      "code": 6020,
      "name": "CannotRemoveNonZeroSupplyMinter",
      "msg": "Cannot remove minter of non-zero supply"
    }
  ]
};
