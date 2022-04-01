// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

contract PharmaSupplyChain{

address public AdminAddress;
    constructor(string memory _Name,
                     uint32 _ContactNo,
                     string memory _UserName,
                     string memory _UserPassword,
                     string memory _Email
                    ) {
                        AdminAddress=msg.sender;
       UserDetail.Name =_Name;
        UserDetail.ContactNo = _ContactNo;
        UserDetail.UserName = _UserName;
         UserDetail.Password = _UserPassword;
        UserDetail.Email = _Email;
        UserDetail.Role ="Admin";
        UserDetail.IsActive = true;
        /*store data into mapping*/
        BatchUserDetails[_UserName] = UserDetail;
        userRole[_UserName] = "Admin";
        UserNameList.push(_UserName);
        isAutherised[_UserName]= true;
                    }
    address[] public DrugKeyList;
    string[] public UserNameList;
  mapping(string => string)  userRole;
  mapping (address => string) nextOwner;
  mapping(string => bool) isAutherised;


    struct User{
        string Name;
        uint32 ContactNo;
        bool IsActive;
        string UserName;
        string Password;
        string Email;
        string Role;
     }


      struct  Drug {
        uint32 DrugID;
        uint32 BatchID;
        string DrugName;
        string Currentlocation;
        string CurrentproductOwner;
        string NextOwner;
        uint MfgTimeStamp;
        uint ExpTimeStamp;
        int8  CurrentTemperature;
        int8 IdealTemperature;
        string Status;
        bool IsBad;
    }

 struct Manufacturer{
        string ManufacturerUserName;
        string Location;
        string ExporterUserName;
        int8 ExportingTemparature;
        uint256 ExportingDateTime;
        string DrugStatus;
    }

    struct distributor{
        string DistributorUserName;
        string Location;
        int8 ImportingTemparature;
        int8 ExportingTemparature;
        uint256 ImportingDateTime;
        uint256 ExportingDateTime;
        string ExporterUserName;
        string DrugStatus;
    }


    struct Wholesaler{
        string WholeSalerUserName;
        string Location;
        int8 ImportingTemparature;
        int8 ExportingTemparature;
        uint256 ImportingDateTime;
        uint256 ExportingDateTime;
        string DrugStatus;
    }

    struct Pharmacy{
        string PharmacyName;
        string Location;
        int8 ImportingTemparature;
        string DrugStatus;
        uint256 ImportingDateTime;
    }


     mapping(address => Drug) public BatchDrugDetails;
    mapping(address => Manufacturer) public BatchManufactureringDetails;
    mapping(address =>distributor) public  BatchdistributorDetails;
    mapping(address =>Wholesaler) public BatchWholesalerDetails;
    mapping(address =>Pharmacy) public BatchPharmacyDetails;

    mapping(string =>User) public BatchUserDetails;

        Drug DrugDetails;
        User UserDetail;
        Manufacturer ManufacturerDetails;
        distributor DistributorDetails;
        Wholesaler WholesalerDetails;
        Pharmacy PharmacyDetails;


//   function getDrugKeyList() public view returns(address[] memory){
//         return DrugKeyList;
//     }


    // function getUserNameList() public view returns(string[] memory){
    //     return UserNameList;
    // }




    function setUser(string memory ThisUser,
                    string memory _Name,
                     uint32 _ContactNo,
                     string memory _UserName,
                     string memory _UserPassword,
                     string memory _Email,
                     string memory _Role) public onlyAdmin(ThisUser) returns(bool){
                         require(!isAutherised[_UserName],"username already taken");
        /*store data into struct*/
        UserDetail.Name =_Name;
        UserDetail.ContactNo = _ContactNo;
        UserDetail.UserName = _UserName;
         UserDetail.Password = _UserPassword;
        UserDetail.Email = _Email;
        UserDetail.Role =_Role;
        UserDetail.IsActive = true;
        /*store data into mapping*/
        BatchUserDetails[_UserName] = UserDetail;
        userRole[_UserName] = _Role;
        UserNameList.push(_UserName);
        isAutherised[_UserName]= true;

        return true;
    }  



    function addDrugDetails(
        string memory ThisUser,
        uint32 _DrugID,
        uint32 _BatchID,
        string memory _DrugName,
        string memory _Currentlocation,
        uint _MfgTimeStamp,
        uint _ExpTimeStamp,
        int8  _CurrentTemperature,
        int8 _IdealTemperature,
        address _SerialNumber
     ) public onlyManufacturer(ThisUser) returns(address){
         if(_SerialNumber == address(0)){
         require(_CurrentTemperature<=_IdealTemperature);
         uint tmpData = uint(keccak256(abi.encodePacked(_MfgTimeStamp, block.timestamp )));
         _SerialNumber = address(uint160(tmpData));
         DrugKeyList.push(_SerialNumber);
         }

        DrugDetails.DrugID = _DrugID;
        DrugDetails.BatchID = _BatchID;
        DrugDetails.DrugName = _DrugName;
        DrugDetails.Currentlocation = _Currentlocation;
        DrugDetails.CurrentproductOwner = ThisUser;
        DrugDetails.MfgTimeStamp = _MfgTimeStamp;
        DrugDetails.ExpTimeStamp = _ExpTimeStamp;
        DrugDetails.CurrentTemperature = _CurrentTemperature;
        DrugDetails.IdealTemperature = _IdealTemperature;
        DrugDetails.Status = "Manufactured";
        DrugDetails.NextOwner = "";
        nextOwner[_SerialNumber] = "";
        BatchDrugDetails[_SerialNumber] = DrugDetails;
        return _SerialNumber;
    }


 

 
    function moveFromManufacturer(address _SerialNumber,
                             string memory _ManufacturerUserName,
                             string memory _Location,
                             string memory  _DistributorUserName,
                             int8  _ExportingTemparature
                             )public  returns(bool){   
                require(keccak256(abi.encodePacked(userRole[_ManufacturerUserName])) == keccak256(abi.encodePacked("Manufacturer")));
                bool good =  isBad(_SerialNumber,_ExportingTemparature);
                require(good,"Cannot ship the Drug, This Drug Either expired or exceeded Temparature");
          
                DrugDetails = BatchDrugDetails[_SerialNumber]; 
                         
                     DrugDetails.Status = "Shipped";   
                     DrugDetails.NextOwner = _DistributorUserName;    
         ManufacturerDetails.ManufacturerUserName = _ManufacturerUserName;
         ManufacturerDetails.Location = _Location;
         ManufacturerDetails.ExporterUserName =_DistributorUserName ;
         ManufacturerDetails.ExportingTemparature = _ExportingTemparature;
         ManufacturerDetails.ExportingDateTime = block.timestamp;
         ManufacturerDetails.DrugStatus = "Shipped";
         BatchManufactureringDetails[_SerialNumber] = ManufacturerDetails;
         BatchDrugDetails[_SerialNumber] = DrugDetails;
          nextOwner[_SerialNumber] = _DistributorUserName;
         return true;
        }




 


        function distributorReceving(
                                     address _SerialNumber,
                                     string memory _DistributorUserName,
                                     string memory _Location,
                                     int8 _ImportingTemparature) 
                                     public isValidPerformer(_SerialNumber,"Distributor",_DistributorUserName,true) returns(bool){
            bool good =  isBad(_SerialNumber,_ImportingTemparature);
           require(good,"This Drug Either expired or exceeded Temparature, please store it in your wharehouse for return");
            DrugDetails = BatchDrugDetails[_SerialNumber];
            DistributorDetails.DistributorUserName = _DistributorUserName;
            DistributorDetails.Location = _Location;
            DistributorDetails.ImportingTemparature = _ImportingTemparature;
            DistributorDetails.ImportingDateTime = block.timestamp;
            
            DistributorDetails.DrugStatus = "Received";
            BatchdistributorDetails[_SerialNumber] = DistributorDetails;
            DrugDetails.CurrentproductOwner = _DistributorUserName ;
            DrugDetails.NextOwner = "";
            DrugDetails.Currentlocation = _Location;
             DrugDetails.Status = "Received"; 
             BatchDrugDetails[_SerialNumber] = DrugDetails;
             return true;    
        }




    

    function moveFromDistributor(string memory ThisUser,
                                address _SerialNumber,
                                int8 _ExportingTemparature, 
                                 string memory _ExporterUserName) public isValidPerformer(_SerialNumber,"Distributor",ThisUser,false) returns(bool){
           bool good =  isBad(_SerialNumber,_ExportingTemparature);
        require(good,"Cannot ship the Drug, This Drug Either expired or exceeded Temparature");

               DrugDetails = BatchDrugDetails[_SerialNumber];      
                     DrugDetails.Status = "Shipped";  
                     DrugDetails.NextOwner = _ExporterUserName;
            DistributorDetails.ExportingTemparature = _ExportingTemparature;
            DistributorDetails.ExportingDateTime = block.timestamp;
            DistributorDetails.DrugStatus = "Shipped";
            BatchdistributorDetails[_SerialNumber] = DistributorDetails;
             nextOwner[_SerialNumber] = _ExporterUserName; 
             BatchDrugDetails[_SerialNumber] = DrugDetails;
            return true; 
        }




        function wholesalerReceving(
                                     address _SerialNumber,
                                     string memory _WholeSalerUserName,
                                     string memory _Location,
                                     int8 _ImportingTemparature) 
                                     public isValidPerformer(_SerialNumber,"Wholesaler",_WholeSalerUserName,true) returns(bool){
            bool good =  isBad(_SerialNumber,_ImportingTemparature);
           require(good,"This Drug Either expired or exceeded Temparature, please store it in your wharehouse for return");
            DrugDetails = BatchDrugDetails[_SerialNumber];
            WholesalerDetails.WholeSalerUserName = _WholeSalerUserName;
            WholesalerDetails.Location = _Location;
            WholesalerDetails.ImportingTemparature = _ImportingTemparature;
            WholesalerDetails.ImportingDateTime = block.timestamp;
            
            WholesalerDetails.DrugStatus = "Received";
            BatchWholesalerDetails[_SerialNumber] = WholesalerDetails;
            DrugDetails.CurrentproductOwner = _WholeSalerUserName;
            DrugDetails.NextOwner = "";
            DrugDetails.Currentlocation = _Location;
             DrugDetails.Status = "Received"; 
             BatchDrugDetails[_SerialNumber] = DrugDetails;
             return true;    
        }


    function moveFromWholeSaler(string memory ThisUser,
                                address _SerialNumber,
                                int8 _ExportingTemparature, 
                                 string memory _PharmacyUserName) public isValidPerformer(_SerialNumber,"Wholesaler",ThisUser,false)  returns(bool){
           bool good =  isBad(_SerialNumber,_ExportingTemparature);
        require(good,"Cannot ship the Drug, This Drug Either expired or exceeded Temparature");

               DrugDetails = BatchDrugDetails[_SerialNumber];      
                     DrugDetails.Status = "In Transit from Distributor";  
                     DrugDetails.NextOwner = _PharmacyUserName;
                      DrugDetails.Status = "Shipped";
            WholesalerDetails.ExportingTemparature = _ExportingTemparature;
            WholesalerDetails.ExportingDateTime = block.timestamp;
            WholesalerDetails.DrugStatus = "Shipped";
            BatchWholesalerDetails[_SerialNumber] = WholesalerDetails;
             nextOwner[_SerialNumber] = _PharmacyUserName; 
             BatchDrugDetails[_SerialNumber] = DrugDetails;
            return true; 
        }


function importToPharmacy(address _SerialNumber,
        string memory _PharmacyUserName,
        string memory _Location,
        int8 _ImportingTemparature) public isValidPerformer(_SerialNumber,"Pharmacy",_PharmacyUserName,true) returns(bool){
               bool good =  isBad(_SerialNumber,_ImportingTemparature);
         require(good,"This Drug Either expired or exceeded Temparature, please store it in your wharehouse for return");
            DrugDetails = BatchDrugDetails[_SerialNumber];
            DrugDetails.NextOwner ="DONE"; 
             DrugDetails.Currentlocation = _Location;
            DrugDetails.Status = "Received";
            PharmacyDetails.PharmacyName = _PharmacyUserName;
            PharmacyDetails.Location = _Location;
            PharmacyDetails.ImportingTemparature = _ImportingTemparature;
            PharmacyDetails.DrugStatus = "Received";
            PharmacyDetails.ImportingDateTime = block.timestamp;
            BatchPharmacyDetails[_SerialNumber] = PharmacyDetails;
             nextOwner[_SerialNumber] = "DONE";
             BatchDrugDetails[_SerialNumber] = DrugDetails;
            return true;
}
    


// function getUserDetails(string memory _Username,string memory ThisUser) ValidUser(ThisUser)external view returns(User memory){
//     return BatchUserDetails[_Username];
// }

// function getDrugDetails(address  _SerialNumber,string memory ThisUser) ValidUser(ThisUser) external view returns(Drug memory){
//     return BatchDrugDetails[_SerialNumber];
// }

// function getManufacturerDetails(address  _SerialNumber,string memory ThisUser) ValidUser(ThisUser) external view returns(Manufacturer memory){
// return BatchManufactureringDetails[_SerialNumber];
// }
// function getDistributorDetails(address  _SerialNumber,string memory ThisUser) ValidUser(ThisUser) external view returns(distributor memory){
// return BatchdistributorDetails[_SerialNumber];
// }

// function getWholesalerDetails(address  _SerialNumber,string memory ThisUser) ValidUser(ThisUser) external view returns(Wholesaler memory){
// return BatchWholesalerDetails[_SerialNumber];
// }

// function getPharmaDetails(address  _SerialNumber,string memory ThisUser) ValidUser(ThisUser) external view returns(Pharmacy memory){
// return BatchPharmacyDetails[_SerialNumber];
// }



// function getDrugDetails1(address  _SerialNumber) public view returns(uint32,uint32,string memory,string memory){
//    Drug memory tmpData = BatchDrugDetails[_SerialNumber];
//    return (tmpData.DrugID,tmpData.BatchID,tmpData.DrugName,tmpData.Currentlocation);
// }



// function getDrugDetails2(address _SerialNumber) public view returns(string memory,string memory,uint,uint,int8,int8,string memory,bool){
// Drug memory tmpData = BatchDrugDetails[_SerialNumber];
// return (tmpData.CurrentproductOwner,tmpData.NextOwner,tmpData.MfgTimeStamp,tmpData.ExpTimeStamp,tmpData.CurrentTemperature,tmpData.IdealTemperature,tmpData.Status,tmpData.IsBad);
// }

   
function isBad(address _SerialNumber,int8 Temparature) internal returns(bool){
    require(!BatchDrugDetails[_SerialNumber].IsBad);
  DrugDetails = BatchDrugDetails[_SerialNumber];
  DrugDetails.CurrentTemperature = Temparature;
     

    if(Temparature > DrugDetails.IdealTemperature){
        DrugDetails.IsBad = true;
        DrugDetails.Status = "Exceeded ideal temperature";
           BatchDrugDetails[_SerialNumber] = DrugDetails;

        return false;
    }
    else if(DrugDetails.ExpTimeStamp <=block.timestamp){
         DrugDetails.IsBad = true;
        DrugDetails.Status = "Drug Expired";
            BatchDrugDetails[_SerialNumber] = DrugDetails; 
        return false;
    }    
    return true;
     }

       function Authenticate(string memory _username,string memory _password) public view returns(bool){
       User memory user = BatchUserDetails[_username];
      if((keccak256(abi.encodePacked(user.UserName))== keccak256(abi.encodePacked(_username)))){
              if(keccak256(abi.encodePacked(user.Password))== keccak256(abi.encodePacked(_password))){
                  return true;
              }
       return false;
      }
      return false; 
   }
 function changeAdmin(address newAdmin,string memory _UserName, string memory ThisUser) public onlyAdmin(ThisUser){
  User storage user =    BatchUserDetails[_UserName];
  user.Role = "Admin";
AdminAddress = newAdmin;
delete BatchUserDetails[ThisUser];
    }



    modifier isValidPerformer(address _SerialNumber, string memory role,string memory _UserName,bool receiving) {
        require(keccak256(abi.encodePacked(userRole[_UserName])) == keccak256(abi.encodePacked(role)));
        if(receiving){
        require(keccak256(abi.encodePacked(nextOwner[_SerialNumber])) == keccak256(abi.encodePacked(_UserName)));
        _;
        }
        else{
                    require(keccak256(abi.encodePacked(BatchDrugDetails[_SerialNumber].CurrentproductOwner)) == keccak256(abi.encodePacked(_UserName)));
                    _;
        }
        
   }

    modifier onlyAdmin(string memory _UserName){
       require(keccak256(abi.encodePacked(userRole[_UserName])) == keccak256(abi.encodePacked("Admin")));
       _;
   }
  modifier onlyManufacturer(string memory _UserName){
require(keccak256(abi.encodePacked(userRole[_UserName])) == keccak256(abi.encodePacked("Manufacturer")));
       _;
  }

modifier ValidUser(string memory _UserName){
require(isAutherised[_UserName]);
_;
}

}









