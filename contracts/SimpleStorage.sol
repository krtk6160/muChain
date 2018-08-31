pragma solidity ^0.4.18;
pragma experimental ABIEncoderV2;

contract SimpleStorage {
    struct Patients{
        mapping (address=> mapping (string =>bool)) approved;
        mapping (string => string)  ipfshashes;
    }   
    
    struct Doctors{
        mapping (address=> mapping (string =>string)) patientToDocToHash;
    }
    
    mapping (address => Patients) Patient_record;
    mapping (address => Doctors) Doctor_record;
    
    function set(address patient, string ipfs_hash, string dept) public {
        Patients storage p = Patient_record[patient];
        require(p.approved[msg.sender][dept] == true);
		p.ipfshashes[dept] = ipfs_hash;	
		Doctors storage d = Doctor_record[msg.sender];
		d.patientToDocToHash[patient][dept] = ipfs_hash;
    }
    function get(address patient , string dept) public view returns (string) {
  	    Patients storage p = Patient_record[patient];
  	    if(p.approved[msg.sender][dept]==true){
              return p.ipfshashes[dept];
        }
	}
	function add(address newdoctor, string dept) public{
        Patients storage p = Patient_record[msg.sender];
        p.approved[newdoctor][dept] = true;
    }

    function get(string dept) public view returns(string) {
    	return Patient_record[msg.sender].ipfshashes[dept];
    }

    function revoke(address doctor, string _dept) public{
    	Patients storage p = Patient_record[msg.sender];
    	p.approved[doctor][_dept] = false;
    	Doctors storage d = Doctor_record[doctor];
    	d.patientToDocToHash[msg.sender][_dept] = '';
     }    
}