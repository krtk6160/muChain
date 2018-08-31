pragma solidity ^0.4.18;

contract SimpleStorage {

    struct Patients{
        mapping(address=>mapping(string=>bool)) approved;
        mapping (string => string)  ipfshashes;
    }   
    
    struct Doctors{
        mapping(address=>mapping(string=>string)) patientToDocToHash;
    }
    
    mapping (address => Patients) Patient_record;
    mapping (address => Doctors) Doctor_record;
    
    function set(address patient, string ipfs_hash, string dept) public {
        Patients storage p = Patient_record[patient];
        require(p.approved[msg.sender][dept]);
		p.ipfshashes[dept] = ipfs_hash;	
    }

    function get(address patient , string dept) public view returns (string) public {
  	    Patients storage p = Patient_record[patient];
  	    if(p.approved[msg.sender][dept]==true){
              return p.ipfshashes[dept];
        }
	}

	function add(address newdoctor, string dept) public{
        Patients storage p = Patient_record[msg.sender];
        p.approved[newdoctor][dept] = true;
    }
}