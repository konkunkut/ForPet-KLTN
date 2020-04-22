const Acl = require('acl');
const{ Aclclass} = require('../helper/acl_store.heiper');
const MongodbBackend = Acl.mongodbBackend;
function acl_config(dbconnect){
    const aclBackend = new MongodbBackend(dbconnect,'_acl');
    const ACL = new Acl(aclBackend);
    ACL.allow([
        {
            roles:'user',
            allows:[
                {
                    resources:'/Places/deletePlace',
                    permissions:'delete'
                },
            ],
            roles: 'admin',
            allows: [
                {
                    resources:'/News/createNewsbyUser',
                    permissions:'post'
                },
                {
                    resources:'/Places/deletePlace',
                    permissions:'delete'
                },
                {
                    resources:'/News/deleteNews',
                    permissions:'delete'
                },
                {
                    resources:'/user/deleteUser',
                    permissions:'delete'
                },
                {
                    resources:'/News/createNewsbyUser',
                    permissions:'post'
                },
                {
                    resources:'/News/deleteNews',
                    permissions:'delete'
                },
                {
                    resources:'/News/editNews',
                    permissions:'put'
                }
            ],
            roles: 'editor',
            allows: [
                {
                    resources:'/News/createNewsbyUser',
                    permissions:'post'
                },
                {
                    resources:'/News/deleteNews',
                    permissions:'delete'
                },
                {
                    resources:'/News/editNews',
                    permissions:'put'
                },
                {
                    resources:'/Places/deletePlace',
                    permissions:'delete'
                },
            ]
        }
    ]);
    Aclclass.setAcl = ACL
}
module.exports ={acl_config:acl_config};