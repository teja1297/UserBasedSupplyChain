const contractAddress = 0xc79f45338616cF3C4e159063aB6AbAFE4ca0b5f3;

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ThisUser",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_DrugID",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "_BatchID",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_DrugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Currentlocation",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_MfgTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_ExpTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "int8",
				"name": "_CurrentTemperature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "_IdealTemperature",
				"type": "int8"
			},
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			}
		],
		"name": "addDrugDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_UserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ThisUser",
				"type": "string"
			}
		],
		"name": "changeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_DistributorUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "_ImportingTemparature",
				"type": "int8"
			}
		],
		"name": "distributorReceving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_PharmacyUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "_ImportingTemparature",
				"type": "int8"
			}
		],
		"name": "importToPharmacy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ThisUser",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "int8",
				"name": "_ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "string",
				"name": "_ExporterUserName",
				"type": "string"
			}
		],
		"name": "moveFromDistributor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ManufacturerUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_DistributorUserName",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "_ExportingTemparature",
				"type": "int8"
			}
		],
		"name": "moveFromManufacturer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ThisUser",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "int8",
				"name": "_ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "string",
				"name": "_PharmacyUserName",
				"type": "string"
			}
		],
		"name": "moveFromWholeSaler",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ThisUser",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Name",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_ContactNo",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_UserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_UserPassword",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Role",
				"type": "string"
			}
		],
		"name": "setUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_Name",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_ContactNo",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_UserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_UserPassword",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Email",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_SerialNumber",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_WholeSalerUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "_ImportingTemparature",
				"type": "int8"
			}
		],
		"name": "wholesalerReceving",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "AdminAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			}
		],
		"name": "Authenticate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchdistributorDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "DistributorUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "ImportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "uint256",
				"name": "ImportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ExporterUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "DrugStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchDrugDetails",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "DrugID",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "BatchID",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "DrugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Currentlocation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "CurrentproductOwner",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "NextOwner",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "MfgTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExpTimeStamp",
				"type": "uint256"
			},
			{
				"internalType": "int8",
				"name": "CurrentTemperature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "IdealTemperature",
				"type": "int8"
			},
			{
				"internalType": "string",
				"name": "Status",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "IsBad",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchManufactureringDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "ManufacturerUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "ExporterUserName",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "uint256",
				"name": "ExportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "DrugStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchPharmacyDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "PharmacyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "ImportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "string",
				"name": "DrugStatus",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "ImportingDateTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "BatchUserDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "ContactNo",
				"type": "uint32"
			},
			{
				"internalType": "bool",
				"name": "IsActive",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "UserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Role",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "BatchWholesalerDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "WholeSalerUserName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "int8",
				"name": "ImportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "int8",
				"name": "ExportingTemparature",
				"type": "int8"
			},
			{
				"internalType": "uint256",
				"name": "ImportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ExportingDateTime",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "DrugStatus",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "DrugKeyList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "useKeys",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserNameList",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "userRole",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
