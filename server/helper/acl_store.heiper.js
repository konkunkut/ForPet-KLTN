class Acl {
    constructor(){
        this._acl = null;
    }
    set setAcl(acl){
        this._acl=acl;
    }
    get getAcl(){
        return this._acl;
    }
}
const acl = new Acl();
module.exports ={Aclclass:acl};